import type { ModuleDashboard } from "../types";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import KpiCard from "./KpiCard";

export interface DashboardProps {
  dashboard: ModuleDashboard;
}

export default function Dashboard({ dashboard }: DashboardProps) {
  return (
    <div className="space-y-3 p-3 sm:p-4">
      <p className="flex items-center gap-4 text-[10px] text-black/60">
        <span className="font-semibold text-black/80">Fecha de corte</span>
        {dashboard.asOfDate}
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {dashboard.primaryKpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-2 lg:grid-cols-2">
        <BarChart data={dashboard.bar} />
        <DonutChart data={dashboard.donut} />
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {dashboard.secondaryKpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>
    </div>
  );
}
