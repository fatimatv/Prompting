"use client";

import { useCallback, useMemo, useState } from "react";
import {
  branchFrameworks,
  frameworks,
  ramasJuridicas,
  type RamaJuridica
} from "@/lib/frameworks";
import { legalProducts, type LegalProduct } from "@/lib/legal-products";
import {
  PROMPT_BUILDER_PRESET_EVENT,
  type PromptBuilderPreset
} from "@/components/prompt-builder";

const NAVY = "#1a2744";
const GOLD = "#c9a84c";

type FrameworkLookup = { id: string; name: string; isBranch: boolean };

const allFrameworksById: Record<string, FrameworkLookup> = (() => {
  const map: Record<string, FrameworkLookup> = {};
  for (const item of branchFrameworks) {
    map[item.id] = { id: item.id, name: item.framework, isBranch: true };
  }
  for (const item of frameworks) {
    if (!map[item.id]) {
      map[item.id] = { id: item.id, name: item.name, isBranch: false };
    }
  }
  return map;
})();

function resolvePreset(product: LegalProduct): PromptBuilderPreset {
  const branchId = product.frameworksRecomendados.find((id) =>
    branchFrameworks.some((bf) => bf.id === id && bf.rama === product.rama)
  );

  if (branchId) {
    const bf = branchFrameworks.find((item) => item.id === branchId);
    if (bf) {
      return { rama: bf.rama, producto: bf.producto, frameworkId: bf.id };
    }
  }

  return { rama: product.rama };
}

function dispatchPreset(preset: PromptBuilderPreset) {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams();
  if (preset.rama) params.set("rama", preset.rama);
  if (preset.producto) params.set("producto", preset.producto);
  if (preset.frameworkId) params.set("framework", preset.frameworkId);
  if (preset.ia) params.set("ia", preset.ia);

  const newUrl = `${window.location.pathname}?${params.toString()}#prompt-builder`;
  window.history.replaceState({}, "", newUrl);

  window.dispatchEvent(
    new CustomEvent<PromptBuilderPreset>(PROMPT_BUILDER_PRESET_EVENT, { detail: preset })
  );

  const target = document.getElementById("prompt-builder");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function ProductsCatalog() {
  const [query, setQuery] = useState("");
  const [selectedRamas, setSelectedRamas] = useState<RamaJuridica[]>([]);
  const [openProduct, setOpenProduct] = useState<LegalProduct | null>(null);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return legalProducts.filter((product) => {
      const matchesRama = selectedRamas.length === 0 || selectedRamas.includes(product.rama);
      if (!matchesRama) return false;
      if (!normalizedQuery) return true;
      const searchable = [
        product.nombre,
        product.descripcion,
        product.rama,
        product.cuandoUsarlo,
        ...product.consejosDePrompting,
        ...product.erroresFrequentes
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [query, selectedRamas]);

  const toggleRama = useCallback((rama: RamaJuridica) => {
    setSelectedRamas((current) =>
      current.includes(rama) ? current.filter((item) => item !== rama) : [...current, rama]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setSelectedRamas([]);
  }, []);

  const onOpen = useCallback((product: LegalProduct) => {
    setOpenProduct(product);
  }, []);

  const onClose = useCallback(() => {
    setOpenProduct(null);
  }, []);

  const onBuild = useCallback(() => {
    if (!openProduct) return;
    const preset = resolvePreset(openProduct);
    dispatchPreset(preset);
    setOpenProduct(null);
  }, [openProduct]);

  return (
    <section id="products-catalog" className="scroll-mt-24 py-14" style={{ backgroundColor: "white" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: GOLD }}>
              Catálogo de productos jurídicos
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal sm:text-4xl" style={{ color: NAVY }}>
              Encuentra qué documento jurídico quieres generar
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
              Cada producto incluye consejos de prompting, errores frecuentes y los frameworks recomendados.
              Selecciona uno y salta al constructor con todo preseleccionado.
            </p>
          </div>
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, rama, consejo…"
              className="h-12 w-full rounded-lg border bg-white pl-4 pr-4 text-sm outline-none transition focus:ring-4"
              style={{ borderColor: "#D4D5D5", color: NAVY }}
            />
          </div>
        </header>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-[0.1em]" style={{ color: NAVY }}>
            Ramas:
          </span>
          {ramasJuridicas.map((rama) => {
            const active = selectedRamas.includes(rama);
            return (
              <button
                key={rama}
                type="button"
                onClick={() => toggleRama(rama)}
                className="rounded-full border px-3 py-1.5 text-xs font-bold transition"
                style={{
                  backgroundColor: active ? NAVY : "white",
                  color: active ? "white" : NAVY,
                  borderColor: active ? NAVY : "#D4D5D5"
                }}
              >
                {rama}
              </button>
            );
          })}
          {(selectedRamas.length > 0 || query) && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-2 text-xs font-bold underline"
              style={{ color: GOLD }}
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <p className="mb-4 text-sm font-semibold text-[#6F7072]">
          {filteredProducts.length} productos encontrados
        </p>

        {filteredProducts.length === 0 ? (
          <div
            className="rounded-xl border border-dashed p-8 text-center text-sm"
            style={{ borderColor: "#D4D5D5", color: "#4B5563" }}
          >
            No hay productos que coincidan con tu búsqueda. Limpia los filtros e intenta de nuevo.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onOpen={() => onOpen(product)} />
            ))}
          </div>
        )}
      </div>

      {openProduct ? <ProductPanel product={openProduct} onClose={onClose} onBuild={onBuild} /> : null}
    </section>
  );
}

function ProductCard({ product, onOpen }: { product: LegalProduct; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full flex-col rounded-xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: "#D4D5D5" }}
    >
      <span
        className="self-start rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-[0.1em]"
        style={{ backgroundColor: GOLD, color: NAVY }}
      >
        {product.rama}
      </span>
      <h3 className="mt-3 text-lg font-black leading-tight" style={{ color: NAVY }}>
        {product.nombre}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#4B5563]">{product.descripcion}</p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-xs font-bold text-[#6F7072]">
          {product.frameworksRecomendados.length} frameworks
        </span>
        <span className="text-sm font-bold" style={{ color: NAVY }}>
          Ver detalles →
        </span>
      </div>
    </button>
  );
}

