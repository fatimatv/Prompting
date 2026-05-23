# IALAW Prompt Lab

Herramienta web educativa para aprender a construir mejores prompts de inteligencia artificial aplicada al Derecho. La app usa la identidad visual de IALAW Digital Lawyers y está orientada a abogados, equipos legales, compliance officers, docentes y profesionales legal-tech.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Dataset editable en `src/lib/frameworks.ts`
- Componentes client-side para búsqueda, filtros, detalle, recomendador y comparador

## Funcionalidades

- Landing/app responsive con hero, navegación, guía educativa, FAQ y footer.
- Grid de frameworks legales de prompting con búsqueda por texto.
- Filtros por nivel, uso jurídico y tipo de salida.
- Modal de detalle con descripción, estructura, plantilla editable, ejemplo legal y errores comunes.
- Botón para copiar plantilla.
- Recomendador básico basado en reglas.
- Optimizador de prompts basado en patrones de la GPT-5.5 Prompting Guide: outcome-first, evidencia, formato, validación y stop rules.
- Consulta legal asistida conectada a `/api/consultations`, con fallback seguro si no hay fuentes indexadas.
- Panel de base normativa y estado de fuentes desde `/api/sources`.
- Historial de consultas por sesión desde `/api/history`.
- Comparador de hasta 3 frameworks.
- Textos editables desde componentes y dataset.

## Estructura principal

```txt
src/app/page.tsx          App principal e interacción
src/app/globals.css       Variables visuales y estilos globales
src/app/layout.tsx        Metadata
src/components/legal-consultation-panel.tsx  Consulta legal, fuentes e historial
src/lib/frameworks.ts     Dataset de frameworks legales
src/lib/legal.ts          Esquemas, tipos y fallback de respuesta legal
src/lib/openai.ts         Integración con OpenAI Responses API y file search
src/lib/security.ts       Sesión anónima, cookies y rate limit básico
```

## Ejecución local

```bash
npm install
npm run prisma:generate
npm run dev
```

Abre `http://localhost:3000`.

## Configuración de consultas legales

1. Copia `.env.example` a `.env`.
2. Configura `DATABASE_URL` con una base PostgreSQL disponible.
3. Ejecuta `npm run prisma:migrate` para crear las tablas.
4. Opcionalmente ejecuta `POST /api/sources/seed` para registrar las fuentes normativas planificadas.
5. Configura `OPENAI_API_KEY` y `OPENAI_VECTOR_STORE_ID` para activar respuestas con file search.

Si `OPENAI_API_KEY` u `OPENAI_VECTOR_STORE_ID` están vacíos, la app no inventa fundamentos: devuelve una respuesta de fallback indicando que faltan fuentes documentales.

## Verificación de producción

```bash
npm run typecheck
npm run build
npm run start
```

Si Prisma deja un archivo bloqueado en Windows durante `npm run build`, cierra procesos Node activos y vuelve a ejecutar el comando.

## Edición del contenido

Para agregar o modificar frameworks, edita `src/lib/frameworks.ts`. Cada registro incluye nivel, usos jurídicos, tipos de salida, etiquetas, plantilla, ejemplo legal y datos para el comparador/recomendador.
