import { NextResponse } from "next/server";
import { plannedNormativeSources } from "@/lib/legal";

const sources = plannedNormativeSources.map((title) => ({
  id: title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  title,
  category: "Base normativa de referencia",
  jurisdiction: "Peru",
  status: "PLANNED" as const,
  sourceUrl: null,
  vectorStoreId: null
}));

export async function GET() {
  return NextResponse.json({ sources, persisted: false });
}
