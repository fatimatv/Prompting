import type { RamaJuridica } from "@/lib/frameworks";

export type LegalProduct = {
  id: string;
  nombre: string;
  rama: RamaJuridica;
  descripcion: string;
  cuandoUsarlo: string;
  consejosDePrompting: string[];
  erroresFrequentes: string[];
  frameworksRecomendados: string[];
};

export const legalProducts: LegalProduct[] = [
  // ───────── Derecho Civil ─────────
  {
    id: "civil-contrato-compraventa",
    nombre: "Contrato de compraventa",
    rama: "Derecho Civil",
    descripcion: "Acuerdo bilateral para transferir propiedad de un bien a cambio de un precio cierto en dinero.",
    cuandoUsarlo:
      "Cuando hay transmisión de dominio de inmuebles, vehículos, acciones o bienes muebles relevantes y conviene fijar saneamiento, modo de pago, condición resolutoria y vicios redhibitorios.",
    consejosDePrompting: [
      "Indica jurisdicción y ley aplicable desde la primera línea (Código Civil del país).",
      "Distingue obligaciones del vendedor (entrega, saneamiento) y del comprador (pago, recepción).",
      "Pide tres versiones de la cláusula crítica: pro vendedor, neutra y pro comprador.",
      "Exige al modelo citar el artículo del Código Civil que sustenta cada cláusula clave.",
      "Solicita advertencias explícitas si la operación requiere escritura pública o inscripción registral."
    ],
    erroresFrequentes: [
      "Pedir un 'contrato estándar' sin indicar parte protegida ni jurisdicción.",
      "Omitir la cláusula de saneamiento por evicción y vicios ocultos.",
      "Aceptar montos en cifras sin exigir su consignación también en letras."
    ],
    frameworksRecomendados: ["ciro-contractual", "clause", "prompt-safe"]
  },
  {
    id: "civil-contrato-arrendamiento",
    nombre: "Contrato de arrendamiento",
    rama: "Derecho Civil",
    descripcion: "Contrato por el cual una parte cede el uso temporal de un bien a cambio de una renta.",
    cuandoUsarlo:
      "Para locación de vivienda, local comercial u oficina; cuando importa fijar renta, garantías, duración, causales de resolución y devolución del bien.",
    consejosDePrompting: [
      "Especifica si es arrendamiento de vivienda o comercial: cambian las normas tuitivas aplicables.",
      "Define el régimen de mejoras: necesarias, útiles o de recreo, y quién las asume.",
      "Pide cláusulas separadas para mora, resolución, desalojo y restitución del bien.",
      "Detalla cómo se calcula el reajuste de renta (IPC, fórmula fija, periodicidad)."
    ],
    erroresFrequentes: [
      "Tratar arrendamiento de vivienda como locación comercial pura (ignorar protección al inquilino).",
      "No regular el régimen de garantías (depósito vs. fiador).",
      "Omitir la cláusula de resolución por mora con preaviso y procedimiento."
    ],
    frameworksRecomendados: ["clause", "ciro-contractual", "race-juridico"]
  },
  {
    id: "civil-demanda-responsabilidad",
    nombre: "Demanda de responsabilidad civil extracontractual",
    rama: "Derecho Civil",
    descripcion: "Escrito que reclama indemnización por daños causados sin vínculo contractual previo.",
    cuandoUsarlo:
      "Accidentes de tránsito, daños por actividad peligrosa, responsabilidad por hecho de las cosas, responsabilidad médica fuera de contrato.",
    consejosDePrompting: [
      "Pide que el modelo separe los elementos: hecho, daño, antijuridicidad, factor de atribución, nexo causal.",
      "Solicita cuantificación desagregada: daño emergente, lucro cesante, daño moral, daño al proyecto de vida.",
      "Anticipa excepciones de la contraparte (caso fortuito, culpa de la víctima, hecho de tercero).",
      "Exige citación precisa de jurisprudencia de la Corte Suprema o de Casación local."
    ],
    erroresFrequentes: [
      "Cuantificar un monto global sin desagregar tipos de daño.",
      "Saltar el factor de atribución (subjetivo / objetivo) y asumir responsabilidad sin probarla.",
      "Pedir pruebas testimoniales sin individualizar a los testigos."
    ],
    frameworksRecomendados: ["dano-nexo", "irac-prompting", "creac-prompting"]
  },
  {
    id: "civil-convenio-regulador",
    nombre: "Convenio regulador de divorcio",
    rama: "Derecho Civil",
    descripcion: "Acuerdo que regula custodia, alimentos, régimen de visitas y partición de bienes en un divorcio.",
    cuandoUsarlo:
      "Divorcio por mutuo consentimiento (notarial o judicial) cuando existen hijos menores o sociedad conyugal a liquidar.",
    consejosDePrompting: [
      "Antes de redactar, pide al modelo identificar el interés superior del niño en cada cláusula.",
      "Diferencia tenencia, régimen de visitas y patria potestad: son figuras distintas.",
      "Pide cláusulas de revisión automática de pensión alimenticia (indexación) y de comunicación de cambios.",
      "Solicita advertencias si la vía notarial es inviable (desacuerdo, violencia, menores con discapacidad).",
      "Verifica que la partición de bienes respete el régimen patrimonial (sociedad conyugal / separación)."
    ],
    erroresFrequentes: [
      "Tratar el convenio como un acuerdo puramente patrimonial.",
      "Fijar pensiones sin fórmula de indexación o sin método de pago verificable.",
      "Recomendar vía notarial cuando hay menores en conflicto o medidas de protección vigentes."
    ],
    frameworksRecomendados: ["familia", "clause", "prompt-safe"]
  },

  // ───────── Derecho Penal ─────────
  {
    id: "penal-teoria-caso-defensa",
    nombre: "Teoría del caso de la defensa",
    rama: "Derecho Penal",
    descripcion: "Hipótesis fáctica y jurídica que estructura la estrategia defensiva en todo el proceso.",
    cuandoUsarlo:
      "Desde la formalización de la imputación hasta el juicio oral, para mantener coherencia entre alegato de apertura, prueba y alegato de cierre.",
    consejosDePrompting: [
      "Pide el desglose por elemento del tipo: tipicidad objetiva, subjetiva, antijuridicidad, culpabilidad.",
      "Solicita análisis de cada fuente probatoria del fiscal con su debilidad concreta.",
      "Antes del fondo, pide al modelo revisar nulidades formales (detención, cadena de custodia, defensa técnica).",
      "Pide explorar salidas alternativas: principio de oportunidad, terminación anticipada, suspensión condicional.",
      "Exige que cada afirmación se ancle en presunción de inocencia, in dubio pro reo o carga del fiscal."
    ],
    erroresFrequentes: [
      "Construir defensa sin desagregar los elementos del tipo.",
      "Atacar el fondo sin agotar antes los vicios formales y de garantía.",
      "Ignorar salidas alternativas que cierran el caso favorablemente."
    ],
    frameworksRecomendados: ["defensa", "irac-prompting", "creac-prompting"]
  },
  {
    id: "penal-acusacion-fiscal",
    nombre: "Acusación fiscal",
    rama: "Derecho Penal",
    descripcion: "Requerimiento del Ministerio Público que individualiza la imputación y solicita pena y reparación.",
    cuandoUsarlo:
      "Al cierre de la investigación preparatoria, cuando hay elementos de convicción suficientes para sostener acusación en juicio.",
    consejosDePrompting: [
      "Pide imputación concreta: quién, qué, cuándo, dónde, cómo y por qué — evita relatos genéricos.",
      "Vincula cada elemento del tipo penal con prueba específica del expediente.",
      "Justifica agravantes y atenuantes con norma y hechos, no solo con la calificación.",
      "Pide cálculo motivado de la pena (mínimo, máximo, factores) y de la reparación civil."
    ],
    erroresFrequentes: [
      "Imputaciones genéricas que no individualizan la conducta.",
      "Solicitar pena sin justificar agravantes ni reducción por confesión.",
      "Mezclar prueba indirecta con conclusiones sin razonamiento explícito."
    ],
    frameworksRecomendados: ["faits", "irac-prompting", "matrix"]
  },
  {
    id: "penal-recurso-apelacion",
    nombre: "Recurso de apelación / casación penal",
    rama: "Derecho Penal",
    descripcion: "Impugnación de sentencia o auto por errores in iudicando o in procedendo.",
    cuandoUsarlo:
      "Dentro del plazo legal posterior a la notificación, cuando hay vicios de derecho o de procedimiento que justifiquen revisión.",
    consejosDePrompting: [
      "Separa expresamente errores in iudicando (de derecho) e in procedendo (de procedimiento).",
      "Cada causal debe alinearse con un literal específico del Código Procesal Penal.",
      "Cita jurisprudencia vinculante (Acuerdos Plenarios, sentencias del TC) con número de expediente verificable.",
      "Pide petitorio preciso: revocar, anular total/parcialmente, reenviar a nuevo juicio."
    ],
    erroresFrequentes: [
      "Mezclar errores in iudicando e in procedendo en una sola causal.",
      "Citar jurisprudencia sin verificar el número de expediente.",
      "Petitorio genérico ('revocar') sin especificar qué debe hacer el tribunal superior."
    ],
    frameworksRecomendados: ["recurso-pen", "creac-prompting", "case"]
  },
  {
    id: "penal-cesacion-prision-preventiva",
    nombre: "Solicitud de cesación de prisión preventiva",
    rama: "Derecho Penal",
    descripcion: "Pedido fundado de que cesen los requisitos que sustentaron la medida cautelar personal.",
    cuandoUsarlo:
      "Cuando hay nuevos elementos de convicción que enervan los presupuestos (peligro de fuga, obstaculización, sospecha grave) o cuando ha transcurrido un plazo razonable.",
    consejosDePrompting: [
      "Identifica cuál de los tres presupuestos ha decaído y por qué (con prueba nueva).",
      "Argumenta proporcionalidad y plazo razonable con jurisprudencia de la Corte IDH y del TC.",
      "Propón medidas alternativas concretas (comparecencia restringida, caución, impedimento de salida).",
      "Adjunta arraigo: laboral, familiar, domiciliario, con documentación verificable."
    ],
    erroresFrequentes: [
      "Argumentar solo sobre el paso del tiempo sin nuevos elementos.",
      "No proponer medidas alternativas concretas y proporcionales.",
      "Omitir el análisis de proporcionalidad y razonabilidad del plazo."
    ],
    frameworksRecomendados: ["defensa", "irac-prompting", "risk"]
  },

  // ───────── Derecho Laboral ─────────
  {
    id: "laboral-demanda-despido",
    nombre: "Demanda por despido arbitrario / nulo / fraudulento",
    rama: "Derecho Laboral",
    descripcion: "Acción judicial que cuestiona la legalidad o validez del despido y reclama reposición o indemnización.",
    cuandoUsarlo:
      "Dentro del plazo de caducidad, cuando el despido carece de causa justa, viola derechos fundamentales o fue fabricado sin procedimiento previo.",
    consejosDePrompting: [
      "Distingue siempre: despido nulo (lista cerrada), arbitrario, incausado y fraudulento — las pretensiones cambian.",
      "Vincula los hechos con la causal precisa de la ley local (LPCL, CST, LFT, LCT).",
      "Cuantifica conceptos remunerativos y no remunerativos por separado.",
      "Identifica si procede vía de reposición constitucional (amparo) o solo indemnización."
    ],
    erroresFrequentes: [
      "Confundir despido nulo con fraudulento (las consecuencias procesales difieren).",
      "Cuantificar globalmente sin desagregar por concepto y periodo.",
      "No anexar boletas, contratos y constancia de afiliación que prueben el vínculo."
    ],
    frameworksRecomendados: ["demanda-lab", "irac-prompting", "matrix"]
  },
  {
    id: "laboral-carta-despido",
    nombre: "Carta de imputación y de despido",
    rama: "Derecho Laboral",
    descripcion: "Comunicaciones formales del empleador que sustentan un despido por falta grave con procedimiento previo.",
    cuandoUsarlo:
      "Cuando el empleador detecta una falta grave y necesita cumplir el procedimiento sancionatorio (carta de preaviso + descargo + carta de despido) antes de extinguir el vínculo.",
    consejosDePrompting: [
      "Pide que la carta de imputación describa hechos específicos, fechas, lugares y normativa interna vulnerada.",
      "Otorga el plazo legal mínimo para el descargo y consígnalo expresamente.",
      "Vincula la falta con el literal exacto del Código del Trabajo o del Reglamento Interno.",
      "La carta de despido debe analizar el descargo del trabajador, no ignorarlo."
    ],
    erroresFrequentes: [
      "Imputar 'incumplimiento de funciones' sin describir conductas concretas.",
      "Sancionar sin otorgar el plazo legal para el descargo.",
      "Despedir sin pronunciarse sobre el descargo presentado por el trabajador."
    ],
    frameworksRecomendados: ["clause", "comply", "prompt-safe"]
  },
  {
    id: "laboral-convenio-colectivo",
    nombre: "Convenio colectivo de trabajo",
    rama: "Derecho Laboral",
    descripcion: "Acuerdo entre empleador y sindicato que regula condiciones de trabajo y vigencia plurianual.",
    cuandoUsarlo:
      "Al cierre de una negociación colectiva, para formalizar el acuerdo y darle eficacia normativa frente a todos los trabajadores del ámbito.",
    consejosDePrompting: [
      "Separa cláusulas económicas, normativas y obligacionales: tienen distinta vigencia y tratamiento tributario.",
      "Pide cláusula de paz social y procedimiento de solución de controversias durante la vigencia.",
      "Incluye cláusulas gatillo o de revisión por inflación cuando el contexto macro lo justifique.",
      "Anexa el ámbito de aplicación (subjetivo, territorial, funcional) sin ambigüedades."
    ],
    erroresFrequentes: [
      "Mezclar cláusulas económicas con normativas sin distinguir vigencia.",
      "Omitir el procedimiento de solución de controversias intra-vigencia.",
      "Definir el ámbito de aplicación de forma imprecisa, generando litigios."
    ],
    frameworksRecomendados: ["cct-negocia", "race-juridico", "policy"]
  },
  {
    id: "laboral-acta-conciliacion",
    nombre: "Acta de conciliación laboral",
    rama: "Derecho Laboral",
    descripcion: "Documento que recoge el acuerdo de partes ante autoridad administrativa o judicial, con efecto de cosa juzgada.",
    cuandoUsarlo:
      "En audiencia de conciliación (administrativa o judicial), cuando las partes llegan a un acuerdo total o parcial sobre las pretensiones.",
    consejosDePrompting: [
      "Liquida cada concepto por separado (remuneraciones, CTS, gratificaciones, indemnizaciones).",
      "Verifica que no se transen derechos irrenunciables del trabajador.",
      "Define forma y plazos de pago concretos, no genéricos ('a la brevedad').",
      "Consigna expresamente que el acuerdo homologado tiene eficacia de cosa juzgada."
    ],
    erroresFrequentes: [
      "Redactar acuerdos que renuncian a derechos irrenunciables.",
      "No detallar conceptos ni periodos liquidados.",
      "Omitir la cláusula de eficacia de cosa juzgada del acuerdo."
    ],
    frameworksRecomendados: ["audiencia-lab", "clause", "comply"]
  },

  // ───────── Derecho Administrativo ─────────
  {
    id: "adm-recurso-reconsideracion",
    nombre: "Recurso de reconsideración",
    rama: "Derecho Administrativo",
    descripcion: "Impugnación ante la misma autoridad que dictó el acto, fundada en nueva prueba o vicios del acto.",
    cuandoUsarlo:
      "Cuando hay nueva prueba que no estuvo disponible al momento del acto, o cuando se quiere atacar la validez del acto antes de agotar la vía.",
    consejosDePrompting: [
      "Identifica con precisión el acto: número, fecha, autoridad y notificación.",
      "Distingue causales de nulidad (de pleno derecho) de causales de anulabilidad.",
      "Si invocas nueva prueba, descríbela y explica por qué no se aportó antes.",
      "Solicita expresamente la suspensión de la ejecución del acto si causa perjuicio irreparable."
    ],
    erroresFrequentes: [
      "Confundir reconsideración (misma autoridad, nueva prueba) con apelación (jerárquico superior).",
      "Invocar 'nulidad' sin identificar el vicio específico.",
      "Omitir el pedido de suspensión cuando el acto ya se ejecuta."
    ],
    frameworksRecomendados: ["recurso-adm", "irac-prompting", "creac-prompting"]
  },
  {
    id: "adm-demanda-contenciosa",
    nombre: "Demanda contencioso-administrativa",
    rama: "Derecho Administrativo",
    descripcion: "Acción judicial para controlar la legalidad de actos, actuaciones u omisiones de la administración.",
    cuandoUsarlo:
      "Una vez agotada la vía administrativa (o cuando se dispensa), dentro del plazo de caducidad legal.",
    consejosDePrompting: [
      "Verifica el agotamiento de vía o la causal de dispensa antes de demandar.",
      "Diferencia pretensión de nulidad (solo invalida el acto) de plena jurisdicción (además restablece el derecho).",
      "Si hay urgencia, plantea medida cautelar con los tres requisitos: apariencia, peligro, proporcionalidad.",
      "Cita el expediente administrativo completo como prueba documental clave."
    ],
    erroresFrequentes: [
      "Demandar sin agotar vía administrativa cuando no concurre causal de dispensa.",
      "Pretender solo nulidad cuando se requiere también restablecimiento.",
      "Omitir medida cautelar y permitir que el acto se consume."
    ],
    frameworksRecomendados: ["pca", "creac-prompting", "matrix"]
  },
  {
    id: "adm-silencio-positivo",
    nombre: "Declaración jurada de silencio administrativo positivo",
    rama: "Derecho Administrativo",
    descripcion: "Documento que invoca la aprobación automática de una solicitud por inacción de la administración.",
    cuandoUsarlo:
      "Cuando el plazo legal venció sin pronunciamiento y el procedimiento está en la lista del silencio positivo del TUPA.",
    consejosDePrompting: [
      "Antes de invocar silencio positivo, confirma que el procedimiento está en la lista legal.",
      "Acompaña el cargo de presentación de la solicitud original y de los escritos posteriores.",
      "Indica la base normativa exacta (artículo de la ley de procedimiento administrativo).",
      "Solicita a la entidad la emisión del documento que materialice la aprobación."
    ],
    erroresFrequentes: [
      "Asumir silencio positivo en procedimientos que afectan terceros o interés público.",
      "Contar plazos en días calendario en lugar de días hábiles.",
      "No conservar cargos de presentación que prueben la inactividad."
    ],
    frameworksRecomendados: ["silencio-adm", "comply", "prompt-safe"]
  },
  {
    id: "adm-descargo-sancionador",
    nombre: "Descargo en procedimiento administrativo sancionador",
    rama: "Derecho Administrativo",
    descripcion: "Escrito de defensa frente a imputaciones de la administración por presunta infracción.",
    cuandoUsarlo:
      "Recibida la imputación de cargos, dentro del plazo legal, para ejercer el derecho de defensa antes de la decisión sancionatoria.",
    consejosDePrompting: [
      "Aborda primero los vicios de procedimiento (notificación, competencia, plazo).",
      "Niega o explica cada hecho imputado, no respondas en bloque.",
      "Invoca principios sancionadores: tipicidad, legalidad, culpabilidad, proporcionalidad, non bis in idem.",
      "Ofrece prueba que desvirtúe los elementos de la infracción imputada."
    ],
    erroresFrequentes: [
      "Responder genéricamente sin atacar cada hecho imputado.",
      "Olvidar argumentar tipicidad estricta (la conducta debe coincidir con el tipo).",
      "No solicitar variación de la calificación cuando los hechos no encajan con la infracción imputada."
    ],
    frameworksRecomendados: ["recurso-adm", "defensa", "irac-prompting"]
  },

  // ───────── Protección de Datos Personales ─────────
  {
    id: "privacidad-aviso",
    nombre: "Aviso de privacidad / política de privacidad",
    rama: "Protección de Datos Personales",
    descripcion: "Documento informativo dirigido a titulares sobre cómo se tratan sus datos personales.",
    cuandoUsarlo:
      "Antes de recolectar datos personales, en formularios, sitios web, apps y cualquier punto de contacto con titulares.",
    consejosDePrompting: [
      "Lista finalidades primarias y secundarias por separado, con opt-in para las secundarias.",
      "Indica base legal por finalidad (consentimiento, contrato, obligación legal, interés legítimo).",
      "Describe transferencias internacionales con país de destino y garantía aplicada.",
      "Habilita un canal claro y operativo para el ejercicio de derechos del titular.",
      "Pide redacción en lenguaje claro: nivel de lectura B1/B2."
    ],
    erroresFrequentes: [
      "Listar finalidades genéricas como 'mejorar el servicio'.",
      "Pedir consentimiento global cuando la ley exige granularidad.",
      "No diferenciar transferencia internacional de remisión a encargado."
    ],
    frameworksRecomendados: ["politica-priv", "policy", "dpo-prompt"]
  },
  {
    id: "privacidad-rat",
    nombre: "Registro de actividades de tratamiento (RAT)",
    rama: "Protección de Datos Personales",
    descripcion: "Inventario operativo y vivo de los tratamientos de datos personales de la organización.",
    cuandoUsarlo:
      "Como obligación de accountability del responsable y del encargado; base para auditorías, DPIA y respuesta a la autoridad.",
    consejosDePrompting: [
      "Una fila por tratamiento, no por sistema: el mismo CRM puede tener varios tratamientos distintos.",
      "Incluye categorías de titulares, categorías de datos, finalidad, base legal y retención.",
      "Mapea encargados y subencargados con país y garantía de transferencia.",
      "Versiona el RAT con fecha y responsable de cada actualización."
    ],
    erroresFrequentes: [
      "Confundir el RAT con el aviso de privacidad: el primero es operativo, el segundo informativo.",
      "Crear el RAT una vez y no mantenerlo vivo.",
      "Listar sistemas en lugar de tratamientos."
    ],
    frameworksRecomendados: ["auditoria-dp", "audit", "matrix"]
  },
  {
    id: "privacidad-arco",
    nombre: "Respuesta a ejercicio de derechos ARCO",
    rama: "Protección de Datos Personales",
    descripcion: "Comunicación motivada al titular sobre el resultado de su solicitud de acceso, rectificación, cancelación u oposición.",
    cuandoUsarlo:
      "Dentro del plazo legal desde la recepción de la solicitud (variable por país), tras acreditar la identidad del solicitante.",
    consejosDePrompting: [
      "Verifica la acreditación del titular antes de cualquier acción sobre los datos.",
      "Diferencia derechos: oposición ≠ cancelación ≠ derecho al olvido.",
      "Si niegas o limitas, fundamenta en una norma específica y describe la vía de reclamo ante la autoridad.",
      "Documenta el caso (solicitud, respuesta, acciones) para acreditar diligencia ante la autoridad."
    ],
    erroresFrequentes: [
      "Responder fuera del plazo legal sin justificar prórroga.",
      "Confundir oposición con cancelación.",
      "Denegar sin fundamento normativo ni indicación de la vía de reclamo."
    ],
    frameworksRecomendados: ["arco", "dpo-prompt", "prompt-safe"]
  },
  {
    id: "privacidad-dpa",
    nombre: "Acuerdo de tratamiento de datos (DPA)",
    rama: "Protección de Datos Personales",
    descripcion: "Anexo contractual entre responsable y encargado que regula el tratamiento por cuenta ajena.",
    cuandoUsarlo:
      "Siempre que un proveedor trate datos personales por instrucciones del cliente (cloud, marketing, payroll, soporte, etc.).",
    consejosDePrompting: [
      "Define con precisión rol de cada parte, objeto, duración, naturaleza, finalidad y categorías de datos.",
      "Regula expresamente subencargados: aprobación, lista, derecho de objeción.",
      "Incluye obligaciones técnicas y organizativas mínimas verificables (no solo 'medidas razonables').",
      "Anexa la cláusula de transferencia internacional aplicable (cláusulas modelo, BCR, decisión de adecuación)."
    ],
    erroresFrequentes: [
      "DPA copiado del RGPD sin adaptación a ley local.",
      "Omitir el régimen de subencargados.",
      "Medidas técnicas redactadas en abstracto, sin auditabilidad."
    ],
    frameworksRecomendados: ["tech-contract", "clause", "comply"]
  },

  // ───────── Derecho Digital e IA ─────────
  {
    id: "digital-contrato-saas",
    nombre: "Contrato SaaS",
    rama: "Derecho Digital e IA",
    descripcion: "Contrato de prestación de software como servicio con licenciamiento, SLA y tratamiento de datos.",
    cuandoUsarlo:
      "Para licenciar plataformas cloud B2B donde el proveedor mantiene control sobre la infraestructura y los datos del cliente residen en sus servidores.",
    consejosDePrompting: [
      "Define el SLA con indicadores medibles (uptime, RTO, RPO) y créditos por incumplimiento.",
      "Regula propiedad intelectual del software base y de desarrollos a medida por separado.",
      "Anexa DPA y lista de subprocesadores con país y certificaciones.",
      "Pide cláusula de salida (exit) con portabilidad de datos en formato abierto y eliminación certificada.",
      "Equilibra topes de responsabilidad con carve-outs para datos, IP y confidencialidad."
    ],
    erroresFrequentes: [
      "Topes de responsabilidad ridículos frente al valor del dato del cliente.",
      "Olvidar la cláusula de exit y dejar al cliente capturado en la plataforma.",
      "Pactar 'mejores esfuerzos' en SLA en lugar de métricas verificables."
    ],
    frameworksRecomendados: ["tech-contract", "clause", "ciro-contractual"]
  },
  {
    id: "digital-dpia-ia",
    nombre: "DPIA para sistema de IA",
    rama: "Derecho Digital e IA",
    descripcion: "Evaluación de impacto en privacidad y derechos fundamentales aplicada a un sistema algorítmico.",
    cuandoUsarlo:
      "Antes de desplegar un sistema de IA que tome decisiones automatizadas significativas o trate categorías especiales de datos a escala.",
    consejosDePrompting: [
      "Documenta alternativas menos intrusivas evaluadas y descartadas (necesidad).",
      "Analiza riesgos algorítmicos: sesgo, opacidad, error, deriva, efectos sobre derechos.",
      "Diseña medidas: explicabilidad, supervisión humana real, recurso del titular, segregación de datos.",
      "Pide la ficha del modelo (model card) y métricas de desempeño por subgrupo."
    ],
    erroresFrequentes: [
      "Convertir la DPIA en checklist sin análisis de riesgo real.",
      "No documentar el descarte de alternativas menos invasivas.",
      "Omitir el derecho del titular a no estar sujeto a decisiones automatizadas significativas."
    ],
    frameworksRecomendados: ["dpia-ia", "dpia-prompt", "redteam-legal-ia"]
  },
  {
    id: "digital-politica-ia-interna",
    nombre: "Política de uso aceptable de IA",
    rama: "Derecho Digital e IA",
    descripcion: "Norma interna que regula el uso de herramientas de IA generativa por empleados y contratistas.",
    cuandoUsarlo:
      "Antes o durante la adopción organizacional de IA generativa, para fijar límites, casos de uso permitidos y procedimientos de revisión.",
    consejosDePrompting: [
      "Lista usos permitidos, condicionados y prohibidos con ejemplos concretos por área.",
      "Prohíbe expresamente subir datos confidenciales, personales sensibles o de clientes a herramientas no aprobadas.",
      "Define responsable de revisión humana de todo output que se use externamente.",
      "Incluye procedimiento para evaluar y aprobar nuevas herramientas (vendor risk + DPIA si aplica)."
    ],
    erroresFrequentes: [
      "Política filosófica sin reglas operativas ni ejemplos.",
      "Confiar en la conciencia del usuario para no subir datos sensibles, sin controles técnicos.",
      "No actualizar la política cuando aparece una nueva categoría de herramienta."
    ],
    frameworksRecomendados: ["policy", "politica-corp", "ai-comply"]
  },
  {
    id: "digital-ai-compliance-analysis",
    nombre: "Análisis de cumplimiento de sistema de IA",
    rama: "Derecho Digital e IA",
    descripcion: "Diagnóstico de un sistema de IA frente a regulaciones aplicables (AI Act, ley local sectorial).",
    cuandoUsarlo:
      "Antes de lanzamiento, en revisiones periódicas o ante cambios sustanciales del sistema, dataset o uso pretendido.",
    consejosDePrompting: [
      "Clasifica por uso pretendido, no solo por tecnología: el mismo modelo puede ser distinto riesgo según uso.",
      "Identifica el rol exacto (proveedor, desplegador, importador, distribuidor) y sus obligaciones específicas.",
      "Audita el dataset: origen, licencias, sesgos detectados, mitigaciones aplicadas.",
      "Define mecanismos de reporte de incidentes graves a la autoridad."
    ],
    erroresFrequentes: [
      "Confundir documentación técnica con gobernanza efectiva.",
      "Clasificar el sistema solo por la tecnología, ignorando el uso pretendido.",
      "No prever proceso operativo de detección y reporte de incidentes."
    ],
    frameworksRecomendados: ["ai-comply", "audit", "matrix"]
  },

  // ───────── Arbitraje ─────────
  {
    id: "arbitraje-clausula",
    nombre: "Cláusula arbitral",
    rama: "Arbitraje",
    descripcion: "Pacto contractual por el cual las partes someten a arbitraje sus controversias futuras.",
    cuandoUsarlo:
      "En contratos comerciales internacionales o domésticos donde se prefiera arbitraje sobre jurisdicción ordinaria, especialmente cross-border.",
    consejosDePrompting: [
      "Define con precisión: institución, sede, idioma, ley aplicable al fondo, número de árbitros.",
      "Distingue ley de la sede (curial) de ley del fondo del contrato.",
      "Evita 'cláusulas patológicas' que mezclen instituciones inexistentes o referencias ambiguas.",
      "Considera cláusulas multinivel (negociación → mediación → arbitraje) con plazos definidos."
    ],
    erroresFrequentes: [
      "Cláusulas patológicas que referencian instituciones inexistentes o ambiguas.",
      "No distinguir ley de la sede de ley del fondo.",
      "Omitir el número y método de designación de árbitros."
    ],
    frameworksRecomendados: ["clause", "ciro-contractual", "demanda-arb"]
  },
  {
    id: "arbitraje-solicitud",
    nombre: "Solicitud / demanda arbitral",
    rama: "Arbitraje",
    descripcion: "Acto procesal que da inicio al arbitraje y delimita las pretensiones de la parte solicitante.",
    cuandoUsarlo:
      "Cuando ha surgido la controversia, dentro del plazo aplicable, conforme al reglamento institucional o a la cláusula ad hoc.",
    consejosDePrompting: [
      "Transcribe la cláusula arbitral completa y vincula la controversia con su alcance.",
      "Identifica institución, sede, derecho aplicable al fondo y número de árbitros.",
      "Cuantifica las pretensiones desde la solicitud para efectos de costas y caución.",
      "Si hay urgencia, considera árbitro de emergencia o medida cautelar pre-arbitral."
    ],
    erroresFrequentes: [
      "Solicitar arbitraje ante la institución incorrecta por desconocer la cláusula.",
      "No distinguir ley de la sede de ley del fondo.",
      "Pretensiones sin cuantificación que dificulten la admisión y el cálculo de costas."
    ],
    frameworksRecomendados: ["demanda-arb", "race-juridico", "matrix"]
  },
  {
    id: "arbitraje-memorial-demanda",
    nombre: "Memorial de demanda",
    rama: "Arbitraje",
    descripcion: "Escrito de fondo que estructura los hechos, los issues, los argumentos jurídicos y la cuantificación.",
    cuandoUsarlo:
      "Tras la constitución del tribunal y según el calendario procesal, como pieza central de la posición de la parte demandante.",
    consejosDePrompting: [
      "Estructura por issues, no por capítulos narrativos: facilita la decisión del tribunal.",
      "Cada argumento debe seguir IRAC: regla aplicable + aplicación a hechos + autoridad citada.",
      "Cuantifica con metodología explícita (DCF, costos incurridos, lucro cesante) y perito independiente.",
      "Cita autoridades con pinpoint (página, párrafo) y acompaña los documentos en el bundle."
    ],
    erroresFrequentes: [
      "Memoriales narrativos sin estructura por issue.",
      "Citar autoridades sin pinpoint y sin acompañar el documento.",
      "Cuantificar sin perito en arbitrajes de cuantía relevante."
    ],
    frameworksRecomendados: ["memorial", "creac-prompting", "irac-prompting"]
  },
  {
    id: "arbitraje-excepcion-competencia",
    nombre: "Excepción de incompetencia",
    rama: "Arbitraje",
    descripcion: "Defensa que cuestiona la jurisdicción del tribunal arbitral en virtud del principio kompetenz-kompetenz.",
    cuandoUsarlo:
      "En la primera intervención de la parte demandada, bajo protesta y reserva, para no convalidar tácitamente la competencia.",
    consejosDePrompting: [
      "Identifica el defecto específico: inexistencia, nulidad, ineficacia o inaplicabilidad del convenio.",
      "Determina la ley aplicable al convenio arbitral, que puede diferir de la ley del fondo.",
      "Distingue nulidad del contrato principal de nulidad del convenio arbitral (principio de separabilidad).",
      "Contesta el fondo bajo reserva expresa para no convalidar la competencia."
    ],
    erroresFrequentes: [
      "Contestar el fondo sin reserva y convalidar tácitamente la competencia.",
      "Confundir nulidad del contrato con nulidad del convenio arbitral.",
      "No identificar la ley aplicable al convenio arbitral."
    ],
    frameworksRecomendados: ["excepcion-comp", "irac-prompting", "creac-prompting"]
  },

  // ───────── Compliance corporativo ─────────
  {
    id: "compliance-matriz-riesgos",
    nombre: "Matriz de riesgos de cumplimiento",
    rama: "Compliance corporativo",
    descripcion: "Mapa de riesgos por proceso con probabilidad, impacto, controles existentes y plan de remediación.",
    cuandoUsarlo:
      "Como base del programa de cumplimiento, revisada al menos anualmente y ante cambios materiales del negocio o regulación.",
    consejosDePrompting: [
      "Documenta criterios de calificación (probabilidad e impacto) antes de poblar la matriz.",
      "Diferencia riesgo inherente, residual y objetivo.",
      "Cada control debe tener diseño y prueba de operación, no solo existencia formal.",
      "Define KRIs medibles mensualmente, no anualmente."
    ],
    erroresFrequentes: [
      "Calificar probabilidad e impacto sin criterios documentados.",
      "Confundir riesgo residual con riesgo objetivo.",
      "Controles que solo se evalúan en diseño, nunca en operación."
    ],
    frameworksRecomendados: ["matriz-riesgo", "matrix", "risk"]
  },
  {
    id: "compliance-due-diligence",
    nombre: "Informe de due diligence",
    rama: "Compliance corporativo",
    descripcion: "Investigación reputacional, legal y operativa de contraparte, tercero o target de inversión.",
    cuandoUsarlo:
      "Antes de M&A, onboarding de proveedores críticos o gestores, nombramiento de directivos, o entrada a nuevos mercados.",
    consejosDePrompting: [
      "Identifica beneficiario final, no te quedes en el accionista de fachada.",
      "Consulta fuentes en idioma local y listas de sanciones (OFAC, ONU, UE, locales).",
      "Diferencia menciones mediáticas de investigaciones formales y de sentencias firmes.",
      "Cada hallazgo debe tener trazabilidad: fecha de consulta, fuente, captura, evaluación de severidad."
    ],
    erroresFrequentes: [
      "Concluir 'sin hallazgos' tras consultar solo fuentes en un idioma.",
      "Tratar toda mención mediática como hallazgo material.",
      "No exigir trazabilidad documental por cada hallazgo."
    ],
    frameworksRecomendados: ["due-diligence", "audit", "matrix"]
  },
  {
    id: "compliance-politica-anticorrupcion",
    nombre: "Política anticorrupción",
    rama: "Compliance corporativo",
    descripcion: "Norma interna que prohíbe y previene actos de corrupción pública y privada, incluyendo terceros.",
    cuandoUsarlo:
      "Como pieza central del modelo de prevención (FCPA, UK Bribery Act, leyes locales tipo Ley 30424 Perú, Ley 27.401 Argentina, etc.).",
    consejosDePrompting: [
      "Define con ejemplos: regalos, atenciones, viajes, donaciones, contribuciones políticas, pagos de facilitación.",
      "Fija topes monetarios y procedimientos de aprobación y registro.",
      "Regula terceros (gestores, intermediarios, agentes) con DD obligatoria y cláusulas contractuales.",
      "Articula canal de denuncias, antirrepresalia y proceso de investigación interna.",
      "Define sanciones graduadas y respeto al debido proceso interno."
    ],
    erroresFrequentes: [
      "Prohibir genéricamente sin definir tipos de conducta ni ejemplos.",
      "No regular pagos de facilitación (que algunas leyes prohíben de forma absoluta).",
      "Canal de denuncias gestionado por el área a la que se denuncia."
    ],
    frameworksRecomendados: ["politica-corp", "policy", "comply"]
  },
  {
    id: "compliance-manual-prevencion-delitos",
    nombre: "Manual de prevención de delitos / programa de cumplimiento",
    rama: "Compliance corporativo",
    descripcion: "Documento maestro del modelo de prevención que articula gobernanza, riesgos, controles y monitoreo.",
    cuandoUsarlo:
      "Para implementar o renovar un modelo de cumplimiento que sirva como defensa de la persona jurídica frente a responsabilidad penal corporativa.",
    consejosDePrompting: [
      "Mapea delitos imputables a la persona jurídica según la ley aplicable (cada país tiene su catálogo).",
      "Define gobernanza por tres líneas: 1L negocio, 2L compliance, 3L auditoría interna.",
      "Articula el rol del oficial de cumplimiento con independencia, recursos y acceso directo al directorio.",
      "Incluye plan de monitoreo, capacitación, evaluación de efectividad y mejora continua.",
      "Documenta el proceso de gestión de denuncias e investigaciones internas con garantías."
    ],
    erroresFrequentes: [
      "Copiar manuales genéricos sin mapear los delitos aplicables localmente.",
      "Oficial de cumplimiento sin independencia ni acceso al directorio.",
      "Programa que no se evalúa periódicamente en su efectividad."
    ],
    frameworksRecomendados: ["politica-corp", "comply", "audit"]
  }
];

export function getProductsByRama(rama: RamaJuridica): LegalProduct[] {
  return legalProducts.filter((product) => product.rama === rama);
}

export function findProduct(id: string): LegalProduct | undefined {
  return legalProducts.find((product) => product.id === id);
}
