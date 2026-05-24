"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  branchFrameworks,
  ramasJuridicas,
  type BranchFramework,
  type RamaJuridica
} from "@/lib/frameworks";

const NAVY = "#1a2744";
const GOLD = "#c9a84c";

const targetAIs = ["ChatGPT", "Claude", "Gemini", "Copilot", "Otro"] as const;
type TargetAI = (typeof targetAIs)[number];

type Step = 1 | 2 | 3 | 4;

export const PROMPT_BUILDER_PRESET_EVENT = "prompt-builder:preset";

export type PromptBuilderPreset = {
  rama?: RamaJuridica;
  producto?: string;
  frameworkId?: string;
  ia?: TargetAI;
};

const safetyBlock = `# Salvaguardas
- No inventes normas, artículos, jurisprudencia, sanciones ni precedentes.
- Si falta un dato relevante, pídelo antes de concluir.
- Distingue hechos, supuestos, análisis y recomendación.
- Esta salida es un borrador asistido por IA: requiere revisión por un abogado responsable antes de cualquier uso profesional.`;

// ─────────────────────────────────────────────────────────────
// Historial en localStorage
// ─────────────────────────────────────────────────────────────

const HISTORY_KEY = "ialaw-prompt-builder-history";
const HISTORY_MAX = 10;

type HistoryEntry = {
  id: string;
  fechaIso: string;
  rama: string;
  producto: string;
  framework: string;
  ia: string;
  texto: string;
};

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (entry): entry is HistoryEntry =>
          entry &&
          typeof entry === "object" &&
          typeof entry.id === "string" &&
          typeof entry.fechaIso === "string" &&
          typeof entry.texto === "string"
      )
      .slice(0, HISTORY_MAX);
  } catch {
    return [];
  }
}

function persistHistory(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, HISTORY_MAX)));
  } catch {
    // ignore quota / private mode errors
  }
}

// ─────────────────────────────────────────────────────────────
// Analizador de calidad (sin API)
// ─────────────────────────────────────────────────────────────

type Criterion = {
  key: "rol" | "jurisdiccion" | "formato" | "restricciones";
  label: string;
  ok: boolean;
  sugerencia: string;
};

function analyzeQuality(prompt: string): { score: number; criteria: Criterion[] } {
  const text = prompt.toLowerCase();

  const hasRole =
    /(\brol\s*:|act[uú]a como|eres un[ao]?|asistente jur[ií]dico|abogad[oa]|counsel|fiscal|defensor[ao]?)\b/.test(
      text
    );

  const hasJurisdiction =
    /\b(per[uú]|chile|argentin|m[ée]xico|colombia|brasil|uruguay|ecuador|venezuela|paraguay|bolivia|costa rica|panam[aá]|guatemala|honduras|el salvador|nicaragua|rep[uú]blica dominicana|cuba|espa[nñ]a|jurisdicci[oó]n|ley aplicable|c[oó]digo civil|c[oó]digo penal|c[oó]digo del trabajo|constituci[oó]n)\b/.test(
      text
    );

  const hasFormat =
    /(formato|estructura esperada|##\s*estructura|salida:|entrega|matriz|checklist|tabla|informe|cl[aá]usula|memorial|petitorio|conclusi[oó]n)/.test(
      text
    );

  const hasRestrictions =
    /(no invent|salvaguardas|restricciones|stop rules?|l[íi]mite|sin sustituir|revisi[oó]n profesional|advertencia|verific)/.test(
      text
    );

  const criteria: Criterion[] = [
    {
      key: "rol",
      label: "Contexto del rol del abogado",
      ok: hasRole,
      sugerencia:
        "Añade un rol explícito al inicio del prompt: 'Actúa como abogado especializado en [materia]' o 'Asistente jurídico en [área]'."
    },
    {
      key: "jurisdiccion",
      label: "Especifica la jurisdicción",
      ok: hasJurisdiction,
      sugerencia:
        "Indica país y norma aplicable, por ejemplo: 'jurisdicción peruana, Ley 29733' o 'Código Civil colombiano'. Evita respuestas genéricas."
    },
    {
      key: "formato",
      label: "Define el formato de salida",
      ok: hasFormat,
      sugerencia:
        "Pide una salida concreta y revisable: informe, matriz, checklist, cláusula, memorial, tabla."
    },
    {
      key: "restricciones",
      label: "Incluye restricciones o stop rules",
      ok: hasRestrictions,
      sugerencia:
        "Añade límites explícitos: 'no inventes normas ni jurisprudencia', 'declara supuestos', 'no sustituyas revisión profesional'."
    }
  ];

  return { score: criteria.filter((item) => item.ok).length, criteria };
}

