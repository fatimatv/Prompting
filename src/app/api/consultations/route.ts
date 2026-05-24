import { NextRequest, NextResponse } from "next/server";
import {
  consultationRequestSchema,
  legalWarning,
  plannedNormativeSources,
  type LegalAnswer
} from "@/lib/legal";
import { getSessionId, jsonError, withSessionCookie } from "@/lib/security";

const localMessage =
  "Esta herramienta no realiza consultas con IA. Usa el prompt generado en cualquier IA de tu elección.";

function buildLocalAnswer(question: string): LegalAnswer {
  return {
    briefAnswer: localMessage,
    normativeBasis: [
      "Esta aplicación no consulta normas en línea. Sirve para diseñar prompts que luego ejecutas en la IA de tu preferencia."
    ],
    legalAnalysis:
      "El backend no llama a ningún modelo de lenguaje ni a una base de datos. Copia el prompt optimizado generado en la sección anterior y pégalo en ChatGPT, Claude, Gemini, Copilot u otra IA con acceso a las fuentes adecuadas.",
    practicalApplication: `Consulta recibida: ${question}`,
    risks: [
      "No tomes decisiones legales basándote en una respuesta generada por IA sin verificación profesional."
    ],
    recommendations: [
      "Usa el prompt optimizado en una IA de tu elección.",
      "Contrasta cualquier resultado con un abogado o con las fuentes oficiales."
    ],
    consultedSources: plannedNormativeSources.map((title) => ({
      title,
      reference: "Fuente no consultada por esta aplicación",
      available: false
    })),
    warning: legalWarning
  };
}

export async function POST(request: NextRequest) {
  const sessionId = getSessionId(request);
  const body = await request.json().catch(() => null);
  const parsed = consultationRequestSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Consulta invalida.", 422);
  }

  return withSessionCookie(
    NextResponse.json({
      id: null,
      message: localMessage,
      answer: buildLocalAnswer(parsed.data.question),
      persisted: false,
      sourceCount: 0
    }),
    sessionId
  );
}
