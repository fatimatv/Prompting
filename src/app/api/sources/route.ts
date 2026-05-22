import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { plannedNormativeSources } from "@/lib/legal";

export async function GET() {
  try {
    const sources = await prisma.sourceDocument.findMany({
      orderBy: [{ status: "asc" }, { title: "asc" }]
    });

    if (sources.length > 0) {
      return NextResponse.json({ sources, persisted: true });
    }
  } catch {
    return NextResponse.json({
      sources: plannedNormativeSources.map((title) => ({
        id: title,
        title,
        category: "Base normativa planificada",
        jurisdiction: "Peru",
        status: "PLANNED",
        sourceUrl: null,
        vectorStoreId: null
      })),
      persisted: false
    });
  }

  return NextResponse.json({
    sources: plannedNormativeSources.map((title) => ({
      id: title,
      title,
      category: "Base normativa planificada",
      jurisdiction: "Peru",
      status: "PLANNED",
      sourceUrl: null,
      vectorStoreId: null
    })),
    persisted: true
  });
}
