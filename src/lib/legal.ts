import { z } from "zod";

export const consultationTypeValues = [
  "GENERAL",
  "COMPLIANCE",
  "DATA_SUBJECT_RIGHTS",
  "SANCTION_RISK",
  "CONTRACTS",
  "INTERNATIONAL_TRANSFER",
  "INCIDENT_RESPONSE",
  "AUTHORITY_CRITERIA"
] as const;

export const consultationTypes = [
  { value: "GENERAL", label: "Consulta general" },
  { value: "COMPLIANCE", label: "Cumplimiento" },
  { value: "DATA_SUBJECT_RIGHTS", label: "Derechos ARCO" },
  { value: "SANCTION_RISK", label: "Riesgo sancionador" },
  { value: "CONTRACTS", label: "Contratos y encargos" },
  { value: "INTERNATIONAL_TRANSFER", label: "Flujo transfronterizo" },
  { value: "INCIDENT_RESPONSE", label: "Incidentes de seguridad" },
  { value: "AUTHORITY_CRITERIA", label: "Criterios de la ANPD" }
] as const;

export const consultationRequestSchema = z.object({
  question: z.string().trim().min(20, "Describe la consulta con mas detalle.").max(4000),
  type: z.enum(consultationTypeValues)
});

export const legalAnswerSchema = z.object({
  briefAnswer: z.string(),
  normativeBasis: z.array(z.string()),
  legalAnalysis: z.string(),
  practicalApplication: z.string(),
  risks: z.array(z.string()),
  recommendations: z.array(z.string()),
  consultedSources: z.array(
    z.object({
      title: z.string(),
      reference: z.string(),
      available: z.boolean()
    })
  ),
  warning: z.string()
});

export type LegalAnswer = z.infer<typeof legalAnswerSchema>;
export type ConsultationType = (typeof consultationTypes)[number]["value"];

export const plannedNormativeSources = [
  "Ley 29733, Ley de Proteccion de Datos Personales",
  "Reglamento de la Ley 29733",
  "Decreto Supremo 016-2024-JUS",
  "Guias, directivas y lineamientos de la Autoridad Nacional de Proteccion de Datos Personales",
  "Resoluciones y criterios administrativos de la ANPD"
];

export const legalWarning =
  "IALAW LPAG entrega informacion juridica general basada en las fuentes disponibles. No sustituye la asesoria de un abogado ni una opinion legal formal para un caso concreto.";

export function emptySourceAnswer(question: string): LegalAnswer {
  return {
    briefAnswer:
      "No puedo emitir una respuesta normativa concluyente porque aun no hay una fuente documental cargada o indexada en la base normativa.",
    normativeBasis: [
      "Sin fuente documental disponible en el vector store o repositorio normativo de la aplicacion."
    ],
    legalAnalysis:
      "La consulta requiere contrastar el supuesto con la Ley 29733, su reglamento, el DS 016-2024-JUS y criterios de la Autoridad Nacional de Proteccion de Datos Personales. Como no hay documentos cargados, la aplicacion evita citar articulos o reglas especificas para no inventar fundamentos.",
    practicalApplication: `Consulta recibida: ${question}`,
    risks: [
      "Riesgo de adoptar una decision sin verificar el texto oficial vigente.",
      "Riesgo de omitir criterios administrativos relevantes de la ANPD."
    ],
    recommendations: [
      "Cargar e indexar las normas y criterios oficiales antes de solicitar una opinion juridica detallada.",
      "Verificar cualquier decision sensible con asesoria legal especializada."
    ],
    consultedSources: plannedNormativeSources.map((title) => ({
      title,
      reference: "Pendiente de carga documental",
      available: false
    })),
    warning: legalWarning
  };
}
