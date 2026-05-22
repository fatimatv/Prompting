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
