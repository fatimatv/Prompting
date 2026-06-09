"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Copy,
  Columns3,
  FileSearch,
  Filter,
  Layers3,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Wand2,
  X
} from "lucide-react";
import {
  branchFrameworks,
  frameworks,
  legalUses,
  levels,
  outputTypes,
  ramasJuridicas,
  type Framework,
  type FrameworkLevel,
  type LegalUse,
  type OutputType
} from "@/lib/frameworks";
import { legalProducts } from "@/lib/legal-products";
import { LegalConsultationPanel } from "@/components/legal-consultation-panel";
import { ProductsCatalog } from "@/components/products-catalog";
import { PromptBuilder } from "@/components/prompt-builder";

type WizardState = {
  need: string;
  area: string;
  complexity: string;
  output: string;
  baseDocument: string;
};

type PromptOptimizerState = {
  prompt: string;
  audience: string;
  legalArea: string;
  output: string;
  evidence: string;
  tone: string;
  verbosity: string;
  reasoning: string;
};

const initialWizard: WizardState = {
  need: "evaluar riesgos",
  area: "Protección de datos",
  complexity: "intermedio",
  output: "Matriz",
  baseDocument: "sí"
};

const initialOptimizer: PromptOptimizerState = {
  prompt:
    "Actúa como abogado experto en protección de datos y analiza si una empresa puede usar una herramienta de IA para revisar contratos con datos de clientes.",
  audience: "equipo legal interno",
  legalArea: "Protección de datos",
  output: "Informe breve",
  evidence: "usar solo fuentes proporcionadas o pedirlas si faltan",
  tone: "experto, claro y práctico",
  verbosity: "medio",
  reasoning: "medium"
};

const navItems = [
  ["Catálogo", "#products-catalog"],
  ["Constructor", "#prompt-builder"],
  ["Frameworks", "#explorar"],
  ["Recomendador", "#recomendador"],
  ["Optimizador", "#optimizador"],
  ["Consulta", "#consulta"],
  ["Guía", "#guia"],
  ["Contacto", "#contacto"]
];

const educationalBlocks = [
  {
    title: "Un buen prompt no sustituye el criterio jurídico.",
    body: "Sirve para ordenar trabajo, explorar hipótesis y acelerar borradores. La interpretación, validación y decisión siguen siendo profesionales."
  },
  {
    title: "La IA necesita contexto, límites y formato.",
    body: "Un encargo legal sin hechos, jurisdicción, fuente o salida esperada suele producir respuestas amplias y poco útiles."
  },
  {
    title: "La revisión humana no es opcional.",
    body: "Contrasta normas, fuentes, confidencialidad y sesgos antes de usar cualquier resultado en un asunto real."
  }
];

