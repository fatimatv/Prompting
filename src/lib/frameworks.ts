export type FrameworkLevel = "Básico" | "Intermedio" | "Avanzado";

export type LegalUse =
  | "Análisis normativo"
  | "Redacción contractual"
  | "Evaluación de riesgos"
  | "Investigación"
  | "Docencia"
  | "Compliance"
  | "Protección de datos"
  | "Ciberseguridad"
  | "Litigios";

export type OutputType =
  | "Informe"
  | "Matriz"
  | "Checklist"
  | "Resumen"
  | "Estrategia"
  | "Cláusula"
  | "Presentación";

export type Framework = {
  id: string;
  name: string;
  acronym: string;
  level: FrameworkLevel;
  description: string;
  components: string[];
  legalUses: LegalUse[];
  outputTypes: OutputType[];
  tags: string[];
  bestUse: string;
  contextRequired: "Bajo" | "Medio" | "Alto";
  genericRisk: "Bajo" | "Medio" | "Alto";
  idealFor: string[];
  whatIs: string;
  whenToUse: string;
  editableTemplate: string;
  legalExample: string;
  commonMistakes: string[];
};

const template = (title: string, components: string[]) =>
  `${title}\n\n${components.map((item) => `- ${item}: [completa este campo]`).join("\n")}\n\nRestricciones: no inventes fuentes, identifica supuestos y separa hechos, normas y recomendación.`;

export const levels: FrameworkLevel[] = ["Básico", "Intermedio", "Avanzado"];

export const legalUses: LegalUse[] = [
  "Análisis normativo",
  "Redacción contractual",
  "Evaluación de riesgos",
  "Investigación",
  "Docencia",
  "Compliance",
  "Protección de datos",
  "Ciberseguridad",
  "Litigios"
];

export const outputTypes: OutputType[] = [
  "Informe",
  "Matriz",
  "Checklist",
  "Resumen",
  "Estrategia",
  "Cláusula",
  "Presentación"
];

