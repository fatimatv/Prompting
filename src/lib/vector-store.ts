import { prisma } from "@/lib/prisma";

export type RegisterSourceInput = {
  title: string;
  category: string;
  issuer?: string;
  sourceUrl?: string;
  fileId?: string;
  vectorStoreId?: string;
};

export async function registerIndexedSource(input: RegisterSourceInput) {
  return prisma.sourceDocument.create({
    data: {
      title: input.title,
      category: input.category,
      issuer: input.issuer,
      sourceUrl: input.sourceUrl,
      fileId: input.fileId,
      vectorStoreId: input.vectorStoreId,
      status: input.vectorStoreId && input.fileId ? "INDEXED" : "AVAILABLE",
      notes: "Fuente registrada para uso en file search/vector store."
    }
  });
}

export function hasVectorStore(vectorStoreId?: string | null) {
  return Boolean(vectorStoreId && vectorStoreId.trim().length > 0);
}
