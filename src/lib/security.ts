import { NextRequest, NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

export function getSessionId(request: NextRequest): string {
  return request.cookies.get("ialaw_session")?.value || crypto.randomUUID();
}

export function withSessionCookie(response: NextResponse, sessionId: string) {
  response.cookies.set("ialaw_session", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });
  return response;
}

export function checkRateLimit(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0 };
  }

  current.count += 1;
  return { ok: true, remaining: limit - current.count };
}

export function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