export const frameworks: Framework[] = [
  {
    id: "rtf-legal",
    name: "RTF Legal",
    acronym: "RTF",
    level: "Básico",
    description: "Define rol, tarea y formato para obtener una primera respuesta jurídica ordenada.",
    components: ["Rol", "Tarea", "Formato"],
    legalUses: ["Análisis normativo", "Investigación", "Docencia"],
    outputTypes: ["Resumen", "Informe", "Checklist"],
    tags: ["inicio rápido", "estructura mínima", "formato claro"],
    bestUse: "Consultas preliminares y borradores de baja complejidad.",
    contextRequired: "Bajo",
    genericRisk: "Medio",
    idealFor: ["abogados", "docencia"],
    whatIs: "Un marco simple para indicar quién debe responder, qué debe hacer y cómo debe presentar la salida.",
    whenToUse: "Úsalo cuando necesitas velocidad, orden básico y una respuesta fácil de revisar.",
    editableTemplate: template("RTF Legal", ["Rol", "Tarea", "Formato"]),
    legalExample:
      "Rol: abogado de protección de datos. Tarea: resume obligaciones para informar una transferencia internacional. Formato: checklist con fundamento y advertencias.",
    commonMistakes: ["Usar un rol genérico", "No definir jurisdicción", "Pedir análisis profundo con poco contexto"]
  },
  {
    id: "ctf-legal",
    name: "CTF Legal",
    acronym: "CTF",
    level: "Básico",
    description: "Añade contexto antes de pedir la tarea y el formato de salida.",
    components: ["Contexto", "Tarea", "Formato"],
    legalUses: ["Análisis normativo", "Investigación", "Compliance"],
    outputTypes: ["Informe", "Resumen", "Checklist"],
    tags: ["contexto", "primer análisis", "orden"],
    bestUse: "Análisis breve cuando los hechos importan más que el rol.",
    contextRequired: "Medio",
    genericRisk: "Medio",
    idealFor: ["abogados", "equipos"],
    whatIs: "Un patrón que prioriza hechos y alcance antes de solicitar una respuesta jurídica concreta.",
    whenToUse: "Úsalo cuando el supuesto tiene matices fácticos y necesitas una salida concreta.",
    editableTemplate: template("CTF Legal", ["Contexto", "Tarea", "Formato"]),
    legalExample:
      "Contexto: proveedor SaaS tratará datos de clientes peruanos. Tarea: identificar obligaciones contractuales. Formato: tabla por obligación, evidencia y riesgo.",
    commonMistakes: ["Mezclar hechos confirmados con supuestos", "No señalar el país aplicable", "No exigir límites de la respuesta"]
  },
  {
    id: "race-juridico",
    name: "RACE Jurídico",
    acronym: "RACE",
    level: "Intermedio",
    description: "Ordena rol, acción, contexto y expectativa para respuestas accionables.",
    components: ["Rol", "Acción", "Contexto", "Expectativa"],
    legalUses: ["Compliance", "Evaluación de riesgos", "Redacción contractual"],
    outputTypes: ["Estrategia", "Checklist", "Informe"],
    tags: ["acción", "expectativas", "gestión legal"],
    bestUse: "Encargos legales con un criterio de calidad definido.",
    contextRequired: "Medio",
    genericRisk: "Bajo",
    idealFor: ["abogados", "equipos", "compliance"],
    whatIs: "Un framework para convertir una necesidad legal en una instrucción con estándar de resultado.",
    whenToUse: "Úsalo cuando importa precisar el nivel de profundidad, tono y alcance esperado.",
    editableTemplate: template("RACE Jurídico", ["Rol", "Acción", "Contexto", "Expectativa"]),
    legalExample:
      "Rol: counsel de compliance. Acción: diseña controles mínimos. Contexto: onboarding de proveedores tecnológicos. Expectativa: prioriza controles verificables.",
    commonMistakes: ["Describir expectativas vagas", "No indicar audiencia", "Pedir recomendaciones sin criterios de decisión"]
  },
  {
    id: "pecra-legal",
    name: "PECRA Legal",
    acronym: "PECRA",
    level: "Intermedio",
    description: "Conecta propósito, expectativa, contexto, tarea y acción para trabajos de mayor precisión.",
    components: ["Propósito", "Expectativa", "Contexto", "Tarea", "Acción"],
    legalUses: ["Análisis normativo", "Evaluación de riesgos", "Compliance"],
    outputTypes: ["Informe", "Estrategia", "Presentación"],
    tags: ["propósito", "decisión", "criterio"],
    bestUse: "Informes o recomendaciones que alimentan una decisión legal.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["abogados", "equipos"],
    whatIs: "Un marco orientado a decisiones, útil cuando el resultado debe servir a un objetivo institucional.",
    whenToUse: "Úsalo para reportes, notas ejecutivas y análisis con consecuencias prácticas.",
    editableTemplate: template("PECRA Legal", ["Propósito", "Expectativa", "Contexto", "Tarea", "Acción"]),
    legalExample:
      "Propósito: decidir si iniciar un DPIA. Expectativa: matriz ejecutiva. Contexto: nuevo sistema biométrico. Tarea: evaluar activadores. Acción: proponer próximos pasos.",
    commonMistakes: ["No separar propósito de tarea", "No definir destinatario", "Omitir restricciones legales"]
  },
  {
    id: "irac-prompting",
    name: "IRAC Prompting",
    acronym: "IRAC",
    level: "Intermedio",
    description: "Adapta la estructura clásica Issue, Rule, Application, Conclusion al prompting jurídico.",
    components: ["Issue", "Rule", "Application", "Conclusion"],
    legalUses: ["Análisis normativo", "Litigios", "Investigación"],
    outputTypes: ["Informe", "Resumen", "Estrategia"],
    tags: ["razonamiento jurídico", "casos", "norma"],
    bestUse: "Problemas jurídicos con hechos, regla aplicable y conclusión razonada.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["abogados", "docencia", "litigios"],
    whatIs: "Una estructura de razonamiento legal que guía a la IA para no saltar directamente a conclusiones.",
    whenToUse: "Úsalo para analizar un caso, preparar argumentos o enseñar método jurídico.",
    editableTemplate: template("IRAC Prompting", ["Issue", "Rule", "Application", "Conclusion"]),
    legalExample:
      "Issue: si una cláusula de tratamiento es suficiente. Rule: bases de consentimiento e información. Application: contrasta la cláusula. Conclusion: riesgos y ajuste sugerido.",
    commonMistakes: ["Pedir conclusión sin regla", "No aportar hechos", "Aceptar una regla no verificada"]
  },
  {
    id: "creac-prompting",
    name: "CREAC Prompting",
    acronym: "CREAC",
    level: "Avanzado",
    description: "Parte con conclusión provisional y exige explicación, aplicación y cierre refinado.",
    components: ["Conclusion", "Rule", "Explanation", "Application", "Conclusion"],
    legalUses: ["Litigios", "Análisis normativo", "Investigación"],
    outputTypes: ["Informe", "Estrategia", "Presentación"],
    tags: ["argumentación", "litigios", "memo"],
    bestUse: "Memorandos, estrategias y argumentos donde importa la tesis.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["abogados", "litigios"],
    whatIs: "Un patrón argumentativo que obliga a sostener una conclusión con reglas, explicación y aplicación al caso.",
    whenToUse: "Úsalo para borradores de memo, estrategia procesal o docencia avanzada.",
    editableTemplate: template("CREAC Prompting", ["Conclusion", "Rule", "Explanation", "Application", "Conclusion refinada"]),
    legalExample:
      "Conclusión: la medida requiere base legal reforzada. Regla: principios aplicables. Explicación: alcance. Aplicación: hechos del caso. Cierre: recomendación.",
    commonMistakes: ["Confundir conclusión inicial con resultado definitivo", "No pedir contraargumentos", "Omitir incertidumbres"]
  },
  {
    id: "risk",
    name: "RISK",
    acronym: "RISK",
    level: "Intermedio",
    description: "Evalúa riesgo, impacto, supuestos y know-how para priorizar decisiones.",
    components: ["Riesgo", "Impacto", "Supuesto", "Know-how"],
    legalUses: ["Evaluación de riesgos", "Compliance", "Protección de datos", "Ciberseguridad"],
    outputTypes: ["Matriz", "Checklist", "Estrategia"],
    tags: ["riesgo", "priorización", "controles"],
    bestUse: "Matrices de riesgo y planes de mitigación.",
    contextRequired: "Medio",
    genericRisk: "Bajo",
    idealFor: ["equipos", "compliance"],
    whatIs: "Un marco para ordenar escenarios de riesgo legal y convertirlos en acciones revisables.",
    whenToUse: "Úsalo cuando el objetivo es priorizar exposición, impacto y controles.",
    editableTemplate: template("RISK", ["Riesgo", "Impacto", "Supuesto", "Know-how"]),
    legalExample:
      "Riesgo: uso de datos sin base clara. Impacto: sanción y reclamo. Supuesto: datos sensibles. Know-how: requerir DPIA y controles de acceso.",
    commonMistakes: ["No declarar supuestos", "Confundir impacto legal con impacto reputacional", "No asignar medidas"]
  },
  {
    id: "dpo-prompt",
    name: "DPO Prompt",
    acronym: "DPO",
    level: "Intermedio",
    description: "Estructura consultas de privacidad desde dato, propósito, obligación y riesgo.",
    components: ["Dato", "Propósito", "Obligación", "Riesgo"],
    legalUses: ["Protección de datos", "Compliance", "Evaluación de riesgos"],
    outputTypes: ["Checklist", "Informe", "Matriz"],
    tags: ["privacidad", "DPO", "obligaciones"],
    bestUse: "Revisión de tratamientos y obligaciones de privacidad.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["compliance", "equipos"],
    whatIs: "Un marco especializado para consultas de protección de datos centradas en la finalidad del tratamiento.",
    whenToUse: "Úsalo para consultas de privacidad, transferencias, encargados o derechos ARCO.",
    editableTemplate: template("DPO Prompt", ["Dato", "Propósito", "Obligación", "Riesgo"]),
    legalExample:
      "Dato: ubicación y correo. Propósito: antifraude. Obligación: informar y limitar acceso. Riesgo: proporcionalidad insuficiente.",
    commonMistakes: ["No identificar categoría de datos", "Omitir base legal", "No pedir medidas documentables"]
  },
  {
    id: "dpia-prompt",
    name: "DPIA Prompt",
    acronym: "DPIA",
    level: "Avanzado",
    description: "Guía evaluaciones de impacto con tratamiento, riesgo, mitigación y evidencia.",
    components: ["Tratamiento", "Riesgo", "Mitigación", "Evidencia"],
    legalUses: ["Protección de datos", "Evaluación de riesgos", "Compliance"],
    outputTypes: ["Matriz", "Informe", "Checklist"],
    tags: ["DPIA", "privacidad", "evidencia"],
    bestUse: "Evaluaciones de impacto y documentación de accountability.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["compliance", "equipos"],
    whatIs: "Un patrón para construir o revisar evaluaciones de impacto en privacidad con foco probatorio.",
    whenToUse: "Úsalo ante tratamientos de alto riesgo, nuevas tecnologías o datos sensibles.",
    editableTemplate: template("DPIA Prompt", ["Tratamiento", "Riesgo", "Mitigación", "Evidencia"]),
    legalExample:
      "Tratamiento: reconocimiento facial para ingreso. Riesgo: vigilancia excesiva. Mitigación: alternativa no biométrica. Evidencia: registro de decisión.",
    commonMistakes: ["Convertir la DPIA en checklist formal", "No exigir evidencia", "No considerar riesgos residuales"]
  },
  {
    id: "clause",
    name: "CLAUSE",
    acronym: "CLAUSE",
    level: "Intermedio",
    description: "Ayuda a redactar cláusulas con contexto, ley, alcance, usuario, supuestos y estilo.",
    components: ["Contexto", "Ley aplicable", "Alcance", "Usuario", "Supuestos", "Estilo"],
    legalUses: ["Redacción contractual", "Compliance", "Protección de datos"],
    outputTypes: ["Cláusula", "Checklist", "Informe"],
    tags: ["contratos", "cláusulas", "estilo"],
    bestUse: "Borradores contractuales con alcance y tono controlado.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["abogados", "equipos"],
    whatIs: "Un marco de redacción contractual que evita cláusulas genéricas y fuerza condiciones de uso.",
    whenToUse: "Úsalo para cláusulas de confidencialidad, datos, responsabilidad, SLA o compliance.",
    editableTemplate: template("CLAUSE", ["Contexto", "Ley aplicable", "Alcance", "Usuario", "Supuestos", "Estilo"]),
    legalExample:
      "Contexto: contrato SaaS B2B. Ley: Perú. Alcance: tratamiento por encargo. Usuario: proveedor. Supuestos: subencargados. Estilo: claro y negociable.",
    commonMistakes: ["No indicar parte protegida", "Omitir ley aplicable", "Copiar cláusulas sin coherencia contractual"]
  },
  {
    id: "comply",
    name: "COMPLY",
    acronym: "COMPLY",
    level: "Intermedio",
    description: "Convierte obligaciones en medidas, pruebas, límites y resultados esperados.",
    components: ["Contexto", "Obligación", "Medida", "Prueba", "Límite", "Yield/resultado"],
    legalUses: ["Compliance", "Evaluación de riesgos", "Protección de datos"],
    outputTypes: ["Checklist", "Matriz", "Informe"],
    tags: ["cumplimiento", "controles", "evidencia"],
    bestUse: "Programas de cumplimiento y controles verificables.",
    contextRequired: "Medio",
    genericRisk: "Bajo",
    idealFor: ["compliance", "equipos"],
    whatIs: "Un marco para pasar de una obligación legal a un control medible.",
    whenToUse: "Úsalo cuando necesitas checklist, plan de cumplimiento o evidencia de control.",
    editableTemplate: template("COMPLY", ["Contexto", "Obligación", "Medida", "Prueba", "Límite", "Yield/resultado"]),
    legalExample:
      "Obligación: informar finalidades. Medida: aviso por capas. Prueba: capturas y logs. Límite: no evaluar marketing. Resultado: checklist auditado.",
    commonMistakes: ["No definir prueba", "Confundir política con control", "No limitar el alcance"]
  },
  {
    id: "policy",
    name: "POLICY",
    acronym: "POLICY",
    level: "Intermedio",
    description: "Diseña políticas internas desde problema, obligación, límite, implementación y control.",
    components: ["Problema", "Obligación", "Límite", "Implementación", "Control", "Yield"],
    legalUses: ["Compliance", "Docencia", "Protección de datos"],
    outputTypes: ["Checklist", "Presentación", "Informe"],
    tags: ["políticas", "gobernanza", "implementación"],
    bestUse: "Políticas internas y guías operativas.",
    contextRequired: "Medio",
    genericRisk: "Medio",
    idealFor: ["equipos", "compliance", "docencia"],
    whatIs: "Un patrón para aterrizar normas internas en reglas aplicables y controlables.",
    whenToUse: "Úsalo para políticas de IA, privacidad, uso aceptable o gestión documental.",
    editableTemplate: template("POLICY", ["Problema", "Obligación", "Límite", "Implementación", "Control", "Yield"]),
    legalExample:
      "Problema: uso de IA con datos de clientes. Obligación: confidencialidad. Límite: no subir datos sensibles. Control: revisión trimestral.",
    commonMistakes: ["Redactar principios no aplicables", "Omitir responsables", "No incluir controles"]
  },
  {
    id: "case",
    name: "CASE",
    acronym: "CASE",
    level: "Básico",
    description: "Ordena caso, antecedentes, sustento y evaluación para estudiar expedientes o precedentes.",
    components: ["Caso", "Antecedentes", "Sustento", "Evaluación"],
    legalUses: ["Litigios", "Investigación", "Docencia"],
    outputTypes: ["Resumen", "Informe", "Estrategia"],
    tags: ["casos", "precedentes", "síntesis"],
    bestUse: "Resúmenes de caso y preparación académica o procesal.",
    contextRequired: "Medio",
    genericRisk: "Medio",
    idealFor: ["abogados", "docencia", "litigios"],
    whatIs: "Un marco breve para resumir y evaluar casos con soporte jurídico.",
    whenToUse: "Úsalo para sentencias, resoluciones, expedientes o casos prácticos.",
    editableTemplate: template("CASE", ["Caso", "Antecedentes", "Sustento", "Evaluación"]),
    legalExample:
      "Caso: sanción por falta de consentimiento. Antecedentes: campaña digital. Sustento: norma aplicable. Evaluación: defensa y riesgo.",
    commonMistakes: ["No separar antecedentes de opinión", "No pedir citas verificables", "Reducir el caso a un resumen narrativo"]
  },
  {
    id: "matrix",
    name: "MATRIX",
    acronym: "MATRIX",
    level: "Avanzado",
    description: "Crea matrices con materia, actores, triggers, riesgos, indicadores y control.",
    components: ["Materia", "Actores", "Triggers", "Riesgos", "Indicadores", "Control"],
    legalUses: ["Evaluación de riesgos", "Compliance", "Protección de datos"],
    outputTypes: ["Matriz", "Checklist", "Presentación"],
    tags: ["matriz", "indicadores", "control"],
    bestUse: "Mapas de riesgo, matrices regulatorias y tableros de control.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["equipos", "compliance"],
    whatIs: "Un framework para convertir materias legales en una tabla de seguimiento y control.",
    whenToUse: "Úsalo para reportes de compliance, auditorías y seguimiento de obligaciones.",
    editableTemplate: template("MATRIX", ["Materia", "Actores", "Triggers", "Riesgos", "Indicadores", "Control"]),
    legalExample:
      "Materia: proveedores cloud. Actores: legal, TI, compras. Trigger: nuevo subencargado. Riesgo: transferencia no documentada. Control: revisión contractual.",
    commonMistakes: ["Crear demasiados indicadores", "No definir triggers", "No conectar control con riesgo"]
  },
  {
    id: "teach",
    name: "TEACH",
    acronym: "TEACH",
    level: "Básico",
    description: "Estructura contenidos docentes con tema, ejemplo, actividad, criterio y herramienta.",
    components: ["Tema", "Ejemplo", "Actividad", "Criterio", "Herramienta"],
    legalUses: ["Docencia", "Investigación", "Análisis normativo"],
    outputTypes: ["Presentación", "Checklist", "Resumen"],
    tags: ["docencia", "clase", "actividad"],
    bestUse: "Diseño de clases, talleres y ejercicios de IA aplicada al Derecho.",
    contextRequired: "Bajo",
    genericRisk: "Medio",
    idealFor: ["docencia", "equipos"],
    whatIs: "Un marco didáctico para pedir materiales jurídicos claros y evaluables.",
    whenToUse: "Úsalo para preparar clases, casos prácticos, rúbricas o talleres.",
    editableTemplate: template("TEACH", ["Tema", "Ejemplo", "Actividad", "Criterio", "Herramienta"]),
    legalExample:
      "Tema: minimización de datos. Ejemplo: app de delivery. Actividad: detectar excesos. Criterio: precisión y fundamento. Herramienta: matriz.",
    commonMistakes: ["No definir nivel del estudiante", "Pedir teoría sin actividad", "No incluir criterio de evaluación"]
  },
  {
    id: "spark-legal",
    name: "SPARK Legal",
    acronym: "SPARK",
    level: "Básico",
    description: "Ordena comunicaciones legales desde situación, problema, aspiración, resultado y mensaje clave.",
    components: ["Situación", "Problema", "Aspiración", "Resultado", "Key message"],
    legalUses: ["Docencia", "Compliance", "Investigación"],
    outputTypes: ["Presentación", "Estrategia", "Resumen"],
    tags: ["comunicación", "mensaje", "síntesis"],
    bestUse: "Explicar temas legales complejos a audiencias no jurídicas.",
    contextRequired: "Medio",
    genericRisk: "Medio",
    idealFor: ["equipos", "docencia"],
    whatIs: "Un marco para transformar análisis legal en comunicación clara y orientada a acción.",
    whenToUse: "Úsalo para presentaciones, briefings ejecutivos y sensibilización interna.",
    editableTemplate: template("SPARK Legal", ["Situación", "Problema", "Aspiración", "Resultado", "Key message"]),
    legalExample:
      "Situación: nuevas reglas de IA interna. Problema: uso sin control. Aspiración: uso seguro. Resultado: tres reglas. Mensaje: contexto antes que automatización.",
    commonMistakes: ["Hacer marketing vacío", "No definir audiencia", "No conectar mensaje con acción"]
  },
  {
    id: "audit",
    name: "AUDIT",
    acronym: "AUDIT",
    level: "Avanzado",
    description: "Evalúa alcance, unidad, documento, indicador y trazabilidad para auditorías legales.",
    components: ["Alcance", "Unidad", "Documento", "Indicador", "Trazabilidad"],
    legalUses: ["Compliance", "Protección de datos", "Evaluación de riesgos"],
    outputTypes: ["Checklist", "Matriz", "Informe"],
    tags: ["auditoría", "trazabilidad", "evidencia"],
    bestUse: "Auditorías de cumplimiento y revisiones documentales.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["compliance", "equipos"],
    whatIs: "Un marco para pedir revisiones con evidencia y trazabilidad suficiente.",
    whenToUse: "Úsalo cuando necesitas comprobar cumplimiento, no solo describirlo.",
    editableTemplate: template("AUDIT", ["Alcance", "Unidad", "Documento", "Indicador", "Trazabilidad"]),
    legalExample:
      "Alcance: proveedores críticos. Unidad: compras. Documento: contratos 2025. Indicador: cláusula de datos. Trazabilidad: fuente y hallazgo.",
    commonMistakes: ["No definir muestra", "No pedir trazabilidad", "No distinguir hallazgo de recomendación"]
  },
  {
    id: "redteam-legal-ia",
    name: "REDTEAM Legal IA",
    acronym: "REDTEAM",
    level: "Avanzado",
    description: "Prueba debilidades de uso de IA con riesgo, escenario, test, evidencia y acción.",
    components: ["Riesgo", "Escenario", "Debilidad", "Test", "Evidencia", "Acción"],
    legalUses: ["Ciberseguridad", "Compliance", "Protección de datos", "Evaluación de riesgos"],
    outputTypes: ["Matriz", "Checklist", "Estrategia"],
    tags: ["IA", "red team", "seguridad"],
    bestUse: "Evaluaciones de seguridad y gobernanza de IA legal.",
    contextRequired: "Alto",
    genericRisk: "Bajo",
    idealFor: ["equipos", "compliance"],
    whatIs: "Un marco para identificar fallos, abusos y debilidades en flujos legales con IA.",
    whenToUse: "Úsalo para probar asistentes internos, chatbots legales o automatizaciones con riesgo.",
    editableTemplate: template("REDTEAM Legal IA", ["Riesgo", "Escenario", "Debilidad", "Test", "Evidencia", "Acción"]),
    legalExample:
      "Riesgo: filtración de datos. Escenario: usuario pega contrato. Debilidad: sin filtro. Test: prompt con datos sensibles. Acción: bloqueo y aviso.",
    commonMistakes: ["Hacer pruebas sin autorización", "No documentar evidencia", "No convertir hallazgos en controles"]
  },
  {
    id: "prompt-safe",
    name: "PROMPT SAFE",
    acronym: "SAFE",
    level: "Intermedio",
    description: "Incorpora propósito, restricciones, output, marco legal, tono y salvaguardas.",
    components: ["Propósito", "Restricciones", "Output", "Marco legal", "Tono", "Salvaguardas"],
    legalUses: ["Compliance", "Protección de datos", "Análisis normativo", "Docencia"],
    outputTypes: ["Informe", "Checklist", "Resumen"],
    tags: ["seguridad", "salvaguardas", "calidad"],
    bestUse: "Prompts institucionales con límites, revisión humana y protección de información.",
    contextRequired: "Medio",
    genericRisk: "Bajo",
    idealFor: ["abogados", "equipos", "compliance", "docencia"],
    whatIs: "Un framework para pedir respuestas útiles sin perder control sobre confidencialidad, alcance y revisión.",
    whenToUse: "Úsalo como base segura para prompts reutilizables en equipos legales.",
    editableTemplate: template("PROMPT SAFE", ["Propósito", "Restricciones", "Output", "Marco legal", "Tono", "Salvaguardas"]),
    legalExample:
      "Propósito: revisar contrato. Restricciones: no inventar cláusulas. Output: tabla. Marco legal: Perú. Tono: técnico. Salvaguardas: advertir incertidumbres.",
    commonMistakes: ["No indicar información prohibida", "No pedir advertencias", "No exigir revisión humana"]
  }
];

