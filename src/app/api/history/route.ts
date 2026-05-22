import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionId, withSessionCookie } from "@/lib/security";

export async function GET(request: NextRequest) {
  const sessionId = getSessionId(request);

  try {
    const items = await prisma.consultation.findMany({
      where: { sessionId },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        type: true,
        question: true,
        answer: true,
        sourceCount: true,
        createdAt: true
      }
    });

    return withSessionCookie(NextResponse.json({ items, persisted: true }), sessionId);
  } catch {
    return withSessionCookie(NextResponse.json({ items: [], persisted: false }), sessionId);
  }
}
