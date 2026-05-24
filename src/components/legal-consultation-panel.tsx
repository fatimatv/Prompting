"use client";

import { ArrowRight, ShieldAlert, Sparkles, Wand2 } from "lucide-react";

export function LegalConsultationPanel() {
  return (
    <section id="consulta" className="scroll-mt-24 bg-[#011EF4] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#FBBB02]">
              <Sparkles className="h-4 w-4" />
              Consulta jurídica asistida
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal sm:text-4xl lg:text-5xl">
              Construye tu prompt aquí y úsalo en la IA de tu elección
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/86 sm:text-lg sm:leading-8">
              Esta aplicación <strong className="font-black text-white">no realiza consultas con IA</strong>{" "}
              ni envía datos a servidores externos. Genera prompts jurídicos estructurados que tú copias y
              pegas en ChatGPT, Claude, Gemini, Copilot u otra plataforma de tu confianza —bajo tu control,
              con tus credenciales y tu acuerdo de privacidad.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#products-catalog"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-[#011EF4] shadow-lg shadow-black/10 transition hover:bg-[#F5F7FF]"
              >
                <Wand2 className="h-4 w-4" />
                Ver catálogo de productos
              </a>
              <a
                href="#prompt-builder"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#FBBB02] bg-[#FBBB02] px-5 text-sm font-bold text-[#111827] transition hover:bg-[#ffd046]"
              >
                Ir al constructor
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-[#FBBB02]" />
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#FBBB02]">
                Antes de pegar el prompt
              </p>
            </div>
            <ul className="space-y-3 text-sm leading-6 text-white/90">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBB02]" />
                No subas información confidencial, datos personales sensibles ni documentos
                de clientes a herramientas de IA sin autorización ni contrato.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBB02]" />
                Verifica las normas, jurisprudencia y citas que devuelva la IA contra
                la fuente oficial.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBB02]" />
                El resultado es un borrador asistido: requiere revisión profesional antes
                de cualquier uso real.
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
