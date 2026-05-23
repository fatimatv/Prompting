"use client";

import { useEffect, useState } from "react";
import { AlertCircle, BookOpenCheck, CheckCircle2, Clock3, FileText, Loader2, RefreshCw, Send } from "lucide-react";
import { consultationTypes, type ConsultationType, type LegalAnswer } from "@/lib/legal";

type ConsultationResponse = {
  id: string | null;
  answer: LegalAnswer;
  persisted: boolean;
  sourceCount: number;
};

type HistoryItem = {
  id: string;
  type: ConsultationType;
  question: string;
  answer: LegalAnswer;
  sourceCount: number;
  createdAt: string;
};

type SourceItem = {
  id: string;
  title: string;
  category: string;
  jurisdiction: string;
  status: "PLANNED" | "AVAILABLE" | "INDEXED" | "DISABLED";
  sourceUrl: string | null;
  vectorStoreId: string | null;
};

const initialQuestion =
  "Una empresa peruana quiere usar una herramienta de IA para revisar contratos que contienen datos personales de clientes. ¿Qué riesgos y medidas debería considerar?";

const sourceStatusStyles: Record<SourceItem["status"], string> = {
  PLANNED: "bg-[#FFF7DF] text-[#7A4F00] border-[#FBBB02]/40",
  AVAILABLE: "bg-[#EAF0FF] text-[#011EF4] border-[#011EF4]/20",
  INDEXED: "bg-[#EAFBF1] text-[#116B35] border-[#116B35]/20",
  DISABLED: "bg-[#F3F4F6] text-[#4B5563] border-[#D4D5D5]"
};

