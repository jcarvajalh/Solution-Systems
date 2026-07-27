export type ModuleId =
  | "financial"
  | "accounts"
  | "human"
  | "operational"
  | "niif"
  | "risk"
  | "security"
  | "audit";

export type IconName =
  | "circle-dollar-sign"
  | "users"
  | "square-user"
  | "settings"
  | "triangle-alert"
  | "shield-check"
  | "file-plus"
  | "search";

/** `critical` reproduce la fila de indicadores en rojo del diseño. */
export type KpiTone = "brand" | "critical";

export interface Kpi {
  /** Ya viene formateado: son datos de demostración, no se calculan. */
  value: string;
  label: string;
  tone: KpiTone;
}

export interface BarSeries {
  name: string;
  values: number[];
}

export interface BarChartData {
  title: string;
  /** Etiqueta del eje vertical. */
  unit: string;
  categories: string[];
  series: BarSeries[];
}

export interface DonutSlice {
  name: string;
  value: number;
}

export interface DonutChartData {
  title: string;
  slices: DonutSlice[];
}

export interface ModuleDashboard {
  asOfDate: string;
  primaryKpis: Kpi[];
  secondaryKpis: Kpi[];
  bar: BarChartData;
  donut: DonutChartData;
}

export interface AppModule {
  id: ModuleId;
  label: string;
  icon: IconName;
  /** Título que muestra la barra de la ventana. */
  windowTitle: string;
  dashboard: ModuleDashboard;
}
