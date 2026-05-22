import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { plannedNormativeSources } from "@/lib/legal";

export async function POST() {
  const created = await Promise.all(
    plannedNormativeSources.map((title) =>
      prisma.sourceDocument.upsert({
        where: { id: title.toLowerCase().replaceAll(" ", "-").replaceAll(",", "") },
        update: {},
        create: {
          id: title.toLowerCase().replaceAll(" ", "-").replaceAll(",", ""),
          title,
          category: "Base normativa planificada",
          issuer: title.includes("Autoridad") || title.includes("ANPD") ? "ANPD" : "Poder Ejecutivo / Congreso",
          notes: "Pendiente de carga, verificacion de fuente oficial e indexacion en vector store."
        }
      })
    )
  );

  return NextResponse.json({ created: created.length });
}