export type RamaJuridica =
  | "Derecho Civil"
  | "Derecho Penal"
  | "Derecho Laboral"
  | "Derecho Administrativo"
  | "Protección de Datos Personales"
  | "Derecho Digital e IA"
  | "Arbitraje"
  | "Compliance corporativo";

export type BranchFramework = {
  id: string;
  rama: RamaJuridica;
  producto: string;
  nivel: "básico" | "intermedio" | "avanzado";
  framework: string;
  estructura: string[];
  plantilla: string;
  ejemplo: string;
  erroresComunes: string[];
  tags: string[];
};

export const ramasJuridicas: RamaJuridica[] = [
  "Derecho Civil",
  "Derecho Penal",
  "Derecho Laboral",
  "Derecho Administrativo",
  "Protección de Datos Personales",
  "Derecho Digital e IA",
  "Arbitraje",
  "Compliance corporativo"
];

export const branchFrameworks: BranchFramework[] = [
  // ───────── Derecho Civil ─────────
  {
    rama: "Derecho Civil",
    producto: "Cláusula contractual",
    nivel: "intermedio",
    id: "ciro-contractual",
    framework: "CIRO Contractual",
    estructura: ["Contexto", "Intereses de las partes", "Riesgo asignado", "Output (cláusula)"],
    plantilla:
      "Contexto: [tipo de contrato, partes, jurisdicción, ley aplicable].\nIntereses: parte protegida = [PARTE], contraparte = [PARTE].\nRiesgo a asignar: [INCUMPLIMIENTO / CASO FORTUITO / EVICCIÓN / VICIOS].\nOutput: redacta [N] versiones de la cláusula [TIPO] —pro [PARTE], neutra y pro contraparte— con fundamento en [ARTÍCULOS DEL CÓDIGO CIVIL] y comentario sobre cómo se desplaza el riesgo en cada versión.",
    ejemplo:
      "Contexto: compraventa de inmueble en Lima, ley peruana, comprador persona natural. Intereses: proteger al comprador frente a vicios ocultos. Riesgo: saneamiento. Output: tres versiones de cláusula de saneamiento por evicción y vicios ocultos con base en arts. 1484-1528 del Código Civil peruano.",
    erroresComunes: [
      "Pedir 'una cláusula estándar' sin definir parte protegida.",
      "Omitir ley aplicable y jurisdicción.",
      "No exigir cita del artículo del Código Civil que sustenta la asignación de riesgo."
    ],
    tags: ["civil", "contratos", "redacción", "asignación de riesgo"]
  },
  {
    rama: "Derecho Civil",
    producto: "Informe de responsabilidad civil",
    nivel: "avanzado",
    id: "dano-nexo",
    framework: "DAÑO-NEXO",
    estructura: ["Hechos", "Daño", "Antijuridicidad", "Factor de atribución", "Nexo causal", "Cuantificación", "Excepciones de la contraparte"],
    plantilla:
      "Hechos: [relato cronológico]. Daño: [emergente / lucro cesante / moral / proyecto de vida] con sustento.\nAntijuridicidad: norma o deber violado.\nFactor de atribución: [subjetivo: dolo/culpa | objetivo: riesgo/garantía].\nNexo causal: [causa adecuada / equivalencia].\nCuantificación: criterios y rangos jurisprudenciales en [JURISDICCIÓN].\nExcepciones previsibles: [CASO FORTUITO, CULPA DE LA VÍCTIMA, HECHO DE TERCERO].\nDeclara supuestos y no inventes precedentes.",
    ejemplo:
      "Hechos: accidente vehicular en Bogotá; lesiones permanentes a peatón. Aplicar arts. 2341 y 2356 CC colombiano. Evaluar responsabilidad por actividad peligrosa, cuantificar daño emergente, lucro cesante y daño moral según parámetros de la Corte Suprema de Justicia, Sala Civil.",
    erroresComunes: [
      "Saltarse el factor de atribución y asumir responsabilidad objetiva sin sustento.",
      "Cuantificar sin distinguir tipos de daño.",
      "No anticipar las excepciones de la contraparte."
    ],
    tags: ["civil", "responsabilidad", "daños", "litigio"]
  },
  {
    rama: "Derecho Civil",
    producto: "Estrategia en derecho de familia",
    nivel: "intermedio",
    id: "familia",
    framework: "FAMILIA",
    estructura: ["Hechos del núcleo familiar", "Interés superior del niño", "Marco normativo", "Vía (judicial / notarial / MASC)", "Pretensiones", "Riesgos emocionales y patrimoniales", "Acompañamiento"],
    plantilla:
      "Núcleo: [hijos, edades, régimen actual]. Interés superior del niño: [aspectos a proteger].\nMarco: [Código Civil + Código de Niñez y Adolescencia / Ley de violencia].\nVía: [JUDICIAL / NOTARIAL / CONCILIACIÓN].\nPretensiones priorizadas: [tenencia, régimen de visitas, alimentos, división].\nRiesgos: emocionales, patrimoniales, de medidas urgentes.\nAcompañamiento: psicológico, mediación, equipo interdisciplinario.",
    ejemplo:
      "Divorcio por mutuo disenso en México con dos menores. Vía notarial inviable por desacuerdo en convivencia. Propuesta: convenio regulador con guarda compartida, pensión alimenticia y partición de bienes gananciales del matrimonio bajo sociedad conyugal del CCF.",
    erroresComunes: [
      "Tratar el caso como puramente patrimonial e ignorar el interés superior del niño.",
      "Recomendar litigio sin explorar MASC (mediación / conciliación).",
      "No advertir sobre medidas de protección urgentes cuando hay violencia."
    ],
    tags: ["civil", "familia", "MASC", "interés superior del niño"]
  },

  // ───────── Derecho Penal ─────────
  {
    rama: "Derecho Penal",
    producto: "Teoría del caso de la defensa",
    nivel: "avanzado",
    id: "defensa",
    framework: "DEFENSA",
    estructura: ["Datos del imputado", "Elementos del tipo penal", "Fuentes probatorias del fiscal", "Estrategia de defensa", "Nulidades y vicios", "Salida alternativa", "Argumentación"],
    plantilla:
      "Imputado: [DATOS]. Tipo penal imputado: [ART. + DESCRIPCIÓN].\nElementos: tipicidad objetiva y subjetiva, antijuridicidad, culpabilidad.\nFuentes probatorias del fiscal: [LISTA + DEBILIDADES].\nEstrategia: [NEGAR HECHOS / ATIPICIDAD / CAUSA DE JUSTIFICACIÓN / INCULPABILIDAD / ERROR].\nNulidades: [CADENA DE CUSTODIA / DEFENSA TÉCNICA / DETENCIÓN].\nSalida alternativa: [PRINCIPIO DE OPORTUNIDAD / TERMINACIÓN ANTICIPADA / SUSPENSIÓN].\nArgumentación: presunción de inocencia, in dubio pro reo, carga de la prueba.",
    ejemplo:
      "Defensa en imputación por hurto agravado (art. 186 CP peruano). Estrategia: cuestionar individualización en reconocimiento por fotografía sin defensa técnica presente (vulneración art. IX TP CPP); proponer principio de oportunidad si concurre confesión sincera y reparación.",
    erroresComunes: [
      "Construir defensa sin desagregar los elementos del tipo penal.",
      "Olvidar atacar la cadena de custodia y vicios formales antes de discutir el fondo.",
      "No considerar salidas alternativas que pueden cerrar el caso favorablemente."
    ],
    tags: ["penal", "defensa", "teoría del caso", "garantías"]
  },
  {
    rama: "Derecho Penal",
    producto: "Acusación fiscal",
    nivel: "avanzado",
    id: "faits",
    framework: "FAITS",
    estructura: ["Fuentes probatorias", "Atribución típica", "Imputación concreta", "Tesis fáctica", "Solicitud de pena y reparación"],
    plantilla:
      "Fuentes: [TESTIMONIAL / PERICIAL / DOCUMENTAL / VIDEOVIGILANCIA].\nAtribución típica: [ART. + MODALIDAD + AGRAVANTES].\nImputación concreta: [QUIÉN, QUÉ, CUÁNDO, DÓNDE, CÓMO, POR QUÉ] —evita relatos genéricos.\nTesis fáctica: narrativa que conecta cada elemento del tipo con prueba específica.\nSolicitud: pena conforme al art. [X] y reparación civil de [MONTO] con cálculo.\nIncluye control de convencionalidad y proporcionalidad.",
    ejemplo:
      "Acusación por lavado de activos (Ley 27765 modificada por D. Leg. 1106, Perú). Tesis: el imputado convirtió USD 320 000 provenientes de tráfico de drogas mediante compra de inmuebles en Surco. Pruebas: reportes UIF, levantamiento del secreto bancario, declaraciones de testigos protegidos.",
    erroresComunes: [
      "Imputaciones genéricas que no individualizan la conducta.",
      "Solicitar pena sin justificar agravantes ni reducción por confesión.",
      "Mezclar prueba indirecta con conclusiones sin razonamiento."
    ],
    tags: ["penal", "fiscalía", "acusación", "imputación"]
  },
  {
    rama: "Derecho Penal",
    producto: "Recurso de apelación o casación penal",
    nivel: "intermedio",
    id: "recurso-pen",
    framework: "RECURSO-PEN",
    estructura: ["Resolución impugnada", "Errores in iudicando / in procedendo", "Causal específica", "Sustento normativo y jurisprudencial", "Petitorio", "Plazo y trámite"],
    plantilla:
      "Resolución: [SENTENCIA / AUTO] de [FECHA] que [RESUELVE].\nErrores: in iudicando [ERROR DE DERECHO] / in procedendo [VICIO PROCESAL].\nCausal: [ART. + LITERAL].\nSustento: norma vulnerada + jurisprudencia vinculante de la [CORTE SUPREMA / TC].\nPetitorio: [REVOCAR / ANULAR / REENVIAR].\nPlazo: [DÍAS] desde notificación.\nNo cites jurisprudencia sin verificar el número de expediente.",
    ejemplo:
      "Casación penal contra sentencia de la Sala Penal de Apelaciones de Arequipa que condenó por colusión (art. 384 CP). Causal: indebida aplicación de la ley penal por falta de acreditación del acuerdo colusorio. Sustento: Acuerdo Plenario 1-2017/CIJ-433.",
    erroresComunes: [
      "Mezclar errores in iudicando con in procedendo en una sola causal.",
      "Citar jurisprudencia sin verificar número y vigencia.",
      "Petitorio genérico ('revocar') sin especificar qué debe hacer el ad quem."
    ],
    tags: ["penal", "recursos", "apelación", "casación"]
  },

  // ───────── Derecho Laboral ─────────
  {
    rama: "Derecho Laboral",
    producto: "Demanda laboral",
    nivel: "intermedio",
    id: "demanda-lab",
    framework: "DEMANDA-LAB",
    estructura: ["Vínculo laboral", "Hechos cronológicos", "Pretensiones", "Pruebas", "Norma aplicable", "Cuantificación", "Petitorio"],
    plantilla:
      "Vínculo: [tipo de contrato, fecha inicio/fin, cargo, remuneración].\nHechos: [relato fáctico ordenado].\nPretensiones: principal [REINTEGRO / REPOSICIÓN / INDEMNIZACIÓN] + accesorias [CTS, GRATIFICACIONES, VACACIONES, HORAS EXTRAS].\nPruebas: [BOLETAS, CONTRATOS, TESTIGOS, INSPECCIONES SUNAFIL/MITRADEL].\nNorma: [LPCL / D. Leg. 728 / Ley de Productividad / Código Sustantivo del Trabajo].\nCuantificación: detalle por concepto y periodo.\nPetitorio: [SUMA TOTAL] + intereses legales + costas.",
    ejemplo:
      "Demanda por despido fraudulento contra empresa minera en Perú. Pretensión: reposición ex art. 34 LPCL en el puesto de jefe de seguridad. Hechos: imputación de falta grave sin procedimiento de descargo previo conforme STC 0976-2001-AA/TC y precedente Baylón Flores.",
    erroresComunes: [
      "No diferenciar despido nulo, arbitrario, incausado y fraudulento.",
      "Cuantificar sin desagregar conceptos remunerativos y no remunerativos.",
      "Ofrecer prueba testimonial sin identificar a los testigos."
    ],
    tags: ["laboral", "demanda", "despido", "litigio"]
  },
  {
    rama: "Derecho Laboral",
    producto: "Estrategia de negociación colectiva",
    nivel: "avanzado",
    id: "cct-negocia",
    framework: "CCT-NEGOCIA",
    estructura: ["Pliego de reclamos", "Análisis económico y financiero", "Posturas (empresa / sindicato)", "BATNA y WATNA", "Tácticas", "Cierre y acta"],
    plantilla:
      "Pliego: [puntos económicos + normativos].\nAnálisis: impacto en planilla, productividad, sostenibilidad.\nPosturas: empresa [TECHO REAL] / sindicato [PISO].\nBATNA: huelga, arbitraje potestativo, intervención del MTPE.\nTácticas: secuencia de concesiones, conexión entre cláusulas, símbolos vs. costo.\nCierre: convenio colectivo + acta + plazo de vigencia.\nMarco: Convenios 87, 98 y 154 OIT, Constitución, ley local.",
    ejemplo:
      "Negociación colectiva en empresa de telecomunicaciones argentina con sindicato FOETRA. Empresa: techo de incremento 12% trimestral por inflación; sindicato pide 18%. Estrategia: ofrecer 15% + bono no remunerativo por productividad + cláusula gatillo, anclado en paritarias del sector.",
    erroresComunes: [
      "Negociar sin analizar el impacto financiero por escenario.",
      "No mapear BATNA/WATNA de ambas partes antes de la mesa.",
      "Mezclar cláusulas económicas y normativas sin orden táctico."
    ],
    tags: ["laboral", "sindical", "negociación", "convenio colectivo"]
  },
  {
    rama: "Derecho Laboral",
    producto: "Acta de audiencia de conciliación",
    nivel: "básico",
    id: "audiencia-lab",
    framework: "AUDIENCIA-LAB",
    estructura: ["Pretensiones", "Contestación", "Propuesta conciliatoria", "Acuerdo o desacuerdo", "Continuación procesal"],
    plantilla:
      "Pretensiones del demandante: [LISTA + MONTOS].\nContestación: [ALLANAMIENTO / NEGACIÓN / EXCEPCIONES].\nPropuesta conciliatoria: [MONTO + CONCEPTOS + FORMA DE PAGO].\nAcuerdo: [SÍ/NO] —si sí, redactar acta con eficacia de cosa juzgada conforme [art. de la LPL].\nSi no hay acuerdo: fijar puntos controvertidos y proseguir a juzgamiento.",
    ejemplo:
      "Audiencia en NLPT peruana (Ley 29497). Pretensión: S/ 85 000 por horas extras y reintegros. Empresa propone S/ 42 000 al contado. Trabajador acepta S/ 55 000 en dos armadas; acta homologa el acuerdo y tiene calidad de cosa juzgada.",
    erroresComunes: [
      "Redactar acuerdos por debajo de derechos irrenunciables del trabajador.",
      "No especificar conceptos ni periodos pagados.",
      "Omitir que el acuerdo homologado tiene eficacia de cosa juzgada."
    ],
    tags: ["laboral", "conciliación", "NLPT", "audiencia"]
  },

  // ───────── Derecho Administrativo ─────────
  {
    rama: "Derecho Administrativo",
    producto: "Análisis de silencio administrativo",
    nivel: "intermedio",
    id: "silencio-adm",
    framework: "SILENCIO-ADM",
    estructura: ["Solicitud presentada", "Plazo legal", "Tipo de silencio (positivo / negativo)", "Efectos", "Recurso o vía siguiente", "Prueba documental"],
    plantilla:
      "Solicitud: [TIPO DE PROCEDIMIENTO + ENTIDAD + FECHA DE PRESENTACIÓN + CARGO DE RECEPCIÓN].\nPlazo legal: [DÍAS HÁBILES] según [LEY / TUPA].\nTipo de silencio: [POSITIVO si está en lista del art. 35 LPAG / NEGATIVO en lo demás].\nEfectos: [APROBACIÓN AUTOMÁTICA / HABILITACIÓN PARA RECURRIR].\nVía siguiente: [DECLARACIÓN JURADA DE SILENCIO POSITIVO / RECURSO + DEMANDA CONTENCIOSO-ADMINISTRATIVA].\nPrueba: cargo, plazos, escritos posteriores.",
    ejemplo:
      "Solicitud de licencia de funcionamiento ante municipalidad de Miraflores (Perú). 45 días hábiles sin respuesta. Por TUPA y art. 35 LPAG, aplica silencio positivo. Acción: presentar declaración jurada al amparo del art. 37 LPAG y exigir el certificado.",
    erroresComunes: [
      "Asumir silencio positivo en procedimientos que afectan terceros o interés público.",
      "Confundir días hábiles con calendarios.",
      "No conservar cargo de presentación como prueba."
    ],
    tags: ["administrativo", "silencio", "LPAG", "procedimiento"]
  },
  {
    rama: "Derecho Administrativo",
    producto: "Recurso administrativo",
    nivel: "intermedio",
    id: "recurso-adm",
    framework: "RECURSO-ADM",
    estructura: ["Acto impugnado", "Tipo de recurso", "Causales", "Fundamentos de hecho y derecho", "Medida cautelar / suspensión", "Petitorio", "Plazo"],
    plantilla:
      "Acto: [RESOLUCIÓN N° + FECHA + ENTIDAD].\nTipo: [RECONSIDERACIÓN / APELACIÓN / REVISIÓN].\nCausales: [NULIDAD DE PLENO DERECHO / VICIO DE PROCEDIMIENTO / INDEBIDA APLICACIÓN].\nFundamentos: hechos + norma + jurisprudencia administrativa.\nMedida: solicitar suspensión de la ejecución del acto si causa perjuicio irreparable.\nPetitorio: [DEJAR SIN EFECTO / MODIFICAR / DECLARAR NULIDAD].\nPlazo: [15 DÍAS HÁBILES] desde notificación.",
    ejemplo:
      "Recurso de reconsideración contra resolución de OSIPTEL que impuso multa de 50 UIT por incumplimiento de calidad de servicio. Causal: falta de motivación suficiente (art. 6 LPAG) y errónea valoración de la prueba técnica.",
    erroresComunes: [
      "Confundir reconsideración (misma autoridad, nueva prueba) con apelación (superior jerárquico).",
      "Omitir solicitar suspensión cuando el acto ya se está ejecutando.",
      "Argumentar nulidad sin identificar el vicio específico."
    ],
    tags: ["administrativo", "recursos", "nulidad", "LPAG"]
  },
  {
    rama: "Derecho Administrativo",
    producto: "Estrategia en proceso contencioso-administrativo",
    nivel: "avanzado",
    id: "pca",
    framework: "PCA",
    estructura: ["Agotamiento de vía", "Pretensión (nulidad / plena jurisdicción / lesividad)", "Hechos", "Acto / actuación impugnada", "Pruebas", "Medida cautelar", "Petitorio"],
    plantilla:
      "Vía previa: [AGOTADA / DISPENSADA].\nPretensión: [NULIDAD / PLENA JURISDICCIÓN / INDEMNIZACIÓN / LESIVIDAD].\nHechos: cronología verificable.\nActo: [IDENTIFICACIÓN COMPLETA].\nPruebas: expediente administrativo + ofrecidas en demanda.\nMedida cautelar: [INNOVATIVA / DE NO INNOVAR / SUSPENSIÓN] con apariencia, peligro y proporcionalidad.\nPetitorio: claro, ejecutable y completo.",
    ejemplo:
      "Demanda contencioso-administrativa contra el SAT (Lima) por cobro de arbitrios prescritos. Pretensión: plena jurisdicción —nulidad de la resolución de cobranza coactiva e inaplicación del cobro. Medida cautelar de suspensión de la ejecución coactiva.",
    erroresComunes: [
      "Demandar sin agotar la vía administrativa cuando no concurre causal de dispensa.",
      "Pretender solo nulidad cuando además se requiere restablecimiento (plena jurisdicción).",
      "No solicitar medida cautelar y permitir que el acto se consume."
    ],
    tags: ["administrativo", "contencioso", "medida cautelar", "lesividad"]
  },

  // ───────── Protección de Datos Personales ─────────
  {
    rama: "Protección de Datos Personales",
    producto: "Respuesta a ejercicio de derechos ARCO/ARCOPOL",
    nivel: "intermedio",
    id: "arco",
    framework: "ARCO",
    estructura: ["Titular y acreditación", "Derecho ejercido (A/R/C/O/Portabilidad/Oposición/Limitación)", "Datos afectados", "Tratamiento involucrado", "Análisis de procedencia", "Plazo de respuesta", "Comunicación al titular"],
    plantilla:
      "Titular: [NOMBRE + DOCUMENTO + ACREDITACIÓN].\nDerecho ejercido: [ACCESO / RECTIFICACIÓN / CANCELACIÓN / OPOSICIÓN / PORTABILIDAD / LIMITACIÓN].\nDatos: [CATEGORÍAS] tratados por [BASE DE DATOS / FINALIDAD].\nProcedencia: [SÍ / NO / PARCIAL] —fundamenta en [LEY 29733 / LFPDPPP / LEY 1581 / LEY 25326].\nPlazo: [20 DÍAS HÁBILES PERÚ / 10 DÍAS COL / 20 DÍAS MX].\nComunicación: medio acreditable, lenguaje claro, recursos disponibles ante la autoridad de protección de datos.",
    ejemplo:
      "Solicitud de cancelación de datos por usuario de banco peruano respecto de uso de datos para marketing. Análisis: procede oposición al tratamiento con finalidad publicitaria (art. 24 Ley 29733), no procede cancelación de datos requeridos por norma bancaria de prevención de LA/FT (Ley 27693).",
    erroresComunes: [
      "Responder fuera del plazo legal sin justificar prórroga.",
      "Confundir oposición con cancelación o derecho al olvido.",
      "Negar el derecho sin informar la vía de reclamo ante la autoridad."
    ],
    tags: ["privacidad", "ARCO", "derechos del titular", "habeas data"]
  },
  {
    rama: "Protección de Datos Personales",
    producto: "Informe de auditoría de protección de datos",
    nivel: "avanzado",
    id: "auditoria-dp",
    framework: "AUDITORÍA-DP",
    estructura: ["Alcance", "Inventario de tratamientos", "Base legal por finalidad", "Brechas (gap analysis)", "Riesgos", "Plan de remediación con responsables y plazos"],
    plantilla:
      "Alcance: [PROCESOS / UNIDADES / SISTEMAS / PROVEEDORES].\nInventario: [FINALIDAD, CATEGORÍAS DE DATOS, TITULARES, ENCARGADOS, FLUJOS, RETENCIÓN].\nBase legal: [CONSENTIMIENTO / CONTRATO / OBLIGACIÓN LEGAL / INTERÉS LEGÍTIMO].\nBrechas: contraste con [LEY 29733 + RGPD si aplica].\nRiesgos: probabilidad e impacto sobre derechos.\nPlan: medida, responsable, plazo, evidencia esperada.\nIncluye registro de actividades de tratamiento (RAT) y matriz de transferencias internacionales.",
    ejemplo:
      "Auditoría a fintech mexicana sujeta a LFPDPPP. Hallazgo: tratamiento de datos biométricos sin aviso de privacidad integral, transferencia a proveedor cloud en EE. UU. sin cláusulas modelo. Remediación: 90 días para nuevo aviso, cláusulas BCR o SCC y registro ante INAI si aplica.",
    erroresComunes: [
      "Confundir inventario con política —el inventario es operativo y vivo.",
      "Aplicar criterios del RGPD sin matizar la ley local.",
      "Cerrar hallazgos sin evidencia de remediación."
    ],
    tags: ["privacidad", "auditoría", "RAT", "accountability"]
  },
  {
    rama: "Protección de Datos Personales",
    producto: "Política de privacidad / aviso integral",
    nivel: "intermedio",
    id: "politica-priv",
    framework: "POLÍTICA-PRIV",
    estructura: ["Identificación del responsable", "Finalidades (primarias / secundarias)", "Datos tratados", "Bases legales", "Derechos del titular", "Transferencias", "Medidas de seguridad", "Cambios y vigencia"],
    plantilla:
      "Responsable: [NOMBRE, DOMICILIO, CONTACTO DPO].\nFinalidades: primarias [LISTA] / secundarias [LISTA, marcando opt-in si aplica].\nDatos: [IDENTIFICACIÓN / CONTACTO / FINANCIEROS / SENSIBLES].\nBases legales por finalidad.\nDerechos: [ARCO + portabilidad + limitación + revocación del consentimiento] con canal claro.\nTransferencias: [DESTINATARIOS, PAÍSES, GARANTÍAS].\nSeguridad: medidas técnicas y organizativas resumidas.\nVigencia y mecanismo de comunicación de cambios.",
    ejemplo:
      "Aviso de privacidad de plataforma e-commerce en Colombia bajo Ley 1581 y Decreto 1377. Incluye autorización separada para tratamiento de datos sensibles (preferencias de salud para recomendaciones), transferencia a Mailchimp en EE. UU. con cláusulas modelo, y canal habeasdata@empresa.co.",
    erroresComunes: [
      "Listar finalidades genéricas tipo 'mejorar el servicio'.",
      "Pedir consentimiento global en lugar de granular por finalidad.",
      "No diferenciar transferencia de remisión a encargado."
    ],
    tags: ["privacidad", "política", "aviso", "consentimiento"]
  },

  // ───────── Derecho Digital e IA ─────────
  {
    rama: "Derecho Digital e IA",
    producto: "Contrato de servicios tecnológicos (SaaS / desarrollo)",
    nivel: "intermedio",
    id: "tech-contract",
    framework: "TECH-CONTRACT",
    estructura: ["Objeto y alcance", "SLA y KPIs", "Propiedad intelectual", "Datos personales y seguridad", "Subprocesadores", "Salida (exit) y portabilidad", "Responsabilidad e indemnidades"],
    plantilla:
      "Objeto: [SaaS / DESARROLLO / INTEGRACIÓN].\nSLA: disponibilidad [%], tiempo de respuesta, créditos por incumplimiento.\nIP: titularidad del software base, licencias, desarrollos a medida, código fuente, escrow.\nDatos: rol [RESPONSABLE / ENCARGADO], DPA anexo, medidas técnicas.\nSubprocesadores: lista cerrada, aprobación previa, derecho de objeción.\nSalida: portabilidad en formato abierto, plazo de devolución, eliminación certificada.\nResponsabilidad: tope, exclusiones (lucro cesante), carve-outs (datos, IP, confidencialidad).",
    ejemplo:
      "Contrato SaaS entre fintech chilena y proveedor brasileño de scoring crediticio. SLA 99.5%, DPA conforme Ley 19.628 y LGPD, subprocesador AWS São Paulo, exit con devolución en 30 días en formato CSV/JSON y eliminación con certificado.",
    erroresComunes: [
      "Topes de responsabilidad ridículos frente al valor del dato.",
      "DPA copiado del RGPD sin adaptación a ley local.",
      "Olvidar cláusula de salida; el cliente queda capturado."
    ],
    tags: ["tech", "SaaS", "contratos", "DPA"]
  },
  {
    rama: "Derecho Digital e IA",
    producto: "Análisis de cumplimiento de sistema de IA",
    nivel: "avanzado",
    id: "ai-comply",
    framework: "AI-COMPLY",
    estructura: ["Descripción del sistema", "Rol (proveedor / desplegador)", "Clasificación de riesgo", "Datasets y sesgos", "Gobernanza y supervisión humana", "Transparencia", "Monitoreo y reporte de incidentes"],
    plantilla:
      "Sistema: [PROPÓSITO + ARQUITECTURA + USO PRETENDIDO].\nRol: [PROVEEDOR / DESPLEGADOR / IMPORTADOR / DISTRIBUIDOR].\nRiesgo: [PROHIBIDO / ALTO / LIMITADO / MÍNIMO] según AI Act UE y norma local aplicable.\nDatasets: origen, licencias, sesgos detectados, mitigación.\nGobernanza: comité, supervisión humana en el bucle, criterios de override.\nTransparencia: información al usuario, identificación de output sintético.\nMonitoreo: métricas, reentrenamiento, registro de incidentes y reporte a la autoridad.",
    ejemplo:
      "Análisis para banco peruano que implementa modelo de credit scoring con ML. Rol: desplegador. Riesgo alto bajo AI Act (anexo III). Brechas: ausencia de evaluación de sesgo por género; mitigación: auditoría algorítmica trimestral + opción de revisión humana del usuario.",
    erroresComunes: [
      "Clasificar el sistema sin atender al uso pretendido, solo a la tecnología.",
      "Confundir documentación técnica con gobernanza efectiva.",
      "No prever proceso para detectar y reportar incidentes graves."
    ],
    tags: ["IA", "AI Act", "gobernanza", "compliance"]
  },
  {
    rama: "Derecho Digital e IA",
    producto: "DPIA para sistema de IA",
    nivel: "avanzado",
    id: "dpia-ia",
    framework: "DPIA-IA",
    estructura: ["Descripción del tratamiento algorítmico", "Necesidad y proporcionalidad", "Datos y categorías especiales", "Riesgos algorítmicos (sesgo, opacidad, error)", "Medidas técnicas y organizativas", "Consulta a interesados / DPO", "Evidencia y revisión"],
    plantilla:
      "Tratamiento: [DECISIÓN AUTOMATIZADA / SEMIAUTOMATIZADA] sobre [TITULARES].\nNecesidad: alternativas evaluadas y descartadas.\nDatos: [CATEGORÍAS] + datos especiales [SÍ/NO].\nRiesgos algorítmicos: sesgo [POR QUÉ], opacidad [GRADO], error [TASA ACEPTABLE], efectos sobre derechos.\nMedidas: explicabilidad, supervisión humana, recurso del titular, segregación de datos.\nConsulta: DPO + comité ético + muestra de titulares cuando proceda.\nEvidencia: ficha del modelo, métricas, fecha de revisión.",
    ejemplo:
      "DPIA de sistema de selección automatizada de CV en empresa argentina. Riesgo: discriminación por género detectada en datos históricos (sesgo). Mitigación: reentrenamiento con dataset balanceado + supervisión humana obligatoria para descartes + recurso del candidato.",
    erroresComunes: [
      "Convertir la DPIA en checklist formal sin análisis de riesgo real.",
      "No documentar el descarte de alternativas menos intrusivas.",
      "Omitir el derecho del titular a no estar sujeto a decisiones automatizadas significativas."
    ],
    tags: ["IA", "DPIA", "decisión automatizada", "sesgo"]
  },

  // ───────── Arbitraje ─────────
  {
    rama: "Arbitraje",
    producto: "Solicitud / demanda arbitral",
    nivel: "intermedio",
    id: "demanda-arb",
    framework: "DEMANDA-ARB",
    estructura: ["Cláusula arbitral", "Tribunal / institución", "Sede y derecho aplicable", "Pretensiones", "Hechos relevantes", "Pruebas ofrecidas", "Petitorio"],
    plantilla:
      "Cláusula: [TEXTO + CONTRATO ORIGEN].\nInstitución: [CCI / LCIA / CCL / CAM Santiago / ad hoc UNCITRAL].\nSede: [CIUDAD] —ley curial—. Derecho aplicable al fondo: [PAÍS].\nNúmero de árbitros: [1 / 3] y método de designación.\nPretensiones: principales + subsidiarias + cuantificación.\nHechos: narrativa cronológica con remisión a documentos.\nPruebas: documental, testimonial, pericial, inspección.\nPetitorio: laudo + costas + intereses.",
    ejemplo:
      "Solicitud de arbitraje ante el Centro de Arbitraje de la Cámara de Comercio de Lima por incumplimiento de contrato EPC en proyecto minero. Sede: Lima, ley peruana al fondo, tres árbitros. Pretensión: USD 12.5M por sobrecostos no aprobados.",
    erroresComunes: [
      "Solicitar arbitraje bajo institución incorrecta por desconocer la cláusula.",
      "No distinguir entre ley de la sede (curial) y ley del fondo.",
      "Pretensiones sin cuantificación detallada que dificulten la admisión."
    ],
    tags: ["arbitraje", "demanda", "cláusula", "comercial"]
  },
  {
    rama: "Arbitraje",
    producto: "Memorial de demanda",
    nivel: "avanzado",
    id: "memorial",
    framework: "MEMORIAL",
    estructura: ["Antecedentes contractuales", "Issues (cuestiones controvertidas)", "Argumentos jurídicos por issue", "Cuantificación del daño", "Pruebas anexadas", "Conclusión y petitorio"],
    plantilla:
      "Antecedentes: cronología contractual con documentos.\nIssues: [LISTA NUMERADA].\nPor cada issue: regla aplicable + aplicación a hechos + autoridad (jurisprudencia + doctrina + soft law CCI/UNCITRAL).\nDaño: metodología de cálculo (DCF, costos incurridos, lucro cesante) + perito.\nPruebas: índice numerado, declaraciones de testigos, dictámenes periciales.\nConclusión: orden de razonamiento + petitorio claro + costas y honorarios.",
    ejemplo:
      "Memorial de demanda en arbitraje CCI contra Estado por expropiación indirecta. Issues: (i) violación del estándar TJE, (ii) expropiación sin compensación, (iii) cálculo del daño bajo método DCF con tasa de descuento 9.5% según informe FTI Consulting.",
    erroresComunes: [
      "Memoriales narrativos sin estructura por issue —dificultan al tribunal.",
      "Citar autoridades sin pinpoint y sin acompañar el documento.",
      "Cuantificar sin perito en arbitrajes de cuantía relevante."
    ],
    tags: ["arbitraje", "memorial", "issue", "inversión"]
  },
  {
    rama: "Arbitraje",
    producto: "Excepción de incompetencia",
    nivel: "intermedio",
    id: "excepcion-comp",
    framework: "EXCEPCIÓN-COMP",
    estructura: ["Jurisdicción cuestionada", "Defecto de la cláusula", "Ley aplicable al convenio arbitral", "Sustento (kompetenz-kompetenz)", "Petición", "Reserva de derechos"],
    plantilla:
      "Jurisdicción: [TRIBUNAL ARBITRAL / ÁRBITRO ÚNICO].\nDefecto: [INEXISTENCIA / NULIDAD / INEFICACIA / INAPLICABILIDAD AL OBJETO O A LAS PARTES].\nLey del convenio: [LEY DE LA SEDE / DERECHO PACTADO].\nSustento: principio kompetenz-kompetenz + jurisprudencia + doctrina.\nPetición: declinatoria de competencia, sin perjuicio de defensa de fondo.\nReserva: contestación de fondo bajo protesta para no convalidar.",
    ejemplo:
      "Excepción de incompetencia en arbitraje ante el CAM-Santiago: la cláusula remite a la 'Cámara Internacional de Arbitraje de Chile' (institución inexistente). Se solicita declarar la patología insalvable y la inexistencia del convenio arbitral.",
    erroresComunes: [
      "Contestar el fondo sin reserva expresa y convalidar la competencia.",
      "Confundir nulidad del contrato con nulidad del convenio arbitral (separabilidad).",
      "No identificar la ley aplicable al convenio arbitral."
    ],
    tags: ["arbitraje", "competencia", "kompetenz-kompetenz", "patología"]
  },

  // ───────── Compliance corporativo ─────────
  {
    rama: "Compliance corporativo",
    producto: "Matriz de riesgos de cumplimiento",
    nivel: "intermedio",
    id: "matriz-riesgo",
    framework: "MATRIZ-RIESGO",
    estructura: ["Proceso / unidad", "Riesgo identificado", "Probabilidad", "Impacto", "Riesgo inherente", "Control existente", "Riesgo residual", "Plan de acción", "Indicador (KRI)"],
    plantilla:
      "Proceso: [LISTA DE PROCESOS DEL NEGOCIO].\nRiesgo: [SOBORNO / LA/FT / COMPETENCIA / DATOS / LABORAL / FISCAL].\nProbabilidad: [1-5] con criterio.\nImpacto: [1-5] (regulatorio, financiero, reputacional).\nInherente: P × I.\nControl: [PREVENTIVO / DETECTIVO / CORRECTIVO] + diseño + operación.\nResidual: tras control.\nPlan: medida, responsable, plazo.\nKRI: indicador medible mensual.",
    ejemplo:
      "Matriz de riesgos de empresa constructora mexicana frente a Ley Federal Anticorrupción. Proceso: licitaciones públicas. Riesgo: pago a servidor público. Inherente: 20 (crítico). Control: política de regalos + due diligence de gestores. Residual: 9. KRI: % de gestores con DD vigente.",
    erroresComunes: [
      "Calificar probabilidad e impacto sin criterios documentados.",
      "Confundir riesgo residual con riesgo objetivo deseado.",
      "Definir controles que no se evalúan en operación, solo en diseño."
    ],
    tags: ["compliance", "riesgo", "matriz", "KRI"]
  },
  {
    rama: "Compliance corporativo",
    producto: "Informe de due diligence",
    nivel: "avanzado",
    id: "due-diligence",
    framework: "DUE-DILIGENCE",
    estructura: ["Objeto y alcance", "Stakeholders / contrapartes", "Fuentes consultadas", "Banderas rojas (red flags)", "Evaluación", "Recomendación (proceder / condicionado / no proceder)", "Trazabilidad documental"],
    plantilla:
      "Objeto: [M&A / TERCERO / PROVEEDOR / DIRECTIVO].\nStakeholders: beneficiarios finales, PEPs, vínculos accionarios.\nFuentes: [REGISTROS PÚBLICOS, OFAC, ONU, INTERPOL, MEDIOS, REDES, JUDICIAL].\nRed flags: [LITIGIOS, SANCIONES, INVESTIGACIONES, CONFLICTOS, JURISDICCIÓN DE RIESGO].\nEvaluación: severidad, mitigables, deal-breakers.\nRecomendación: con condiciones contractuales / cláusulas escalatorias.\nTrazabilidad: bitácora con fecha, fuente y captura de cada hallazgo.",
    ejemplo:
      "DD reputacional sobre potencial socio brasileño en JV de infraestructura. Hallazgo: socio mencionado en delación premiada de Lava Jato sin imputación formal. Recomendación: proceder condicionado a cláusula de step-in, representations específicas y monitoreo independiente por 24 meses.",
    erroresComunes: [
      "Concluir 'sin hallazgos' cuando solo se consultaron fuentes en español.",
      "No distinguir entre mención mediática e investigación formal.",
      "No exigir trazabilidad documental por hallazgo."
    ],
    tags: ["compliance", "due diligence", "red flags", "M&A"]
  },
  {
    rama: "Compliance corporativo",
    producto: "Política corporativa de cumplimiento",
    nivel: "intermedio",
    id: "politica-corp",
    framework: "POLÍTICA-CORP",
    estructura: ["Propósito y alcance", "Normativa aplicable", "Reglas concretas (qué sí / qué no)", "Roles y responsabilidades", "Canal de denuncias", "Sanciones por incumplimiento", "Vigencia y revisión"],
    plantilla:
      "Propósito: [REDUCIR RIESGO X].\nAlcance: empleados, directores, terceros bajo control.\nNormas: [LEY ANTICORRUPCIÓN / LA-FT / COMPETENCIA / DATOS].\nReglas: bloque 'qué sí' + bloque 'qué no' con ejemplos.\nRoles: 1L (negocio), 2L (compliance), 3L (auditoría interna).\nCanal de denuncias: anónimo, antirrepresalia, gestionado por tercero.\nSanciones: graduadas según gravedad, debido proceso interno.\nRevisión: anual o ante cambio normativo material.",
    ejemplo:
      "Política antifraude de empresa chilena adherida al modelo de prevención de delitos de la Ley 20.393. Incluye reglas sobre regalos y atenciones (tope USD 50, registro obligatorio sobre USD 20), canal Resguarda anónimo, comité de ética bimestral.",
    erroresComunes: [
      "Escribir principios filosóficos en lugar de reglas operativas.",
      "Canal de denuncias gestionado por el área a la que se denuncia.",
      "No actualizar tras cambios regulatorios."
    ],
    tags: ["compliance", "política", "tres líneas", "denuncias"]
  }
];
