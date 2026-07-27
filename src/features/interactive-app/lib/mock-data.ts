import type { AppModule } from "../types";

/**
 * DATOS DE DEMOSTRACIÓN — no son cifras reales de Solution Systems ni de ningún
 * cliente. Existen solo para que la maqueta interactiva del sitio tenga algo que
 * mostrar y están pensados para reemplazarse por contenido real (o por capturas)
 * sin tocar los componentes: basta con sustituir este archivo.
 *
 * El orden de los módulos y sus etiquetas sí vienen de Figma (node 378:1141).
 */
export const appModules: AppModule[] = [
  {
    id: "financial",
    label: "Financial",
    icon: "circle-dollar-sign",
    windowTitle: "Financial solution",
    dashboard: {
      asOfDate: "18/06/2026",
      primaryKpis: [
        { value: "$ 131.013", label: "Cartera bruta", tone: "brand" },
        { value: "$ 2.418", label: "Cartera en mora", tone: "brand" },
        { value: "$ 1.106", label: "Cartera vencida > 30 días", tone: "brand" },
        { value: "$ 0", label: "Cobertura de cartera vencida", tone: "brand" },
        { value: "$ 48.771", label: "Disponible préstamos", tone: "brand" },
      ],
      secondaryKpis: [
        { value: "$ 378.199", label: "Patrimonio técnico", tone: "critical" },
        { value: "$ 111,99", label: "Relación de solvencia", tone: "critical" },
        { value: "% 7,56", label: "ROE", tone: "critical" },
        { value: "% 6,17", label: "ROA", tone: "critical" },
      ],
      bar: {
        title: "Cartera total",
        unit: "Millones $",
        categories: ["2025-06-30", "2025-12-31", "2026-06-18"],
        series: [
          { name: "Corriente", values: [103039, 122901, 131013] },
          { name: "Mora", values: [1841, 2065, 2418] },
        ],
      },
      donut: {
        title: "Cartera por línea de crédito (millones $)",
        slices: [
          { name: "Fomento", value: 112743 },
          { name: "Redescuento Findeter", value: 13751 },
          { name: "Redescuento Finagro", value: 4513 },
        ],
      },
    },
  },
  {
    id: "accounts",
    label: "Accounts",
    icon: "users",
    windowTitle: "Accounts solution",
    dashboard: {
      asOfDate: "18/06/2026",
      primaryKpis: [
        { value: "24.310", label: "Cuentas activas", tone: "brand" },
        { value: "1.245", label: "Aperturas del mes", tone: "brand" },
        { value: "312", label: "Cancelaciones del mes", tone: "brand" },
        { value: "$ 89.402", label: "Saldo promedio", tone: "brand" },
        { value: "% 92,4", label: "Cuentas conciliadas", tone: "brand" },
      ],
      secondaryKpis: [
        { value: "1.980", label: "Cuentas inactivas", tone: "critical" },
        { value: "146", label: "Pendientes de validación", tone: "critical" },
        { value: "% 3,1", label: "Tasa de abandono", tone: "critical" },
        { value: "18", label: "Casos escalados", tone: "critical" },
      ],
      bar: {
        title: "Cuentas por estado",
        unit: "Cuentas",
        categories: ["2025-06-30", "2025-12-31", "2026-06-18"],
        series: [
          { name: "Activas", values: [19840, 22105, 24310] },
          { name: "Inactivas", values: [2410, 2180, 1980] },
        ],
      },
      donut: {
        title: "Cuentas por tipo de producto",
        slices: [
          { name: "Ahorro", value: 14820 },
          { name: "Corriente", value: 6410 },
          { name: "CDT", value: 3080 },
        ],
      },
    },
  },
  {
    id: "human",
    label: "Human",
    icon: "square-user",
    windowTitle: "Human solution",
    dashboard: {
      asOfDate: "18/06/2026",
      primaryKpis: [
        { value: "486", label: "Empleados activos", tone: "brand" },
        { value: "37", label: "Contrataciones del año", tone: "brand" },
        { value: "$ 1.842", label: "Nómina mensual", tone: "brand" },
        { value: "% 96,8", label: "Asistencia", tone: "brand" },
        { value: "1.240", label: "Horas de formación", tone: "brand" },
      ],
      secondaryKpis: [
        { value: "% 8,4", label: "Rotación anual", tone: "critical" },
        { value: "29", label: "Vacantes abiertas", tone: "critical" },
        { value: "% 2,7", label: "Ausentismo", tone: "critical" },
        { value: "12", label: "Evaluaciones pendientes", tone: "critical" },
      ],
      bar: {
        title: "Plantilla por periodo",
        unit: "Empleados",
        categories: ["2025-06-30", "2025-12-31", "2026-06-18"],
        series: [
          { name: "Directos", values: [372, 398, 421] },
          { name: "Temporales", values: [58, 62, 65] },
        ],
      },
      donut: {
        title: "Plantilla por área",
        slices: [
          { name: "Operaciones", value: 214 },
          { name: "Tecnología", value: 168 },
          { name: "Administración", value: 104 },
        ],
      },
    },
  },
  {
    id: "operational",
    label: "Operational",
    icon: "settings",
    windowTitle: "Operational solution",
    dashboard: {
      asOfDate: "18/06/2026",
      primaryKpis: [
        { value: "128.940", label: "Transacciones del mes", tone: "brand" },
        { value: "% 99,7", label: "Disponibilidad", tone: "brand" },
        { value: "1,4 s", label: "Tiempo medio de respuesta", tone: "brand" },
        { value: "42", label: "Procesos automatizados", tone: "brand" },
        { value: "% 88,2", label: "Procesos sin intervención", tone: "brand" },
      ],
      secondaryKpis: [
        { value: "76", label: "Incidencias abiertas", tone: "critical" },
        { value: "9", label: "Incidencias críticas", tone: "critical" },
        { value: "% 1,8", label: "Reprocesos", tone: "critical" },
        { value: "4 h", label: "Tiempo medio de cierre", tone: "critical" },
      ],
      bar: {
        title: "Volumen transaccional",
        unit: "Miles",
        categories: ["2025-06-30", "2025-12-31", "2026-06-18"],
        series: [
          { name: "En línea", values: [86400, 104200, 118600] },
          { name: "Por lotes", values: [9800, 10100, 10340] },
        ],
      },
      donut: {
        title: "Incidencias por severidad",
        slices: [
          { name: "Baja", value: 44 },
          { name: "Media", value: 23 },
          { name: "Alta", value: 9 },
        ],
      },
    },
  },
  {
    id: "niif",
    label: "NIIF",
    icon: "triangle-alert",
    windowTitle: "NIIF solution",
    dashboard: {
      asOfDate: "18/06/2026",
      primaryKpis: [
        { value: "$ 412.680", label: "Activos NIIF", tone: "brand" },
        { value: "$ 268.140", label: "Pasivos NIIF", tone: "brand" },
        { value: "$ 144.540", label: "Patrimonio NIIF", tone: "brand" },
        { value: "% 99,1", label: "Partidas conciliadas", tone: "brand" },
        { value: "36", label: "Revelaciones emitidas", tone: "brand" },
      ],
      secondaryKpis: [
        {
          value: "$ 3.208",
          label: "Diferencias por ajustar",
          tone: "critical",
        },
        { value: "14", label: "Partidas sin clasificar", tone: "critical" },
        { value: "% 0,9", label: "Desviación local vs NIIF", tone: "critical" },
        { value: "5", label: "Revelaciones pendientes", tone: "critical" },
      ],
      bar: {
        title: "Ajustes por conversión",
        unit: "Millones $",
        categories: ["2025-06-30", "2025-12-31", "2026-06-18"],
        series: [
          { name: "Local", values: [408200, 410900, 412680] },
          { name: "Ajuste NIIF", values: [4120, 3640, 3208] },
        ],
      },
      donut: {
        title: "Activos por clasificación",
        slices: [
          { name: "Costo amortizado", value: 268400 },
          { name: "Valor razonable", value: 102180 },
          { name: "Otros", value: 42100 },
        ],
      },
    },
  },
  {
    id: "risk",
    label: "Risk",
    // Figma reutiliza el icono de Financial en Risk; ver reporte.
    icon: "circle-dollar-sign",
    windowTitle: "Risk solution",
    dashboard: {
      asOfDate: "18/06/2026",
      primaryKpis: [
        { value: "% 4,2", label: "Exposición al riesgo", tone: "brand" },
        { value: "$ 18.420", label: "Provisión constituida", tone: "brand" },
        { value: "% 148,6", label: "Cobertura de provisión", tone: "brand" },
        { value: "1.842", label: "Clientes evaluados", tone: "brand" },
        { value: "% 91,3", label: "Cartera calificada A", tone: "brand" },
      ],
      secondaryKpis: [
        { value: "% 2,9", label: "Cartera calificada D-E", tone: "critical" },
        { value: "64", label: "Alertas SARLAFT", tone: "critical" },
        { value: "11", label: "Operaciones inusuales", tone: "critical" },
        { value: "3", label: "Reportes a la UIAF", tone: "critical" },
      ],
      bar: {
        title: "Cartera por calificación",
        unit: "Millones $",
        categories: ["2025-06-30", "2025-12-31", "2026-06-18"],
        series: [
          { name: "A - B", values: [98420, 116300, 124800] },
          { name: "C - E", values: [6460, 8640, 8630] },
        ],
      },
      donut: {
        title: "Exposición por tipo de riesgo",
        slices: [
          { name: "Crédito", value: 62400 },
          { name: "Liquidez", value: 18900 },
          { name: "Operacional", value: 9200 },
        ],
      },
    },
  },
  {
    id: "security",
    label: "Seguridad",
    icon: "shield-check",
    windowTitle: "Seguridad solution",
    dashboard: {
      asOfDate: "18/06/2026",
      primaryKpis: [
        { value: "% 100", label: "Tráfico sobre HTTPS", tone: "brand" },
        { value: "486", label: "Usuarios con doble factor", tone: "brand" },
        { value: "% 99,9", label: "Copias verificadas", tone: "brand" },
        { value: "24", label: "Auditorías de acceso", tone: "brand" },
        { value: "0", label: "Fugas de información", tone: "brand" },
      ],
      secondaryKpis: [
        { value: "38", label: "Intentos bloqueados", tone: "critical" },
        { value: "6", label: "Vulnerabilidades abiertas", tone: "critical" },
        { value: "2", label: "Severidad alta", tone: "critical" },
        { value: "9", label: "Permisos por revisar", tone: "critical" },
      ],
      bar: {
        title: "Eventos de seguridad",
        unit: "Eventos",
        categories: ["2025-06-30", "2025-12-31", "2026-06-18"],
        series: [
          { name: "Detectados", values: [412, 386, 344] },
          { name: "Bloqueados", values: [398, 372, 338] },
        ],
      },
      donut: {
        title: "Vulnerabilidades por severidad",
        slices: [
          { name: "Baja", value: 21 },
          { name: "Media", value: 12 },
          { name: "Alta", value: 2 },
        ],
      },
    },
  },
  {
    id: "audit",
    label: "Audit",
    icon: "file-plus",
    windowTitle: "Audit solution",
    dashboard: {
      asOfDate: "18/06/2026",
      primaryKpis: [
        { value: "142", label: "Auditorías del año", tone: "brand" },
        { value: "% 94,6", label: "Hallazgos cerrados", tone: "brand" },
        { value: "1.284", label: "Registros trazados", tone: "brand" },
        { value: "% 100", label: "Operaciones con log", tone: "brand" },
        { value: "28", label: "Informes emitidos", tone: "brand" },
      ],
      secondaryKpis: [
        { value: "31", label: "Hallazgos abiertos", tone: "critical" },
        { value: "7", label: "Vencidos", tone: "critical" },
        { value: "% 5,4", label: "Reincidencia", tone: "critical" },
        { value: "12", label: "Planes de acción activos", tone: "critical" },
      ],
      bar: {
        title: "Hallazgos por periodo",
        unit: "Hallazgos",
        categories: ["2025-06-30", "2025-12-31", "2026-06-18"],
        series: [
          { name: "Cerrados", values: [186, 214, 248] },
          { name: "Abiertos", values: [42, 38, 31] },
        ],
      },
      donut: {
        title: "Hallazgos por origen",
        slices: [
          { name: "Interna", value: 168 },
          { name: "Externa", value: 62 },
          { name: "Regulatoria", value: 49 },
        ],
      },
    },
  },
];

export const defaultModuleId = appModules[0]!.id;
