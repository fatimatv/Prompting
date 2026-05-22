export const env = {
  databaseUrl: process.env.DATABASE_URL,
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiModel: process.env.OPENAI_MODEL || "gpt-4.1-mini",
  openAiVectorStoreId: process.env.OPENAI_VECTOR_STORE_ID || "",
  maxQueryChars: Number(process.env.MAX_QUERY_CHARS || 4000)
};