const faqs = [
  {
    question: "¿Esto reemplaza el análisis legal?",
    answer: "No. Es una herramienta educativa para diseñar mejores instrucciones y revisar con más orden el trabajo asistido por IA."
  },
  {
    question: "¿Sirve para ChatGPT, Copilot, Claude o Gemini?",
    answer: "Sí. Los frameworks son independientes del modelo, aunque cada plataforma puede requerir ajustes de longitud, formato o manejo de archivos."
  },
  {
    question: "¿Puedo usarlo con información confidencial?",
    answer: "Evita subir datos confidenciales a herramientas sin autorización, contrato, evaluación de riesgo y controles adecuados."
  },
  {
    question: "¿Cómo evito respuestas inventadas?",
    answer: "Pide que se distingan hechos, supuestos y fuentes; exige citas verificables; solicita incertidumbres y ordena no citar autoridades que no pueda verificar."
  },
  {
    question: "¿Qué framework debo usar para contratos?",
    answer: "CLAUSE es el punto de partida más directo. Para revisión de riesgos contractuales, combínalo con RISK o COMPLY."
  },
  {
    question: "¿Qué framework conviene para protección de datos?",
    answer: "DPO Prompt funciona para consultas generales; DPIA Prompt es mejor para tratamientos de alto riesgo o documentación de impacto."
  }
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<FrameworkLevel[]>([]);
  const [selectedUses, setSelectedUses] = useState<LegalUse[]>([]);
  const [selectedOutputs, setSelectedOutputs] = useState<OutputType[]>([]);
  const [activeFramework, setActiveFramework] = useState<Framework | null>(null);
  const [copied, setCopied] = useState(false);
  const [wizard, setWizard] = useState<WizardState>(initialWizard);
  const [optimizer, setOptimizer] = useState<PromptOptimizerState>(initialOptimizer);
  const [optimizerCopied, setOptimizerCopied] = useState(false);
  const [comparisonIds, setComparisonIds] = useState<string[]>(["clause", "dpo-prompt"]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredFrameworks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return frameworks.filter((framework) => {
      const searchable = [
        framework.name,
        framework.description,
        framework.bestUse,
        ...framework.components,
        ...framework.tags,
        ...framework.legalUses,
        ...framework.outputTypes
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(framework.level);
      const matchesUse = selectedUses.length === 0 || selectedUses.some((use) => framework.legalUses.includes(use));
      const matchesOutput =
        selectedOutputs.length === 0 || selectedOutputs.some((output) => framework.outputTypes.includes(output));

      return matchesQuery && matchesLevel && matchesUse && matchesOutput;
    });
  }, [query, selectedLevels, selectedOutputs, selectedUses]);

  const recommendations = useMemo(() => recommendFrameworks(wizard), [wizard]);
  const optimizedPrompt = useMemo(() => buildOptimizedPrompt(optimizer), [optimizer]);
  const promptDiagnosis = useMemo(() => diagnosePrompt(optimizer.prompt), [optimizer.prompt]);
  const comparedFrameworks = comparisonIds
    .map((id) => frameworks.find((framework) => framework.id === id))
    .filter(Boolean) as Framework[];

  async function copyTemplate(framework: Framework) {
    await navigator.clipboard.writeText(framework.editableTemplate);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function copyOptimizedPrompt() {
    await navigator.clipboard.writeText(optimizedPrompt);
    setOptimizerCopied(true);
    window.setTimeout(() => setOptimizerCopied(false), 1600);
  }

  function toggleComparison(id: string) {
    setComparisonIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      if (current.length >= 3) {
        return [current[1], current[2], id].filter(Boolean);
      }
      return [...current, id];
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#111827]">
      <Header mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />

      <section className="relative border-b border-[#D4D5D5] bg-[#011EF4] pt-24 text-white">
        <DigitalPattern />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-[#FBBB02]" />
              IALAW Digital Lawyers
            </div>
            <h1 className="max-w-4xl text-balance text-3xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Elige la estructura de prompt adecuada para trabajar mejor con IA en Derecho
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/86 sm:text-lg sm:leading-8">
              Explora, compara y aplica frameworks de prompting diseñados para análisis jurídico, protección de datos,
              compliance, ciberseguridad, contratos, investigación legal y docencia.
            </p>
            <MobileHeroPanel />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
              <a
                href="#explorar"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-[#011EF4] shadow-lg shadow-black/10 transition hover:bg-[#F5F7FF]"
              >
                Explorar frameworks
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#recomendador"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#FBBB02] bg-[#FBBB02] px-5 text-sm font-bold text-[#111827] transition hover:bg-[#ffd046]"
              >
                Encontrar el mejor para mí
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroDashboard />
          </div>
        </div>
      </section>

      <ProductsCatalog />

      <PromptBuilder />

      <section id="explorar" className="scroll-mt-24 bg-[#F8FAFF] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#011EF4]">Explorar</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-[#0B1220]">Frameworks legales de prompting</h2>
              <p className="mt-3 max-w-3xl text-[#4B5563]">
                Filtra por nivel, uso jurídico y tipo de salida. Cada tarjeta incluye plantilla, ejemplo y errores
                frecuentes.
              </p>
            </div>
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F7072]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 w-full rounded-lg border border-[#D4D5D5] bg-white pl-10 pr-4 text-sm outline-none ring-[#011EF4]/20 transition focus:border-[#011EF4] focus:ring-4"
                placeholder="Buscar por contrato, DPIA, riesgo, docencia..."
              />
            </div>
          </div>

          <Filters
            selectedLevels={selectedLevels}
            selectedUses={selectedUses}
            selectedOutputs={selectedOutputs}
            setSelectedLevels={setSelectedLevels}
            setSelectedUses={setSelectedUses}
            setSelectedOutputs={setSelectedOutputs}
          />

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-[#6F7072]">{filteredFrameworks.length} frameworks encontrados</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedLevels([]);
                setSelectedUses([]);
                setSelectedOutputs([]);
              }}
              className="text-sm font-bold text-[#011EF4] hover:text-[#0118BF]"
            >
              Limpiar filtros
            </button>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredFrameworks.map((framework) => (
              <FrameworkCard
                key={framework.id}
                framework={framework}
                isCompared={comparisonIds.includes(framework.id)}
                onOpen={() => setActiveFramework(framework)}
                onCompare={() => toggleComparison(framework.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="recomendador" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#011EF4]">Recomendador</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-[#0B1220]">Encuentra una estructura útil para tu encargo</h2>
            <p className="mt-3 text-[#4B5563]">
              Responde cinco preguntas y obtén una recomendación basada en reglas. Es una guía práctica, no un dictamen.
            </p>
          </div>
          <div className="rounded-xl border border-[#D4D5D5] bg-[#F8FAFF] p-4 shadow-sm sm:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="¿Qué necesitas hacer?"
                value={wizard.need}
                options={["evaluar riesgos", "redactar cláusula", "analizar norma", "preparar clase", "auditar cumplimiento"]}
                onChange={(value) => setWizard({ ...wizard, need: value })}
              />
              <SelectField
                label="¿Cuál es tu área legal?"
                value={wizard.area}
                options={legalUses}
                onChange={(value) => setWizard({ ...wizard, area: value })}
              />
              <SelectField
                label="¿Qué tan complejo es el caso?"
                value={wizard.complexity}
                options={["básico", "intermedio", "avanzado"]}
                onChange={(value) => setWizard({ ...wizard, complexity: value })}
              />
              <SelectField
                label="¿Qué salida esperas?"
                value={wizard.output}
                options={outputTypes}
                onChange={(value) => setWizard({ ...wizard, output: value })}
              />
              <SelectField
                label="¿Tienes norma, contrato, sentencia o documento base?"
                value={wizard.baseDocument}
                options={["sí", "no", "parcialmente"]}
                onChange={(value) => setWizard({ ...wizard, baseDocument: value })}
              />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {recommendations.map((framework, index) => (
                <button
                  key={framework.id}
                  type="button"
                  onClick={() => setActiveFramework(framework)}
                  className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#011EF4] ${
                    index === 0 ? "border-[#011EF4] ring-4 ring-[#011EF4]/10" : "border-[#D4D5D5]"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#011EF4] px-2.5 py-1 text-xs font-black text-white">
                      {index === 0 ? "Principal" : "Alternativa"}
                    </span>
                    <span className="text-xs font-bold text-[#6F7072]">{framework.level}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#0B1220]">{framework.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4B5563]">{framework.bestUse}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PromptOptimizer
        optimizer={optimizer}
        setOptimizer={setOptimizer}
        optimizedPrompt={optimizedPrompt}
        diagnosis={promptDiagnosis}
        copied={optimizerCopied}
        onCopy={copyOptimizedPrompt}
      />

      <LegalConsultationPanel />

      <section id="comparar" className="scroll-mt-24 bg-[#0118BF] py-14 text-white">
        <DigitalPattern />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FBBB02]">Comparar</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal">Compara hasta 3 frameworks</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-white/78">
              Selecciona tarjetas en el explorador o usa estos controles para contrastar complejidad, contexto y riesgo
              de respuesta genérica.
            </p>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {frameworks.map((framework) => (
              <button
                key={framework.id}
                type="button"
                onClick={() => toggleComparison(framework.id)}
                className={`rounded-full border px-3 py-1.5 text-sm font-bold transition ${
                  comparisonIds.includes(framework.id)
                    ? "border-[#FBBB02] bg-[#FBBB02] text-[#111827]"
                    : "border-white/30 bg-white/10 text-white hover:bg-white/16"
                }`}
              >
                {framework.acronym}
              </button>
            ))}
          </div>

          <ComparisonTable frameworks={comparedFrameworks} />
        </div>
      </section>

      <section id="guia" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#011EF4]">Guía</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-[#0B1220]">Prompting jurídico sin humo</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {educationalBlocks.map((block) => (
              <article key={block.title} className="rounded-xl border border-[#D4D5D5] bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FBBB02] text-[#111827]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-[#0B1220]">{block.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4B5563]">{block.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-black text-[#0B1220]">Preguntas frecuentes</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-[#D4D5D5] bg-[#F8FAFF] p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-[#0B1220]">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#4B5563]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {activeFramework ? (
        <FrameworkModal
          framework={activeFramework}
          copied={copied}
          onClose={() => setActiveFramework(null)}
          onCopy={() => copyTemplate(activeFramework)}
        />
      ) : null}
    </main>
  );
}

function Header({
  mobileNavOpen,
  setMobileNavOpen
}: {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/15 bg-[#011EF4]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <LogoMark />
          <div className="leading-tight">
            <div className="text-lg font-black tracking-normal">IALAW</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/72">Digital Lawyers</div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-bold text-white/82 transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#recomendador"
            className="inline-flex h-10 items-center rounded-lg bg-[#FBBB02] px-4 text-sm font-black text-[#111827] transition hover:bg-[#ffd046]"
          >
            Crear mi prompt legal
          </a>
        </div>
        <button
          type="button"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 lg:hidden"
          aria-label="Abrir navegación"
        >
          {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileNavOpen ? (
        <div className="border-t border-white/15 px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-bold text-white/86 hover:bg-white/10"
              >
                {label}
              </a>
            ))}
            <a
              href="#recomendador"
              onClick={() => setMobileNavOpen(false)}
              className="rounded-lg bg-[#FBBB02] px-3 py-3 text-center text-sm font-black text-[#111827]"
            >
              Crear mi prompt legal
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function LogoMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#011EF4] shadow-sm">
      <span className="text-lg font-black">IA</span>
    </div>
  );
}

function DigitalPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px), radial-gradient(circle at 18% 28%, #FBBB02 0 2px, transparent 3px), radial-gradient(circle at 72% 42%, #99D8EA 0 2px, transparent 3px)",
        backgroundSize: "54px 54px, 54px 54px, 190px 190px, 220px 220px"
      }}
    />
  );
}

function HeroDashboard() {
  const ramaCount = ramasJuridicas.length;
  const productCount = legalProducts.length;
  const frameworkCount = frameworks.length + branchFrameworks.length;

  return (
    <div className="relative flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white p-4 text-[#0B1220] shadow-2xl shadow-black/20 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#011EF4]">Prompt Lab Legal IA</p>
            <h2 className="mt-1 text-2xl font-black">Construye tu prompt en 4 pasos</h2>
          </div>
          <div className="rounded-lg bg-[#FBBB02] px-3 py-2 text-xs font-black">Beta educativo</div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            [String(ramaCount), "ramas"],
            [String(productCount), "productos"],
            [String(frameworkCount), "frameworks"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl bg-[#011EF4] p-3 text-white">
              <div className="text-2xl font-black">{value}</div>
              <div className="text-xs font-bold text-white/76">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-[#D4D5D5] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FBBB02]" />
            <p className="text-sm font-black">Ramas cubiertas</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ramasJuridicas.map((rama) => (
              <a
                key={rama}
                href="#products-catalog"
                className="rounded-full border border-[#D4D5D5] bg-white px-3 py-1 text-xs font-bold text-[#0B1220] transition hover:border-[#011EF4] hover:text-[#011EF4]"
              >
                {rama}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href="#products-catalog"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#011EF4] bg-white p-3 text-center text-sm font-black text-[#011EF4] transition hover:bg-[#011EF4] hover:text-white"
          >
            <FileSearch className="h-4 w-4" />
            Ver catálogo
          </a>
          <a
            href="#prompt-builder"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FBBB02] p-3 text-center text-sm font-black text-[#0B1220] transition hover:bg-[#ffd046]"
          >
            <Layers3 className="h-4 w-4" />
            Constructor →
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileHeroPanel() {
  const frameworkCount = frameworks.length + branchFrameworks.length;
  return (
    <div className="mt-5 rounded-xl border border-white/20 bg-white/10 p-3 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FBBB02]">Panel legal IA</p>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-[#011EF4]">
          {ramasJuridicas.length} ramas · {frameworkCount} frameworks
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {ramasJuridicas.map((rama) => (
          <a
            key={rama}
            href="#products-catalog"
            className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-xs font-bold transition hover:bg-white/20"
          >
            {rama}
          </a>
        ))}
      </div>
    </div>
  );
}

function Filters({
  selectedLevels,
  selectedUses,
  selectedOutputs,
  setSelectedLevels,
  setSelectedUses,
  setSelectedOutputs
}: {
  selectedLevels: FrameworkLevel[];
  selectedUses: LegalUse[];
  selectedOutputs: OutputType[];
  setSelectedLevels: (levels: FrameworkLevel[]) => void;
  setSelectedUses: (uses: LegalUse[]) => void;
  setSelectedOutputs: (outputs: OutputType[]) => void;
}) {
  return (
    <div className="rounded-xl border border-[#D4D5D5] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-sm font-black text-[#0B1220]">
        <Filter className="h-4 w-4 text-[#011EF4]" />
        Filtros
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <FilterGroup
          title="Nivel"
          options={levels}
          selected={selectedLevels}
          onChange={(value) => setSelectedLevels(toggleValue(selectedLevels, value))}
        />
        <FilterGroup
          title="Uso jurídico"
          options={legalUses}
          selected={selectedUses}
          onChange={(value) => setSelectedUses(toggleValue(selectedUses, value))}
        />
        <FilterGroup
          title="Tipo de salida"
          options={outputTypes}
          selected={selectedOutputs}
          onChange={(value) => setSelectedOutputs(toggleValue(selectedOutputs, value))}
        />
      </div>
    </div>
  );
}

function FilterGroup<T extends string>({
  title,
  options,
  selected,
  onChange
}: {
  title: string;
  options: T[];
  selected: T[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#6F7072]">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                isSelected
                  ? "border-[#011EF4] bg-[#011EF4] text-white"
                  : "border-[#D4D5D5] bg-white text-[#4B5563] hover:border-[#011EF4]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function FrameworkCard({
  framework,
  isCompared,
  onOpen,
  onCompare
}: {
  framework: Framework;
  isCompared: boolean;
  onOpen: () => void;
  onCompare: () => void;
}) {
  return (
    <article className="flex min-h-[360px] flex-col rounded-xl border border-[#D4D5D5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#011EF4] hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-[#EAF0FF] px-2.5 py-1 text-xs font-black text-[#011EF4]">
            {framework.level}
          </span>
          <h3 className="mt-3 text-xl font-black text-[#0B1220]">{framework.name}</h3>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#011EF4] text-sm font-black text-white">
          {framework.acronym.slice(0, 3)}
        </div>
      </div>
      <p className="text-sm leading-6 text-[#4B5563]">{framework.description}</p>
      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6F7072]">Componentes</p>
        <div className="mt-2 flex flex-wrap gap-2">
            {framework.components.slice(0, 6).map((component, index) => (
              <span key={`${framework.id}-component-${index}-${component}`} className="rounded-full bg-[#F8FAFF] px-2.5 py-1 text-xs font-bold text-[#0B1220]">
              {component}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6F7072]">Casos de uso jurídico</p>
        <p className="mt-2 text-sm text-[#4B5563]">{framework.legalUses.slice(0, 3).join(" · ")}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {framework.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-[#D4D5D5] px-2.5 py-1 text-xs font-bold text-[#6F7072]">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-2 pt-5">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-[#011EF4] px-4 text-sm font-black text-white transition hover:bg-[#0118BF]"
        >
          Ver detalle
        </button>
        <button
          type="button"
          onClick={onCompare}
          className={`inline-flex h-10 items-center justify-center rounded-lg border px-3 text-sm font-black transition ${
            isCompared
              ? "border-[#FBBB02] bg-[#FBBB02] text-[#111827]"
              : "border-[#D4D5D5] bg-white text-[#011EF4] hover:border-[#011EF4]"
          }`}
          aria-label={`Comparar ${framework.name}`}
        >
          <Columns3 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-[#0B1220]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-[#D4D5D5] bg-white px-3 text-sm outline-none ring-[#011EF4]/20 transition focus:border-[#011EF4] focus:ring-4"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PromptOptimizer({
  optimizer,
  setOptimizer,
  optimizedPrompt,
  diagnosis,
  copied,
  onCopy
}: {
  optimizer: PromptOptimizerState;
  setOptimizer: (optimizer: PromptOptimizerState) => void;
  optimizedPrompt: string;
  diagnosis: ReturnType<typeof diagnosePrompt>;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <section id="optimizador" className="scroll-mt-24 bg-[#F8FAFF] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#011EF4]">Optimizador GPT-5.5</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-[#0B1220]">
              Convierte un prompt legal amplio en una instrucción outcome-first
            </h2>
            <p className="mt-3 text-[#4B5563]">
              Basado en la guía GPT-5.5: resultado primero, controles de estilo concisos, presupuesto de evidencia,
              reglas de validación y stop rules jurídicas. No llama a ninguna API.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Outcome", "Define éxito antes del proceso"],
              ["Evidencia", "Limita búsquedas y fuentes"],
              ["Validación", "Pide comprobar antes de cerrar"]
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl border border-[#D4D5D5] bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-[#011EF4]">{title}</p>
                <p className="mt-1 text-xs leading-5 text-[#6F7072]">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-[#D4D5D5] bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-[#011EF4]" />
              <h3 className="text-xl font-black text-[#0B1220]">Prompt original</h3>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-black text-[#0B1220]">Pega o escribe tu prompt legal</span>
              <textarea
                value={optimizer.prompt}
                onChange={(event) => setOptimizer({ ...optimizer, prompt: event.target.value })}
                className="min-h-[220px] w-full resize-y rounded-lg border border-[#D4D5D5] bg-[#F8FAFF] p-4 text-sm leading-6 outline-none ring-[#011EF4]/20 transition focus:border-[#011EF4] focus:ring-4"
                placeholder="Ej.: Analiza este contrato y dime riesgos..."
              />
            </label>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Audiencia"
                value={optimizer.audience}
                options={["equipo legal interno", "compliance officer", "cliente no jurídico", "docentes o estudiantes", "dirección ejecutiva"]}
                onChange={(value) => setOptimizer({ ...optimizer, audience: value })}
              />
              <SelectField
                label="Área legal"
                value={optimizer.legalArea}
                options={legalUses}
                onChange={(value) => setOptimizer({ ...optimizer, legalArea: value })}
              />
              <SelectField
                label="Salida esperada"
                value={optimizer.output}
                options={["Informe breve", "Matriz", "Checklist", "Resumen ejecutivo", "Cláusula", "Plan de acción"]}
                onChange={(value) => setOptimizer({ ...optimizer, output: value })}
              />
              <SelectField
                label="Evidencia"
                value={optimizer.evidence}
                options={[
                  "usar solo fuentes proporcionadas o pedirlas si faltan",
                  "usar solo el documento base",
                  "citar norma y fuente solo si son verificables",
                  "trabajar con supuestos señalados y pendientes de verificación"
                ]}
                onChange={(value) => setOptimizer({ ...optimizer, evidence: value })}
              />
              <SelectField
                label="Tono"
                value={optimizer.tone}
                options={["experto, claro y práctico", "formal y conservador", "didáctico y accesible", "ejecutivo y directo"]}
                onChange={(value) => setOptimizer({ ...optimizer, tone: value })}
              />
              <SelectField
                label="Verbosity"
                value={optimizer.verbosity}
                options={["bajo", "medio", "alto"]}
                onChange={(value) => setOptimizer({ ...optimizer, verbosity: value })}
              />
              <SelectField
                label="Profundidad de razonamiento"
                value={optimizer.reasoning}
                options={["low", "medium", "high"]}
                onChange={(value) => setOptimizer({ ...optimizer, reasoning: value })}
              />
            </div>

            <div className="mt-5 rounded-xl border border-[#D4D5D5] bg-[#F8FAFF] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-black text-[#0B1220]">Diagnóstico GPT-5.5</p>
                <span className="rounded-full bg-[#011EF4] px-3 py-1 text-xs font-black text-white">
                  {diagnosis.score}/100
                </span>
              </div>
              <div className="space-y-2">
                {diagnosis.items.map((item) => (
                  <div key={item.label} className="flex items-start gap-2 text-sm text-[#4B5563]">
                    <span
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        item.ok ? "bg-[#011EF4] text-white" : "bg-[#FBBB02] text-[#111827]"
                      }`}
                    >
                      {item.ok ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                    </span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#D4D5D5] bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-[#011EF4]" />
                <h3 className="text-xl font-black text-[#0B1220]">Prompt optimizado</h3>
              </div>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#011EF4] px-4 text-sm font-black text-white transition hover:bg-[#0118BF]"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copiado" : "Copiar prompt"}
              </button>
            </div>
            <textarea
              value={optimizedPrompt}
              readOnly
              className="min-h-[560px] w-full resize-y rounded-lg border border-[#D4D5D5] bg-[#0B1220] p-4 font-mono text-sm leading-6 text-white outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable({ frameworks: compared }: { frameworks: Framework[] }) {
  const rows = [
    ["Complejidad", (framework: Framework) => framework.level],
    ["Mejor uso", (framework: Framework) => framework.bestUse],
    ["Tipo de resultado", (framework: Framework) => framework.outputTypes.join(", ")],
    ["Nivel de contexto requerido", (framework: Framework) => framework.contextRequired],
    ["Riesgo de respuesta genérica", (framework: Framework) => framework.genericRisk],
    ["Ideal para", (framework: Framework) => framework.idealFor.join(", ")]
  ] as const;

  if (compared.length === 0) {
    return <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-white/80">Selecciona al menos un framework.</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/20 bg-white text-[#0B1220] shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="w-56 border-b border-[#D4D5D5] bg-[#F8FAFF] p-4 font-black">Criterio</th>
              {compared.map((framework) => (
                <th key={framework.id} className="border-b border-[#D4D5D5] p-4 font-black text-[#011EF4]">
                  {framework.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, getter]) => (
              <tr key={label} className="border-b border-[#D4D5D5] last:border-b-0">
                <td className="bg-[#F8FAFF] p-4 font-black">{label}</td>
                {compared.map((framework) => (
                  <td key={`${framework.id}-${label}`} className="p-4 leading-6 text-[#4B5563]">
                    {getter(framework)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FrameworkModal({
  framework,
  copied,
  onClose,
  onCopy
}: {
  framework: Framework;
  copied: boolean;
  onClose: () => void;
  onCopy: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#06112F]/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#D4D5D5] bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#011EF4]">{framework.level}</p>
            <h2 className="text-2xl font-black text-[#0B1220]">{framework.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4D5D5]"
            aria-label="Cerrar detalle"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <DetailBlock title="Qué es" body={framework.whatIs} />
            <DetailBlock title="Cuándo usarlo" body={framework.whenToUse} />
            <section className="rounded-xl border border-[#D4D5D5] p-5">
              <h3 className="font-black text-[#0B1220]">Estructura</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                  {framework.components.map((component, index) => (
                    <span key={`${framework.id}-detail-component-${index}-${component}`} className="rounded-full bg-[#EAF0FF] px-3 py-1.5 text-sm font-bold text-[#011EF4]">
                    {component}
                  </span>
                ))}
              </div>
            </section>
            <DetailBlock title="Ejemplo legal" body={framework.legalExample} />
            <section className="rounded-xl border border-[#D4D5D5] p-5">
              <h3 className="font-black text-[#0B1220]">Errores comunes</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4B5563]">
                {framework.commonMistakes.map((mistake) => (
                  <li key={mistake} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBB02]" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="rounded-xl border border-[#D4D5D5] bg-[#F8FAFF] p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-black text-[#0B1220]">Plantilla editable</h3>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#011EF4] px-3 text-sm font-black text-white hover:bg-[#0118BF]"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copiado" : "Copiar plantilla"}
              </button>
            </div>
            <textarea
              className="min-h-[420px] w-full resize-y rounded-lg border border-[#D4D5D5] bg-white p-4 font-mono text-sm leading-6 text-[#0B1220] outline-none ring-[#011EF4]/20 focus:border-[#011EF4] focus:ring-4"
              defaultValue={framework.editableTemplate}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-xl border border-[#D4D5D5] p-5">
      <h3 className="font-black text-[#0B1220]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#4B5563]">{body}</p>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contacto"
      className="scroll-mt-24 border-t border-[#D4D5D5] bg-[#0B1220] py-12 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <section>
            <div className="flex items-start gap-3">
              <LogoMark />
              <div>
                <h2 className="text-xl font-black">IALAW Digital Lawyers</h2>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Derecho, tecnología e inteligencia artificial al servicio de operadores jurídicos
                  en Latinoamérica.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <a
                href="https://iriartelaw.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FBBB02] transition hover:text-white"
              >
                iriartelaw.com →
              </a>
            </div>
          </section>

          <section>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FBBB02]">
              Navegar
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-semibold text-white/80">
              <a href="#products-catalog" className="hover:text-white">
                Catálogo
              </a>
              <a href="#prompt-builder" className="hover:text-white">
                Constructor
              </a>
              <a href="#explorar" className="hover:text-white">
                Frameworks
              </a>
              <a href="#optimizador" className="hover:text-white">
                Optimizador
              </a>
              <a href="#consulta" className="hover:text-white">
                Consulta
              </a>
              <a href="#guia" className="hover:text-white">
                Guía
              </a>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} IALAW Digital Lawyers.</p>
          <p>
            Esta herramienta es educativa y no sustituye la asesoría legal profesional.
          </p>
        </div>
      </div>
    </footer>
  );
}

function toggleValue<T>(current: T[], value: T) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

function diagnosePrompt(prompt: string) {
  const normalized = prompt.toLowerCase();
  const checks = [
    {
      label: "Define un resultado esperado, no solo una tarea abierta.",
      ok: /resultado|objetivo|entrega|salida|criterio|quiero|necesito|prepara|redacta|analiza|determina/.test(normalized)
    },
    {
      label: "Incluye contexto jurídico suficiente: área, hechos, documento o jurisdicción.",
      ok: /contexto|contrato|norma|ley|sentencia|per[uú]|datos|compliance|riesgo|hechos|documento/.test(normalized)
    },
    {
      label: "Pide formato de salida verificable: informe, matriz, checklist, tabla o cláusula.",
      ok: /formato|informe|matriz|checklist|tabla|resumen|cl[aá]usula|presentaci[oó]n/.test(normalized)
    },
    {
      label: "Establece límites: no inventar fuentes, declarar supuestos o pedir evidencia faltante.",
      ok: /no invent|supuesto|fuente|evidencia|si falta|cita|verific/.test(normalized)
    },
    {
      label: "Incluye una regla de validación o revisión humana antes del uso profesional.",
      ok: /valid|revis|verifica|contrasta|humana|advert/.test(normalized)
    },
    {
      label: "Exige vigencia, jurisdicción y trazabilidad de citas legales.",
      ok: /vigencia|jurisdicci[oó]n|pa[ií]s|fecha|art[ií]culo|expediente|autoridad|trazabilidad/.test(normalized)
    }
  ];
  const score = Math.round((checks.filter((check) => check.ok).length / checks.length) * 100);

  return { score, items: checks };
}

function buildOptimizedPrompt(optimizer: PromptOptimizerState) {
  const original = optimizer.prompt.trim() || "[Describe aquí el encargo legal original]";

  return `# Role
Asistente jurídico especializado en ${optimizer.legalArea}, orientado a apoyar a ${optimizer.audience}.

# Personality
Responde con tono ${optimizer.tone}. Sé preciso, práctico y transparente sobre límites, supuestos e incertidumbre. Evita lenguaje promocional, conclusiones absolutas y explicaciones procesales innecesarias.

# Goal
Entrega una respuesta jurídica útil, verificable y lista para revisión profesional a partir del siguiente encargo:
"""${original}"""

# Success criteria
- La respuesta atiende el objetivo principal sin ampliar innecesariamente el alcance.
- Se distinguen hechos aportados, supuestos, fuentes verificadas, análisis, incertidumbres y recomendación.
- La salida está pensada para ${optimizer.audience}.
- El resultado final se entrega como: ${optimizer.output}.
- Si falta jurisdicción, fecha de vigencia, norma, contrato, sentencia, autoridad, documento base o hecho material, pide el dato mínimo necesario antes de concluir.
- Cada conclusión jurídica se apoya en un hecho identificado, una fuente verificable o un supuesto marcado.

# Evidence and retrieval budget
- ${optimizer.evidence}.
- Usa el mínimo de evidencia suficiente para responder correctamente.
- Prioriza fuentes primarias: norma oficial vigente, expediente, contrato, sentencia, resolución administrativa o documento base proporcionado.
- No uses búsquedas adicionales para mejorar estilo, ampliar ejemplos no esenciales o sostener afirmaciones que deben tratarse como supuestos.
- Si no hay soporte suficiente, marca la respuesta como preliminar, lista la evidencia faltante y evita cerrar una recomendación definitiva.

# Verification
- Antes de cualquier afirmación sobre norma, jurisprudencia, autoridad, plazo, sanción, competencia o procedimiento, verifica que el dato provenga de una fuente disponible o de los hechos aportados; si no, márcalo como pendiente.
- No mezcles jurisdicciones ni importes reglas extranjeras sin advertirlo.
- Antes de cerrar la respuesta, revisa internamente que cada conclusión esté respaldada por un fundamento explícito: fuente, hecho o supuesto.
- Si la respuesta puede ejecutarse o enviarse a un tercero (acto administrativo, comunicación, escrito procesal), exige confirmación humana antes de tratarla como definitiva.

# Citation
- Cita norma, artículo y fecha de verificación entre paréntesis en cada afirmación normativa, ej.: (Ley 29733, art. 5; verificado [FECHA]).
- Para jurisprudencia: tribunal, número de expediente, fecha de la decisión y, si es posible, pinpoint a párrafo o fundamento.
- Para criterios administrativos: autoridad, resolución/directiva, fecha, identificador y enlace o referencia oficial si está disponible.
- Distingue cita literal (entre comillas) de paráfrasis.
- Si la fuente no se puede verificar en el contexto disponible, no la cites: declárala como pendiente de verificación.

# Constraints
- No inventes normas, artículos, precedentes, sanciones, métricas ni capacidades técnicas.
- No sustituyas la revisión de un abogado responsable.
- No incluyas información confidencial en herramientas externas sin autorización y controles adecuados.
- Mantén text.verbosity: ${optimizer.verbosity}.
- Aplica reasoning_effort: ${optimizer.reasoning}.

# Output
Entrega en esta estructura:
1. Conclusión breve
2. Supuestos y datos faltantes
3. Análisis jurídico
4. Riesgos o puntos de atención
5. Recomendación práctica
6. Validación final antes de uso profesional

# Stop rules
Responde cuando puedas atender la solicitud central con evidencia suficiente y límites claros. Si una carencia impide una conclusión responsable, no rellenes el vacío: formula la pregunta mínima o entrega una versión preliminar etiquetada.`;
}

function recommendFrameworks(wizard: WizardState) {
  const scored = frameworks.map((framework) => {
    let score = 0;
    const need = wizard.need.toLowerCase();

    if (framework.legalUses.includes(wizard.area as LegalUse)) score += 4;
    if (framework.outputTypes.includes(wizard.output as OutputType)) score += 3;
    if (wizard.complexity === "básico" && framework.level === "Básico") score += 2;
    if (wizard.complexity === "intermedio" && framework.level === "Intermedio") score += 2;
    if (wizard.complexity === "avanzado" && framework.level === "Avanzado") score += 2;
    if (need.includes("riesgo") && framework.tags.includes("riesgo")) score += 4;
    if (need.includes("cláusula") && framework.outputTypes.includes("Cláusula")) score += 5;
    if (need.includes("norma") && framework.legalUses.includes("Análisis normativo")) score += 3;
    if (need.includes("clase") && framework.legalUses.includes("Docencia")) score += 5;
    if (need.includes("auditar") && framework.tags.includes("auditoría")) score += 5;
    if (wizard.baseDocument === "sí" && framework.contextRequired !== "Bajo") score += 1;

    return { framework, score };
  });

  return scored
    .sort((a, b) => b.score - a.score || a.framework.name.localeCompare(b.framework.name))
    .slice(0, 3)
    .map((item) => item.framework);
}
