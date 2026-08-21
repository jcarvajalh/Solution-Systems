import type { AppModule } from "../types";

/**
 * DATOS DE DEMOSTRACIÓN — no son cifras reales de Solution Systems ni de ningún
 * cliente. Existen solo para que la maqueta interactiva del sitio tenga algo que
 * mostrar y están pensados para reemplazarse por contenido real (o por capturas)
 * sin tocar los componentes: basta con sustituir este archivo.
 *
 * Los cuatro módulos y su orden vienen de contenido.md: Financial · Accounts ·
 * Human · Risk.
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
];

export const defaultModuleId = appModules[0]!.id;
