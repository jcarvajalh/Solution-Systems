export { default as InteractiveApp } from "./components/InteractiveApp";
export { useInteractiveApp } from "./hooks/useInteractiveApp";
export { appModules, defaultModuleId } from "./lib";
export { activeModuleId } from "./stores";
export type {
  AppModule,
  BarChartData,
  DonutChartData,
  Kpi,
  ModuleDashboard,
  ModuleId,
} from "./types";
