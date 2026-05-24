# IALAW Digital Lawyers · Constructor de prompts jurídicos

Aplicación web 100% client-side para construir, evaluar y guardar prompts jurídicos estructurados. **No consume APIs de IA, no usa base de datos, no requiere variables de entorno.** El usuario copia el prompt generado y lo pega en la IA de su elección (ChatGPT, Claude, Gemini, Copilot, otra) bajo su propia cuenta, contrato y controles.

## Filosofía

- **Cero dependencias externas en tiempo de ejecución.** Nada se envía a servidores externos.
- **El abogado conserva el control.** La app diseña la instrucción; la IA elegida por el usuario la ejecuta.
- **No sustituye criterio jurídico.** Todo output requiere revisión profesional antes de uso real.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- `lucide-react` para iconos
- `zod` para validación de inputs en los endpoints stub
- Dataset legal en `src/lib/frameworks.ts` y `src/lib/legal-products.ts`

No hay `@prisma/client`, `openai`, `@anthropic-ai/sdk`, ni ningún SDK que requiera API keys.

## Funcionalidades

| Módulo | Qué hace |
| --- | --- |
| Hero + navegación | Landing con acceso a cada sección. |
| Catálogo de productos jurídicos | 32 productos en 8 ramas, filtrables por rama y búsqueda libre. Click → panel lateral con consejos, errores frecuentes y frameworks recomendados. |
| Constructor de prompts | Wizard de 4 pasos (Contexto → Framework → Variables → Prompt) con preselección desde el catálogo. |
| Analizador de calidad | Evalúa el prompt generado contra 4 criterios (rol, jurisdicción, formato, restricciones). Sin API. |
| Historial local | Hasta 10 prompts en `localStorage` con fecha, rama, producto, framework, IA destino y texto completo. Copiar / descargar / eliminar. |
| Guía rápida por IA | Modal con consejos específicos para ChatGPT, Claude, Gemini, Copilot u "Otro". |
| Frameworks generales | Galería de 19 frameworks (RTF, CTF, RACE, IRAC, CREAC, RISK, CLAUSE, AUDIT, etc.) con búsqueda, filtros y modal de detalle. |
| Recomendador | Sugiere framework según 5 preguntas (regla, no IA). |
| Optimizador GPT-5.5 | Convierte prompt amplio en uno outcome-first; diagnóstico local sobre 5 criterios. |
| Comparador | Hasta 3 frameworks lado a lado. |
| Guía y FAQ | Bloque educativo y preguntas frecuentes. |

## Endpoints API

Aunque la app no necesita backend, mantiene 3 rutas Next.js en `src/app/api/` por compatibilidad:

| Ruta | Comportamiento |
| --- | --- |
| `POST /api/consultations` | Devuelve mensaje fijo: "Esta herramienta no realiza consultas con IA. Usa el prompt generado en cualquier IA de tu elección." |
| `GET /api/sources` | Devuelve catálogo estático de fuentes normativas planificadas. |
| `GET /api/history` | Devuelve `{ items: [] }` (no hay persistencia server-side). |

Ningún endpoint llama a servicios externos.

## Estructura principal

```
src/app/
  layout.tsx                          Metadata
  page.tsx                            App principal (hero, secciones, footer)
  globals.css                         Tailwind + variables visuales
  api/
    consultations/route.ts            Mensaje fijo
    history/route.ts                  Array vacío
    sources/route.ts                  Datos estáticos en memoria
src/components/
  prompt-builder.tsx                  Wizard + analizador + historial + modal de guía
  products-catalog.tsx                Galería + filtros + panel lateral
  legal-consultation-panel.tsx        Banner explicativo (no formulario)
  ui/                                 button, card, badge, textarea, alert
src/lib/
  frameworks.ts                       19 frameworks genéricos + 24 frameworks por rama
  legal-products.ts                   32 productos jurídicos (4 por rama × 8 ramas)
  legal.ts                            Tipos y schemas zod
  security.ts                         Cookie de sesión + rate-limit en memoria (sin DB)
  utils.ts                            cn() helper
src/middleware.ts                     Security headers (CSP, X-Frame-Options, etc.)
```

## Ramas jurídicas cubiertas

- Derecho Civil
- Derecho Penal
- Derecho Laboral
- Derecho Administrativo
- Protección de Datos Personales
- Derecho Digital e IA
- Arbitraje
- Compliance corporativo

Cada rama tiene 3 frameworks especializados y 4 productos jurídicos en el catálogo.

## Ejecución local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. No hace falta configurar `.env`.

## Verificación de producción

```bash
npm run typecheck
npm run build
npm run start
```

Build esperado: 7 rutas (1 página + 1 not-found + 3 endpoints API + 2 estáticos), bundle de página principal ~50 kB.

## Variables de entorno

**Ninguna es requerida.** `.env.example` existe únicamente como referencia para una eventual telemetría opcional futura. La app corre sin `.env`.

## Privacidad y datos

- **Historial de prompts**: se guarda únicamente en `localStorage` del navegador del usuario. Borrable desde la UI ("Borrar historial") o limpiando datos del sitio en el navegador.
- **Cookies**: una cookie de sesión anónima (`ialaw_session`) para mantener consistencia entre llamadas a los endpoints stub. No identifica al usuario.
- **Servicios externos**: ninguno.
- **Datos del usuario hacia la IA**: el usuario controla qué pega, dónde y con qué cuenta. La app advierte explícitamente sobre no subir información confidencial sin autorización.

## Edición del contenido

- **Añadir un framework genérico**: edita `frameworks` en `src/lib/frameworks.ts`.
- **Añadir un framework por rama**: edita `branchFrameworks` en el mismo archivo. Asegúrate de incluir el campo `id` único.
- **Añadir un producto jurídico**: edita `legalProducts` en `src/lib/legal-products.ts`. Referencia frameworks por su `id`.
- **Añadir consejos por IA**: edita `aiGuides` en `src/components/prompt-builder.tsx`.
- **Cambiar criterios del analizador de calidad**: edita la función `analyzeQuality` en `src/components/prompt-builder.tsx`.

## Diseño

Colores principales del wizard y el catálogo:

- `#1a2744` — navy IALAW (texto, botones primarios, fondos profundos)
- `#c9a84c` — dorado IALAW (acentos, badges, énfasis)

El resto de la app conserva la paleta original `#011EF4` y `#FBBB02` heredada del hero y los frameworks generales.

## Advertencia legal

Esta aplicación es educativa. Los prompts generados son borradores asistidos por IA que requieren validación profesional. La herramienta no constituye asesoría legal ni sustituye la opinión de un abogado.
