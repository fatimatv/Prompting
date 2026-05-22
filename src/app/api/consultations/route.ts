import { NextRequest, NextResponse } from "next/server";
import { generateLegalAnswer } from "@/lib/openai";
import { consultationRequestSchema } from "@/lib/legal";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, clientIp, getSessionId, jsonError, withSessionCookie } from "@/lib/security";

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(`consult:${clientIp(request)}`, 10, 60_000);
  if (!rateLimit.ok) {
    return jsonError("Demasiadas consultas. Intenta nuevamente en un momento.", 429);
  }

  const sessionId = getSessionId(request);
  const body = await request.json().catch(() => null);
  const parsed = consultationRequestSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Consulta invalida.", 422);
  }

  try {
    const result = await generateLegalAnswer(parsed.data);

    let consultationId: string | null = null;
    try {
      const saved = await prisma.consultation.create({
        data: {
          sessionId,
          type: parsed.data.type,
          question: parsed.data.question,
          answer: result.answer,
          model: result.model,
          vectorStoreId: result.vectorStoreId,
          sourceCount: result.sourceCount
        }
      });
      consultationId = saved.id;
    } catch {
      consultationId = null;
    }

    return withSessionCookie(
      NextResponse.json({
        id: consultationId,
        answer: result.answer,
        persisted: Boolean(consultationId),
        sourceCount: result.sourceCount
      }),
      sessionId
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo procesar la consulta.";
    return jsonError(message, 500);
  }
}