export function LegalConsultationPanel() {
  const [question, setQuestion] = useState(initialQuestion);
  const [type, setType] = useState<ConsultationType>("DATA_SUBJECT_RIGHTS");
  const [result, setResult] = useState<ConsultationResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [sourcesPersisted, setSourcesPersisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const questionLength = question.trim().length;
  const canSubmit = !loading && questionLength >= 20;

  useEffect(() => {
    void refreshMeta();
  }, []);

  async function refreshMeta() {
    setLoadingMeta(true);
    try {
      const [historyResponse, sourcesResponse] = await Promise.all([fetch("/api/history"), fetch("/api/sources")]);
      const historyData = await historyResponse.json();
      const sourcesData = await sourcesResponse.json();

      setHistory(Array.isArray(historyData.items) ? historyData.items : []);
      setSources(Array.isArray(sourcesData.sources) ? sourcesData.sources : []);
      setSourcesPersisted(Boolean(sourcesData.persisted));
    } catch {
      setHistory([]);
      setSources([]);
      setSourcesPersisted(false);
    } finally {
      setLoadingMeta(false);
    }
  }

  async function submitConsultation() {
    setError(null);

    if (questionLength < 20) {
      setError("Describe la consulta con mas detalle antes de enviarla.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question, type })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo procesar la consulta.");
      }

      setResult(data);
      await refreshMeta();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "No se pudo procesar la consulta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="consulta" className="scroll-mt-24 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#011EF4]">Consulta asistida</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-[#0B1220]">
              Prueba una consulta legal con fuentes controladas
            </h2>
            <p className="mt-3 text-[#4B5563]">
              Envía una consulta al backend. Si no hay vector store configurado, la app devuelve una respuesta segura de
              fallback para evitar citas inventadas.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Fuentes" value={String(sources.length)} />
            <MetricCard label="Historial" value={String(history.length)} />
            <MetricCard label="Persistencia" value={sourcesPersisted ? "Activa" : "Fallback"} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-xl border border-[#D4D5D5] bg-[#F8FAFF] p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Send className="h-5 w-5 text-[#011EF4]" />
              <h3 className="text-xl font-black text-[#0B1220]">Nueva consulta</h3>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-black text-[#0B1220]">Tipo de consulta</span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value as ConsultationType)}
                className="h-12 w-full rounded-lg border border-[#D4D5D5] bg-white px-3 text-sm font-semibold outline-none ring-[#011EF4]/20 transition focus:border-[#011EF4] focus:ring-4"
              >
                {consultationTypes.map((consultationType) => (
                  <option key={consultationType.value} value={consultationType.value}>
                    {consultationType.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-5 block">
              <span className="mb-2 flex items-center justify-between gap-3 text-sm font-black text-[#0B1220]">
                Consulta
                <span className={`text-xs ${questionLength < 20 ? "text-red-600" : "text-[#6F7072]"}`}>
                  {questionLength}/4000
                </span>
              </span>
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                maxLength={4000}
                className="min-h-[220px] w-full resize-y rounded-lg border border-[#D4D5D5] bg-white p-4 text-sm leading-6 outline-none ring-[#011EF4]/20 transition focus:border-[#011EF4] focus:ring-4"
                placeholder="Describe hechos, jurisdiccion, documento base y salida esperada."
              />
            </label>

            {error ? (
              <div className="mt-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            <button
              type="button"
              onClick={submitConsultation}
              disabled={!canSubmit}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#011EF4] px-5 text-sm font-black text-white transition hover:bg-[#0118BF] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Consultando..." : "Consultar"}
            </button>
          </div>

          <div className="rounded-xl border border-[#D4D5D5] bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-[#011EF4]" />
              <h3 className="text-xl font-black text-[#0B1220]">Respuesta</h3>
            </div>
            {result ? <AnswerView result={result} /> : <EmptyResult />}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SourcesPanel sources={sources} loading={loadingMeta} onRefresh={refreshMeta} />
          <HistoryPanel
            history={history}
            loading={loadingMeta}
            onSelect={(item) =>
              setResult({ id: item.id, answer: item.answer, persisted: true, sourceCount: item.sourceCount })
            }
          />
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#D4D5D5] bg-[#F8FAFF] p-4 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6F7072]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#0B1220]">{value}</p>
    </div>
  );
}

function AnswerView({ result }: { result: ConsultationResponse }) {
  const answer = result.answer;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#EAFBF1] px-3 py-1 text-xs font-black text-[#116B35]">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {result.persisted ? "Guardada" : "No guardada"}
        </span>
        <span className="rounded-full bg-[#EAF0FF] px-3 py-1 text-xs font-black text-[#011EF4]">
          {result.sourceCount} fuentes disponibles
        </span>
      </div>

      <AnswerBlock title="Conclusión breve" body={answer.briefAnswer} />
      <AnswerBlock title="Base normativa" items={answer.normativeBasis} />
      <AnswerBlock title="Análisis jurídico" body={answer.legalAnalysis} />
      <AnswerBlock title="Aplicación práctica" body={answer.practicalApplication} />
      <AnswerBlock title="Riesgos" items={answer.risks} />
      <AnswerBlock title="Recomendaciones" items={answer.recommendations} />
      <ConsultedSources sources={answer.consultedSources} />
      <AnswerBlock title="Advertencia" body={answer.warning} />
    </div>
  );
}

function ConsultedSources({ sources }: { sources: LegalAnswer["consultedSources"] }) {
  return (
    <section className="rounded-lg border border-[#D4D5D5] bg-[#F8FAFF] p-4">
      <h4 className="text-sm font-black text-[#0B1220]">Fuentes consultadas</h4>
      <div className="mt-3 space-y-2">
        {sources.map((source) => (
          <div key={`${source.title}-${source.reference}`} className="rounded-lg border border-[#D4D5D5] bg-white p-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#0B1220]">{source.title}</p>
                <p className="mt-1 text-xs font-semibold text-[#6F7072]">{source.reference}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-black ${
                  source.available ? "bg-[#EAFBF1] text-[#116B35]" : "bg-[#FFF7DF] text-[#7A4F00]"
                }`}
              >
                {source.available ? "Disponible" : "Pendiente"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnswerBlock({ title, body, items }: { title: string; body?: string; items?: string[] }) {
  return (
    <section className="rounded-lg border border-[#D4D5D5] bg-[#F8FAFF] p-4">
      <h4 className="text-sm font-black text-[#0B1220]">{title}</h4>
      {body ? <p className="mt-2 text-sm leading-6 text-[#4B5563]">{body}</p> : null}
      {items ? (
        <ul className="mt-2 space-y-2 text-sm leading-6 text-[#4B5563]">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBB02]" />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function EmptyResult() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-[#D4D5D5] bg-[#F8FAFF] p-6 text-center">
      <FileText className="h-10 w-10 text-[#011EF4]" />
      <p className="mt-4 max-w-md text-sm leading-6 text-[#4B5563]">
        Todavía no hay respuesta en esta sesión. Ejecuta una consulta para ver el resultado estructurado.
      </p>
    </div>
  );
}

function SourcesPanel({
  sources,
  loading,
  onRefresh
}: {
  sources: SourceItem[];
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <section className="rounded-xl border border-[#D4D5D5] bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#011EF4]" />
          <h3 className="text-xl font-black text-[#0B1220]">Base normativa</h3>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#D4D5D5] bg-white px-3 text-sm font-black text-[#0B1220] transition hover:border-[#011EF4] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </button>
      </div>
      {loading ? <LoadingLine /> : null}
      {sources.length === 0 && !loading ? (
        <p className="rounded-lg border border-dashed border-[#D4D5D5] bg-[#F8FAFF] p-4 text-sm text-[#4B5563]">
          No hay fuentes registradas todavía.
        </p>
      ) : null}
      <div className="space-y-3">
        {sources.map((source) => (
          <article key={source.id} className="rounded-lg border border-[#D4D5D5] bg-[#F8FAFF] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-[#0B1220]">{source.title}</h4>
                <p className="mt-1 text-xs font-semibold text-[#6F7072]">
                  {source.category} · {source.jurisdiction}
                </p>
              </div>
              <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${sourceStatusStyles[source.status]}`}>
                {source.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HistoryPanel({
  history,
  loading,
  onSelect
}: {
  history: HistoryItem[];
  loading: boolean;
  onSelect: (item: HistoryItem) => void;
}) {
  return (
    <section className="rounded-xl border border-[#D4D5D5] bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Clock3 className="h-5 w-5 text-[#011EF4]" />
        <h3 className="text-xl font-black text-[#0B1220]">Historial de sesión</h3>
      </div>
      {loading ? <LoadingLine /> : null}
      {history.length === 0 && !loading ? (
        <p className="rounded-lg border border-dashed border-[#D4D5D5] bg-[#F8FAFF] p-4 text-sm text-[#4B5563]">
          Aún no hay consultas guardadas para esta sesión.
        </p>
      ) : null}
      <div className="space-y-3">
        {history.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            className="w-full rounded-lg border border-[#D4D5D5] bg-[#F8FAFF] p-4 text-left transition hover:border-[#011EF4]"
          >
            <p className="line-clamp-2 text-sm font-bold text-[#0B1220]">{item.question}</p>
            <p className="mt-2 text-xs font-semibold text-[#6F7072]">
              {consultationTypes.find((consultationType) => consultationType.value === item.type)?.label || item.type} ·{" "}
              {new Date(item.createdAt).toLocaleString("es-PE")}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

function LoadingLine() {
  return (
    <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#6F7072]">
      <Loader2 className="h-4 w-4 animate-spin" />
      Cargando...
    </div>
  );
}
