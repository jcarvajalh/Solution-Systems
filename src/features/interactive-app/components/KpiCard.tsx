import type { Kpi } from "../types";

export interface KpiCardProps {
  kpi: Kpi;
}

export default function KpiCard({ kpi }: KpiCardProps) {
  return (
    <div className="rounded-[4px] border border-black/10 bg-white px-2 py-2.5 text-center">
      <p
        className={`text-[13px] font-semibold ${
          kpi.tone === "critical" ? "text-critical" : "text-brand"
        }`}
      >
        {kpi.value}
      </p>
      <p className="mt-0.5 text-[9px] leading-tight text-black/55">
        {kpi.label}
      </p>
    </div>
  );
}
