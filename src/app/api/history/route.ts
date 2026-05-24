import { NextRequest, NextResponse } from "next/server";
import { getSessionId, withSessionCookie } from "@/lib/security";

export async function GET(request: NextRequest) {
  const sessionId = getSessionId(request);
  return withSessionCookie(NextResponse.json({ items: [], persisted: false }), sessionId);
}
