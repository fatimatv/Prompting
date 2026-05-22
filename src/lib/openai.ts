import OpenAI from "openai";
import { env } from "@/lib/env";
import { emptySourceAnswer, legalAnswerSchema, legalWarning, type ConsultationType } from "@/lib/legal";

const responseJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "briefAnswer",
    "normativeBasis",
    "legalAnalysis",
    "practicalApplication",
    "risks",
    "recommendations",
    "consultedSources",
    "warning"
  ],
  properties: {
    briefAnswer: { type: "string" },
    normativeBasis: { type: "array", items: { type: "string" } },
    legalAnalysis: { type: "string" },
    practicalApplication: { type: "string" },
    risks: { type: "array", items: { type: "string" } },
    recommendations: { type: "array", items: { type: "string" } },
    consultedSources: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "reference", "available"],
        properties: {
          title: { type: "string" },
          reference: { type: "string" },
          available: { type: "boolean" }
        }
      }
    },
    warning: { type: "string" }
  }
};

const systemPrompt = `Eres IALAW LPAG, una aplicacion juridica peruana especializada en proteccion de datos personales.
Responde solo con base en fuentes documentales recuperadas por file search/vector store o fuentes disponibles en la aplicacion.
No inventes normas, articulos, sanciones, precedentes ni criterios. Si no hay fuente suficiente, dilo expresamente.
La materia prevista incluye Ley 29733, su reglamento, DS 016-2024-JUS, guias, directivas, resoluciones y criterios de la Autoridad Nacional de Proteccion de Datos Personales.
Incluye siempre advertencia legal: ${legalWarning}`;

export async function generateLegalAnswer(params: {
  question: string;
  type: ConsultationType;
}) {
  if (!env.openAiApiKey || !env.openAiVectorStoreId) {
    return {
      answer: emptySourceAnswer(params.question),
      model: env.openAiModel,
      vectorStoreId: env.openAiVectorStoreId || null,
      sourceCount: 0
    };
  }

  const client = new OpenAI({ apiKey: env.openAiApiKey });
  const response = await client.responses.create({
    model: env.openAiModel,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: systemPrompt }]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Tipo de consulta: ${params.type}\nConsulta juridica: ${params.question}`
          }
        ]
      }
    ],
    tools: [
      {
        type: "file_search",
        vector_store_ids: [env.openAiVectorStoreId]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "ialaw_lpag_answer",
        schema: responseJsonSchema,
        strict: true
      }
    }
  });

  const parsed = legalAnswerSchema.parse(JSON.parse(response.output_text));
  const sourceCount = parsed.consultedSources.filter((source) => source.available).length;

  return {
    answer: parsed,
    model: env.openAiModel,
    vectorStoreId: env.openAiVectorStoreId,
    sourceCount
  };
}