// ─────────────────────────────────────────────────────────────
// Guía rápida por IA
// ─────────────────────────────────────────────────────────────

const aiGuides: Record<TargetAI, { titulo: string; consejos: string[] }> = {
  ChatGPT: {
    titulo: "Consejos para ChatGPT",
    consejos: [
      "Sé muy explícito con el rol al inicio: 'Actúa como abogado especializado en [materia]'.",
      "Usa secciones con # o ## (markdown) — ChatGPT respeta el formato y mejora la lectura.",
      "Para análisis largo, pide 'razona paso a paso antes de concluir'.",
      "Si quieres comparativa, solicita explícitamente una tabla con columnas nombradas.",
      "Con GPT-4o+ puedes adjuntar PDFs: aprovéchalo cuando la fuente normativa es crítica."
    ]
  },
  Claude: {
    titulo: "Consejos para Claude",
    consejos: [
      "Usa etiquetas XML para estructurar el input: <hechos>, <pregunta>, <contexto>, <restricciones>.",
      "Claude responde mejor a prompts largos y bien organizados que a prompts cortos y ambiguos.",
      "Activa razonamiento extendido pidiendo 'piensa paso a paso antes de responder'.",
      "Si necesitas que cite literalmente, pide 'transcribe la cláusula exacta antes de analizar'.",
      "Claude es estricto con confidencialidad: indica si los datos son de prueba o anonimizados."
    ]
  },
  Gemini: {
    titulo: "Consejos para Gemini",
    consejos: [
      "Especifica idioma desde el inicio: 'responde en español de [país]'.",
      "Para documentos legales largos, divide el prompt en bloques numerados.",
      "Gemini tiende a ser conservador: pide 'sin disclaimers genéricos, ve al fondo del análisis'.",
      "Adjunta fuentes oficiales si quieres citas verificables — integra bien con Google Docs/Drive.",
      "Para razonamiento jurídico, pide explícitamente 'estructura IRAC' o 'análisis silogístico'."
    ]
  },
  Copilot: {
    titulo: "Consejos para Copilot",
    consejos: [
      "En Word/Outlook: pide formato Word con encabezados y viñetas; Copilot lo aplica al documento.",
      "Copilot empresarial respeta permisos de SharePoint — ancla el contexto a un documento concreto.",
      "Abre primero el documento y luego pide la tarea: el contexto in situ mejora mucho la respuesta.",
      "Sé conciso: Copilot rinde mejor con instrucciones breves y orientadas a acción.",
      "Pide siempre 'cita la sección del documento que usaste' para trazabilidad."
    ]
  },
  Otro: {
    titulo: "Consejos generales para cualquier IA",
    consejos: [
      "Empieza con rol explícito y jurisdicción aplicable.",
      "Estructura el prompt con secciones: contexto, tarea, formato, restricciones.",
      "Pide formato concreto: informe, matriz, checklist, cláusula.",
      "Incluye stop rules: 'no inventes', 'declara supuestos', 'pide datos faltantes'.",
      "Cierra con una validación humana obligatoria antes de uso profesional."
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function extractVariables(plantilla: string): string[] {
  const matches = plantilla.match(/\[[^\[\]]+\]/g) ?? [];
  return Array.from(new Set(matches));
}

function fillTemplate(plantilla: string, values: Record<string, string>) {
  let output = plantilla;
  for (const token of Object.keys(values)) {
    const value = values[token]?.trim();
    if (!value) continue;
    output = output.split(token).join(value);
  }
  return output;
}

function assemblePrompt(args: {
  ia: TargetAI;
  framework: BranchFramework;
  filled: string;
}) {
  const { ia, framework, filled } = args;
  return `# ${framework.framework} — ${framework.producto}
# Rama: ${framework.rama} | Nivel: ${framework.nivel}
# Destinado a pegarse en: ${ia}

## Instrucción
${filled}

## Estructura esperada
${framework.estructura.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

${safetyBlock}`;
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("es-PE", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
}

// ─────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────

export function PromptBuilder() {
  const [step, setStep] = useState<Step>(1);
  const [ia, setIa] = useState<TargetAI>("ChatGPT");
  const [rama, setRama] = useState<RamaJuridica | "">("");
  const [producto, setProducto] = useState<string>("");
  const [frameworkName, setFrameworkName] = useState<string>("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [guideOpen, setGuideOpen] = useState(false);

  const applyPreset = useCallback((preset: PromptBuilderPreset) => {
    const targetRama = preset.rama;
    const targetProducto = preset.producto;
    const targetFrameworkId = preset.frameworkId;
    const targetIa = preset.ia;

    if (!targetRama) return;
    if (!ramasJuridicas.includes(targetRama)) return;

    setRama(targetRama);

    const productosForRama = branchFrameworks
      .filter((item) => item.rama === targetRama)
      .map((item) => item.producto);

    const productoToUse = targetProducto && productosForRama.includes(targetProducto) ? targetProducto : "";
    setProducto(productoToUse);

    let frameworkToUse = "";
    if (productoToUse && targetFrameworkId) {
      const match = branchFrameworks.find(
        (item) =>
          item.rama === targetRama && item.producto === productoToUse && item.id === targetFrameworkId
      );
      if (match) frameworkToUse = match.framework;
    }
    setFrameworkName(frameworkToUse);
    setValues({});

    if (targetIa && targetAIs.includes(targetIa)) {
      setIa(targetIa);
    }

    if (frameworkToUse) setStep(3);
    else if (productoToUse) setStep(2);
    else setStep(1);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const preset: PromptBuilderPreset = {
      rama: (params.get("rama") as RamaJuridica) || undefined,
      producto: params.get("producto") || undefined,
      frameworkId: params.get("framework") || undefined,
      ia: (params.get("ia") as TargetAI) || undefined
    };
    if (preset.rama) applyPreset(preset);
  }, [applyPreset]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<PromptBuilderPreset>).detail;
      if (!detail) return;
      applyPreset(detail);
    };
    window.addEventListener(PROMPT_BUILDER_PRESET_EVENT, handler);
    return () => window.removeEventListener(PROMPT_BUILDER_PRESET_EVENT, handler);
  }, [applyPreset]);

  const productosDisponibles = useMemo(() => {
    if (!rama) return [];
    return Array.from(
      new Set(branchFrameworks.filter((item) => item.rama === rama).map((item) => item.producto))
    );
  }, [rama]);

  const frameworksDisponibles = useMemo(() => {
    if (!rama || !producto) return [];
    return branchFrameworks.filter((item) => item.rama === rama && item.producto === producto);
  }, [rama, producto]);

  const selectedFramework = useMemo(
    () => frameworksDisponibles.find((item) => item.framework === frameworkName) ?? null,
    [frameworksDisponibles, frameworkName]
  );

  const variables = useMemo(
    () => (selectedFramework ? extractVariables(selectedFramework.plantilla) : []),
    [selectedFramework]
  );

  const finalPrompt = useMemo(() => {
    if (!selectedFramework) return "";
    const filled = fillTemplate(selectedFramework.plantilla, values);
    return assemblePrompt({ ia, framework: selectedFramework, filled });
  }, [selectedFramework, values, ia]);

  const quality = useMemo(() => analyzeQuality(finalPrompt), [finalPrompt]);

  // Autoguardar en historial al entrar al paso 4 con un prompt nuevo
  useEffect(() => {
    if (step !== 4 || !finalPrompt || !selectedFramework) return;
    setHistory((prev) => {
      if (prev[0]?.texto === finalPrompt) return prev;
      const entry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        fechaIso: new Date().toISOString(),
        rama: selectedFramework.rama,
        producto: selectedFramework.producto,
        framework: selectedFramework.framework,
        ia,
        texto: finalPrompt
      };
      const next = [entry, ...prev].slice(0, HISTORY_MAX);
      persistHistory(next);
      return next;
    });
  }, [step, finalPrompt, selectedFramework, ia]);

  const canAdvance = useMemo(() => {
    if (step === 1) return Boolean(ia && rama && producto);
    if (step === 2) return Boolean(selectedFramework);
    if (step === 3) return true;
    return true;
  }, [step, ia, rama, producto, selectedFramework]);

  const goNext = useCallback(() => {
    setStep((current) => (current < 4 ? ((current + 1) as Step) : current));
  }, []);

  const goBack = useCallback(() => {
    setStep((current) => (current > 1 ? ((current - 1) as Step) : current));
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setIa("ChatGPT");
    setRama("");
    setProducto("");
    setFrameworkName("");
    setValues({});
    setCopied(false);
  }, []);

  const onRamaChange = useCallback((value: RamaJuridica | "") => {
    setRama(value);
    setProducto("");
    setFrameworkName("");
    setValues({});
  }, []);

  const onProductoChange = useCallback((value: string) => {
    setProducto(value);
    setFrameworkName("");
    setValues({});
  }, []);

  const onFrameworkChange = useCallback((name: string) => {
    setFrameworkName(name);
    setValues({});
  }, []);

  const onVariableChange = useCallback((token: string, value: string) => {
    setValues((prev) => ({ ...prev, [token]: value }));
  }, []);

  const onCopy = useCallback(async () => {
    if (!finalPrompt) return;
    try {
      await navigator.clipboard.writeText(finalPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [finalPrompt]);

  const slug = useMemo(() => {
    if (!selectedFramework) return "prompt";
    return selectedFramework.framework
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }, [selectedFramework]);

  const onDownloadTxt = useCallback(() => {
    if (!finalPrompt) return;
    download(`${slug}.txt`, finalPrompt, "text/plain;charset=utf-8");
  }, [finalPrompt, slug]);

  const onDownloadMd = useCallback(() => {
    if (!finalPrompt) return;
    download(`${slug}.md`, finalPrompt, "text/markdown;charset=utf-8");
  }, [finalPrompt, slug]);

  const onCopyHistoryEntry = useCallback(async (entry: HistoryEntry) => {
    try {
      await navigator.clipboard.writeText(entry.texto);
    } catch {
      // ignore
    }
  }, []);

  const onDownloadHistoryEntry = useCallback((entry: HistoryEntry) => {
    const fname = entry.framework.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    download(`${fname}-${entry.id}.txt`, entry.texto, "text/plain;charset=utf-8");
  }, []);

  const onDeleteHistoryEntry = useCallback((id: string) => {
    setHistory((prev) => {
      const next = prev.filter((entry) => entry.id !== id);
      persistHistory(next);
      return next;
    });
  }, []);

  const onClearHistory = useCallback(() => {
    setHistory([]);
    persistHistory([]);
  }, []);

  const openGuide = useCallback(() => setGuideOpen(true), []);
  const closeGuide = useCallback(() => setGuideOpen(false), []);

  return (
    <section
      id="prompt-builder"
      className="scroll-mt-24 py-14"
      style={{ backgroundColor: "#f5f6fa" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <p
            className="text-sm font-black uppercase tracking-[0.18em]"
            style={{ color: GOLD }}
          >
            Constructor de prompts
          </p>
          <h2
            className="mt-2 text-3xl font-black tracking-normal sm:text-4xl"
            style={{ color: NAVY }}
          >
            Wizard de 4 pasos · sin llamadas a IA
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#4B5563]">
            Construye un prompt estructurado y cópialo en la IA de tu elección. Toda la lógica corre
            en tu navegador.
          </p>
        </header>

        <Stepper current={step} />

        <div
          className="mt-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-7"
          style={{ borderColor: "#D4D5D5" }}
        >
          {step === 1 ? (
            <StepContexto
              ia={ia}
              rama={rama}
              producto={producto}
              productosDisponibles={productosDisponibles}
              onIaChange={setIa}
              onRamaChange={onRamaChange}
              onProductoChange={onProductoChange}
              onOpenGuide={openGuide}
            />
          ) : null}

          {step === 2 ? (
            <StepFramework
              frameworks={frameworksDisponibles}
              selected={frameworkName}
              onSelect={onFrameworkChange}
            />
          ) : null}

          {step === 3 ? (
            <StepVariables
              framework={selectedFramework}
              variables={variables}
              values={values}
              onChange={onVariableChange}
            />
          ) : null}

          {step === 4 ? (
            <StepResultado
              prompt={finalPrompt}
              copied={copied}
              quality={quality}
              ia={ia}
              history={history}
              onCopy={onCopy}
              onDownloadTxt={onDownloadTxt}
              onDownloadMd={onDownloadMd}
              onReset={reset}
              onOpenGuide={openGuide}
              onCopyHistory={onCopyHistoryEntry}
              onDownloadHistory={onDownloadHistoryEntry}
              onDeleteHistory={onDeleteHistoryEntry}
              onClearHistory={onClearHistory}
            />
          ) : null}

          {step !== 4 ? (
            <div className="mt-7 flex items-center justify-between gap-3 border-t pt-5" style={{ borderColor: "#E5E7EB" }}>
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="inline-flex h-11 items-center justify-center rounded-lg border px-5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canAdvance}
                className="inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: NAVY }}
              >
                {step === 3 ? "Generar prompt" : "Continuar"}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {guideOpen ? <AIGuideModal ia={ia} onClose={closeGuide} /> : null}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-componentes
// ─────────────────────────────────────────────────────────────

function Stepper({ current }: { current: Step }) {
  const labels = ["Contexto", "Framework", "Variables", "Prompt"];
  return (
    <ol className="grid grid-cols-4 gap-2">
      {labels.map((label, index) => {
        const stepNumber = (index + 1) as Step;
        const isActive = current === stepNumber;
        const isDone = current > stepNumber;
        const baseColor = isDone || isActive ? NAVY : "#D4D5D5";
        const fillColor = isActive ? GOLD : isDone ? NAVY : "#FFFFFF";
        const textColor = isActive ? NAVY : isDone ? "#FFFFFF" : "#6F7072";
        return (
          <li
            key={label}
            className="flex flex-col items-center gap-2 rounded-lg border bg-white px-2 py-3 text-center"
            style={{ borderColor: baseColor }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-black"
              style={{
                backgroundColor: fillColor,
                color: textColor,
                border: `2px solid ${baseColor}`
              }}
            >
              {stepNumber}
            </span>
            <span
              className="text-xs font-bold uppercase tracking-[0.1em]"
              style={{ color: isActive ? NAVY : "#6F7072" }}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StepContexto({
  ia,
  rama,
  producto,
  productosDisponibles,
  onIaChange,
  onRamaChange,
  onProductoChange,
  onOpenGuide
}: {
  ia: TargetAI;
  rama: RamaJuridica | "";
  producto: string;
  productosDisponibles: string[];
  onIaChange: (value: TargetAI) => void;
  onRamaChange: (value: RamaJuridica | "") => void;
  onProductoChange: (value: string) => void;
  onOpenGuide: () => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeader title="Contexto" subtitle="Define para qué IA, qué rama y qué producto jurídico." />

      <Field label="¿Para qué IA estás escribiendo?">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {targetAIs.map((option) => {
            const selected = option === ia;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onIaChange(option)}
                className="h-11 rounded-lg border px-3 text-sm font-bold transition"
                style={{
                  backgroundColor: selected ? NAVY : "white",
                  color: selected ? "white" : NAVY,
                  borderColor: selected ? NAVY : "#D4D5D5"
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onOpenGuide}
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold underline"
          style={{ color: GOLD }}
        >
          Ver guía rápida para {ia} →
        </button>
      </Field>

      <Field label="¿Qué rama del derecho?">
        <select
          value={rama}
          onChange={(event) => onRamaChange(event.target.value as RamaJuridica | "")}
          className="h-12 w-full rounded-lg border bg-white px-3 text-sm font-semibold outline-none transition focus:ring-4"
          style={{ borderColor: "#D4D5D5", color: NAVY }}
        >
          <option value="">Selecciona una rama…</option>
          {ramasJuridicas.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="¿Qué producto jurídico quieres generar?">
        <select
          value={producto}
          onChange={(event) => onProductoChange(event.target.value)}
          disabled={!rama}
          className="h-12 w-full rounded-lg border bg-white px-3 text-sm font-semibold outline-none transition focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ borderColor: "#D4D5D5", color: NAVY }}
        >
          <option value="">
            {rama ? "Selecciona un producto…" : "Primero elige una rama"}
          </option>
          {productosDisponibles.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}

function StepFramework({
  frameworks,
  selected,
  onSelect
}: {
  frameworks: BranchFramework[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="space-y-5">
      <StepHeader
        title="Framework"
        subtitle="Elige una estructura adecuada para tu producto."
      />

      {frameworks.length === 0 ? (
        <p className="rounded-lg border border-dashed bg-[#F8FAFF] p-4 text-sm" style={{ borderColor: "#D4D5D5", color: "#4B5563" }}>
          No hay frameworks registrados para esta combinación. Vuelve atrás y prueba con otro
          producto.
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {frameworks.map((framework) => {
          const isSelected = framework.framework === selected;
          return (
            <button
              key={framework.framework}
              type="button"
              onClick={() => onSelect(framework.framework)}
              className="flex h-full flex-col rounded-xl border p-5 text-left transition hover:-translate-y-0.5"
              style={{
                borderColor: isSelected ? GOLD : "#D4D5D5",
                backgroundColor: isSelected ? "#FFFCEC" : "white",
                boxShadow: isSelected ? `0 0 0 3px ${GOLD}33` : undefined
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-[0.1em]"
                  style={{ backgroundColor: NAVY, color: "white" }}
                >
                  {framework.nivel}
                </span>
                {isSelected ? (
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-black"
                    style={{ backgroundColor: GOLD, color: NAVY }}
                  >
                    Seleccionado
                  </span>
                ) : null}
              </div>
              <h3 className="text-lg font-black" style={{ color: NAVY }}>
                {framework.framework}
              </h3>
              <p className="mt-2 text-sm font-semibold text-[#6F7072]">{framework.producto}</p>
              <p className="mt-3 text-sm leading-6 text-[#4B5563]">
                Estructura: {framework.estructura.join(" · ")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {framework.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2.5 py-1 text-xs font-bold"
                    style={{ borderColor: "#D4D5D5", color: "#6F7072" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepVariables({
  framework,
  variables,
  values,
  onChange
}: {
  framework: BranchFramework | null;
  variables: string[];
  values: Record<string, string>;
  onChange: (token: string, value: string) => void;
}) {
  if (!framework) {
    return (
      <p className="rounded-lg border border-dashed bg-[#F8FAFF] p-4 text-sm text-[#4B5563]">
        Selecciona un framework antes de completar variables.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <StepHeader
        title="Variables"
        subtitle="Completa los campos detectados en la plantilla. Lo que dejes vacío se mantendrá como marcador."
      />

      {variables.length === 0 ? (
        <p className="rounded-lg border border-dashed bg-[#F8FAFF] p-4 text-sm text-[#4B5563]">
          La plantilla no tiene marcadores entre corchetes; puedes continuar.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {variables.map((token) => {
            const placeholder = token.replace(/^\[|\]$/g, "");
            const isLong = placeholder.length > 28 || placeholder.includes("/");
            return (
              <label key={token} className={`block ${isLong ? "md:col-span-2" : ""}`}>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.1em]" style={{ color: NAVY }}>
                  {placeholder}
                </span>
                {isLong ? (
                  <textarea
                    value={values[token] ?? ""}
                    onChange={(event) => onChange(token, event.target.value)}
                    placeholder={`Reemplaza ${token}`}
                    className="min-h-[88px] w-full resize-y rounded-lg border bg-white p-3 text-sm leading-6 outline-none transition focus:ring-4"
                    style={{ borderColor: "#D4D5D5", color: "#0B1220" }}
                  />
                ) : (
                  <input
                    type="text"
                    value={values[token] ?? ""}
                    onChange={(event) => onChange(token, event.target.value)}
                    placeholder={`Reemplaza ${token}`}
                    className="h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none transition focus:ring-4"
                    style={{ borderColor: "#D4D5D5", color: "#0B1220" }}
                  />
                )}
              </label>
            );
          })}
        </div>
      )}

      <details className="rounded-lg border bg-[#F8FAFF] p-4 text-sm" style={{ borderColor: "#D4D5D5" }}>
        <summary className="cursor-pointer font-bold" style={{ color: NAVY }}>
          Ver ejemplo de uso del framework
        </summary>
        <p className="mt-3 leading-6 text-[#4B5563]">{framework.ejemplo}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
          Errores frecuentes
        </p>
        <ul className="mt-2 space-y-1 text-sm text-[#4B5563]">
          {framework.erroresComunes.map((error) => (
            <li key={error} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
              {error}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function StepResultado({
  prompt,
  copied,
  quality,
  ia,
  history,
  onCopy,
  onDownloadTxt,
  onDownloadMd,
  onReset,
  onOpenGuide,
  onCopyHistory,
  onDownloadHistory,
  onDeleteHistory,
  onClearHistory
}: {
  prompt: string;
  copied: boolean;
  quality: ReturnType<typeof analyzeQuality>;
  ia: TargetAI;
  history: HistoryEntry[];
  onCopy: () => void;
  onDownloadTxt: () => void;
  onDownloadMd: () => void;
  onReset: () => void;
  onOpenGuide: () => void;
  onCopyHistory: (entry: HistoryEntry) => void;
  onDownloadHistory: (entry: HistoryEntry) => void;
  onDeleteHistory: (id: string) => void;
  onClearHistory: () => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Prompt generado"
        subtitle="Copia este prompt y pégalo en la IA que elegiste. Esta aplicación no envía nada a ningún servidor."
      />

      <textarea
        readOnly
        value={prompt}
        className="min-h-[420px] w-full resize-y rounded-lg border p-4 font-mono text-sm leading-6 outline-none"
        style={{ borderColor: NAVY, backgroundColor: NAVY, color: "white" }}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ActionButton onClick={onCopy} primary>
          {copied ? "¡Copiado!" : "Copiar al portapapeles"}
        </ActionButton>
        <ActionButton onClick={onDownloadTxt}>Descargar .txt</ActionButton>
        <ActionButton onClick={onDownloadMd}>Descargar .md</ActionButton>
        <ActionButton onClick={onReset} accent>
          Empezar de nuevo
        </ActionButton>
      </div>

      <QualityAnalyzer quality={quality} ia={ia} onOpenGuide={onOpenGuide} />

      <HistoryPanel
        history={history}
        onCopy={onCopyHistory}
        onDownload={onDownloadHistory}
        onDelete={onDeleteHistory}
        onClear={onClearHistory}
      />
    </div>
  );
}

function QualityAnalyzer({
  quality,
  ia,
  onOpenGuide
}: {
  quality: ReturnType<typeof analyzeQuality>;
  ia: TargetAI;
  onOpenGuide: () => void;
}) {
  const scoreColor = quality.score >= 3 ? "#116B35" : quality.score >= 2 ? "#B07000" : "#9F1239";
  return (
    <section className="rounded-xl border p-5" style={{ borderColor: "#D4D5D5", backgroundColor: "white" }}>
      <header className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-black" style={{ color: NAVY }}>
            Analizador de calidad del prompt
          </h3>
          <p className="mt-1 text-xs text-[#6F7072]">
            Evaluación local sobre 4 criterios. Sin llamadas a IA.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-black text-white"
            style={{ backgroundColor: scoreColor }}
          >
            {quality.score}/4
          </span>
          <button
            type="button"
            onClick={onOpenGuide}
            className="text-xs font-bold underline"
            style={{ color: GOLD }}
          >
            Consejos para {ia}
          </button>
        </div>
      </header>

      <ul className="space-y-3">
        {quality.criteria.map((criterion) => (
          <li
            key={criterion.key}
            className="rounded-lg border p-3"
            style={{
              borderColor: criterion.ok ? "#C7E8D2" : "#F3D9DB",
              backgroundColor: criterion.ok ? "#F1FBF4" : "#FDF3F4"
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                style={{ backgroundColor: criterion.ok ? "#116B35" : "#9F1239" }}
              >
                {criterion.ok ? "✓" : "!"}
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: NAVY }}>
                  {criterion.label}
                </p>
                {!criterion.ok ? (
                  <p className="mt-1 text-sm leading-6 text-[#4B5563]">{criterion.sugerencia}</p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HistoryPanel({
  history,
  onCopy,
  onDownload,
  onDelete,
  onClear
}: {
  history: HistoryEntry[];
  onCopy: (entry: HistoryEntry) => void;
  onDownload: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <section className="rounded-xl border p-5" style={{ borderColor: "#D4D5D5", backgroundColor: "white" }}>
      <header className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-black" style={{ color: NAVY }}>
            Historial de prompts
          </h3>
          <p className="mt-1 text-xs text-[#6F7072]">
            Hasta {HISTORY_MAX} prompts guardados localmente en este navegador (localStorage). No se
            envía nada a ningún servidor.
          </p>
        </div>
        {history.length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-bold underline"
            style={{ color: "#9F1239" }}
          >
            Borrar historial
          </button>
        ) : null}
      </header>

      {history.length === 0 ? (
        <p className="rounded-lg border border-dashed bg-[#F8FAFF] p-4 text-sm text-[#4B5563]">
          Aún no hay prompts guardados. Al llegar al paso 4 se guardan automáticamente.
        </p>
      ) : (
        <ol className="space-y-2">
          {history.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border p-3"
              style={{ borderColor: "#E5E7EB", backgroundColor: "#F8FAFF" }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight" style={{ color: NAVY }}>
                    {entry.framework} · {entry.producto}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#6F7072]">
                    {entry.rama} · {entry.ia} · {formatDate(entry.fechaIso)}
                  </p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs font-bold" style={{ color: GOLD }}>
                      Ver texto completo
                    </summary>
                    <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded border bg-white p-3 font-mono text-xs leading-5 text-[#0B1220]" style={{ borderColor: "#D4D5D5" }}>
                      {entry.texto}
                    </pre>
                  </details>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onCopy(entry)}
                    className="rounded-lg border px-3 py-1.5 text-xs font-bold transition hover:opacity-90"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    Copiar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDownload(entry)}
                    className="rounded-lg border px-3 py-1.5 text-xs font-bold transition hover:opacity-90"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    .txt
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(entry.id)}
                    className="rounded-lg border px-3 py-1.5 text-xs font-bold transition hover:opacity-90"
                    style={{ borderColor: "#9F1239", color: "#9F1239" }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function AIGuideModal({ ia, onClose }: { ia: TargetAI; onClose: () => void }) {
  const guide = aiGuides[ia];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cerrar guía"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-labelledby="ai-guide-title"
        className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <header
          className="sticky top-0 flex items-start justify-between gap-3 border-b px-6 py-4"
          style={{ backgroundColor: NAVY, color: "white" }}
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em]" style={{ color: GOLD }}>
              Guía rápida
            </p>
            <h3 id="ai-guide-title" className="mt-1 text-xl font-black">
              {guide.titulo}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-lg font-black transition hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
          >
            ×
          </button>
        </header>
        <div className="px-6 py-5">
          <ol className="space-y-3">
            {guide.consejos.map((tip, index) => (
              <li key={tip} className="flex gap-3 text-sm leading-6 text-[#4B5563]">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black"
                  style={{ backgroundColor: GOLD, color: NAVY }}
                >
                  {index + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  primary,
  accent
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  accent?: boolean;
}) {
  const styleProps = accent
    ? { backgroundColor: GOLD, color: NAVY, borderColor: GOLD }
    : primary
      ? { backgroundColor: NAVY, color: "white", borderColor: NAVY }
      : { backgroundColor: "white", color: NAVY, borderColor: NAVY };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center justify-center rounded-lg border px-4 text-sm font-bold transition hover:opacity-90"
      style={styleProps}
    >
      {children}
    </button>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-2xl font-black" style={{ color: NAVY }}>
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#4B5563]">{subtitle}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-black" style={{ color: NAVY }}>
        {label}
      </p>
      {children}
    </div>
  );
}