function ProductPanel({
  product,
  onClose,
  onBuild
}: {
  product: LegalProduct;
  onClose: () => void;
  onBuild: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        aria-label="Cerrar panel"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <aside
        className="relative ml-auto flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl"
        role="dialog"
        aria-labelledby="product-panel-title"
      >
        <header
          className="sticky top-0 z-10 border-b px-6 py-5"
          style={{ backgroundColor: NAVY, color: "white" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em]" style={{ color: GOLD }}>
                {product.rama}
              </p>
              <h2 id="product-panel-title" className="mt-1 text-2xl font-black leading-tight">
                {product.nombre}
              </h2>
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
          </div>
        </header>

        <div className="flex-1 space-y-6 px-6 py-6">
          <PanelBlock title="Descripción">
            <p className="text-sm leading-6 text-[#4B5563]">{product.descripcion}</p>
          </PanelBlock>

          <PanelBlock title="Cuándo usarlo">
            <p className="text-sm leading-6 text-[#4B5563]">{product.cuandoUsarlo}</p>
          </PanelBlock>

          <PanelBlock title="Consejos de prompting">
            <ol className="space-y-2 text-sm leading-6 text-[#4B5563]">
              {product.consejosDePrompting.map((tip, index) => (
                <li key={tip} className="flex gap-3">
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
          </PanelBlock>

          <PanelBlock title="Errores frecuentes">
            <ul className="space-y-2 text-sm leading-6 text-[#4B5563]">
              {product.erroresFrequentes.map((error) => (
                <li key={error} className="flex gap-2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: GOLD }}
                  />
                  {error}
                </li>
              ))}
            </ul>
          </PanelBlock>

          <PanelBlock title="Frameworks recomendados">
            <div className="flex flex-wrap gap-2">
              {product.frameworksRecomendados.map((id) => {
                const lookup = allFrameworksById[id];
                if (!lookup) return null;
                return (
                  <span
                    key={id}
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                    style={{
                      borderColor: lookup.isBranch ? NAVY : "#D4D5D5",
                      color: lookup.isBranch ? NAVY : "#6F7072",
                      backgroundColor: lookup.isBranch ? "#FFFCEC" : "white"
                    }}
                  >
                    {lookup.name}
                  </span>
                );
              })}
            </div>
          </PanelBlock>
        </div>

        <footer
          className="sticky bottom-0 border-t bg-white px-6 py-4"
          style={{ borderColor: "#E5E7EB" }}
        >
          <button
            type="button"
            onClick={onBuild}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg px-6 text-sm font-bold transition hover:opacity-90"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            Construir prompt para este producto →
          </button>
          <p className="mt-2 text-center text-xs text-[#6F7072]">
            Saltarás al wizard con la rama, producto y framework preseleccionados.
          </p>
        </footer>
      </aside>
    </div>
  );
}

function PanelBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-black uppercase tracking-[0.14em]" style={{ color: NAVY }}>
        {title}
      </h3>
      {children}
    </section>
  );
}
