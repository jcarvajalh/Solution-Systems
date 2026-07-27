import { formatNumber, niceAxisMax } from "../lib";
import { seriesColor } from "../lib/chart-palette";
import type { BarChartData } from "../types";

const VIEW = { width: 460, height: 262 };
const PAD = { top: 34, right: 8, bottom: 42, left: 56 };
const PLOT = {
  width: VIEW.width - PAD.left - PAD.right,
  height: VIEW.height - PAD.top - PAD.bottom,
};

const BAR_WIDTH = 22;
/** Separación de 2px entre rellenos contiguos. */
const BAR_GAP = 2;
const CORNER = 4;
const GRID_STEPS = 6;

/** Barra con las esquinas superiores redondeadas y la base anclada al eje. */
function barPath(x: number, y: number, width: number, height: number): string {
  const r = Math.min(CORNER, height, width / 2);
  const bottom = y + height;

  return [
    `M${x},${bottom}`,
    `L${x},${y + r}`,
    `Q${x},${y} ${x + r},${y}`,
    `L${x + width - r},${y}`,
    `Q${x + width},${y} ${x + width},${y + r}`,
    `L${x + width},${bottom}`,
    "Z",
  ].join(" ");
}

export interface BarChartProps {
  data: BarChartData;
}

export default function BarChart({ data }: BarChartProps) {
  const { categories, series, unit, title } = data;

  const maxValue = Math.max(...series.flatMap((entry) => entry.values), 0);
  const axisMax = niceAxisMax(maxValue, GRID_STEPS);
  const slotWidth = PLOT.width / categories.length;
  const groupWidth = series.length * BAR_WIDTH + (series.length - 1) * BAR_GAP;
  const baseline = PAD.top + PLOT.height;

  const yFor = (value: number) => baseline - (value / axisMax) * PLOT.height;

  return (
    <figure className="flex h-full flex-col rounded-[4px] border border-black/10 bg-white p-3">
      <figcaption className="text-center text-[11px] font-semibold text-black">
        {title}
      </figcaption>

      <ul className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {series.map((entry, index) => (
          <li
            key={entry.name}
            className="flex items-center gap-1 text-[9px] text-black/60"
          >
            <span
              className="size-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: seriesColor(index) }}
            />
            {entry.name}
          </li>
        ))}
      </ul>

      <svg
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        className="mt-1 w-full flex-1"
        role="img"
        aria-label={`${title}. Valores en ${unit}. Consulta la tabla equivalente para el detalle.`}
      >
        {/* Rejilla y escala, deliberadamente discretas */}
        {Array.from({ length: GRID_STEPS + 1 }, (_, step) => {
          const value = (axisMax / GRID_STEPS) * step;
          const y = yFor(value);

          return (
            <g key={step}>
              <line
                x1={PAD.left}
                x2={PAD.left + PLOT.width}
                y1={y}
                y2={y}
                stroke="rgb(0 0 0 / 0.08)"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-black/45 text-[8px]"
              >
                {formatNumber(value)}
              </text>
            </g>
          );
        })}

        <text
          transform={`rotate(-90 12 ${PAD.top + PLOT.height / 2})`}
          x={12}
          y={PAD.top + PLOT.height / 2}
          textAnchor="middle"
          className="fill-black/45 text-[8px]"
        >
          {unit}
        </text>

        {categories.map((category, categoryIndex) => {
          const slotStart = PAD.left + slotWidth * categoryIndex;
          const groupStart = slotStart + (slotWidth - groupWidth) / 2;

          return (
            <g key={category}>
              {series.map((entry, seriesIndex) => {
                const value = entry.values[categoryIndex] ?? 0;
                const x = groupStart + seriesIndex * (BAR_WIDTH + BAR_GAP);
                const y = yFor(value);
                const height = baseline - y;

                return (
                  <g
                    key={entry.name}
                    className="transition-opacity hover:opacity-80"
                  >
                    <title>{`${entry.name} · ${category}: ${formatNumber(value)}`}</title>
                    {height > 0 && (
                      <path
                        d={barPath(x, y, BAR_WIDTH, height)}
                        fill={seriesColor(seriesIndex)}
                      />
                    )}
                    <text
                      x={x + BAR_WIDTH / 2}
                      y={y - 5}
                      textAnchor="middle"
                      className="fill-black/70 text-[8px]"
                    >
                      {formatNumber(value)}
                    </text>
                  </g>
                );
              })}

              <text
                x={slotStart + slotWidth / 2}
                y={baseline + 16}
                textAnchor="middle"
                className="fill-black/55 text-[8px]"
              >
                {category}
              </text>
            </g>
          );
        })}

        <line
          x1={PAD.left}
          x2={PAD.left + PLOT.width}
          y1={baseline}
          y2={baseline}
          stroke="rgb(0 0 0 / 0.2)"
          strokeWidth={1}
        />
      </svg>

      {/* Alternativa textual: la gráfica no puede ser la única vía al dato. */}
      <table className="sr-only">
        <caption>{`${title} (${unit})`}</caption>
        <thead>
          <tr>
            <th scope="col">Periodo</th>
            {series.map((entry) => (
              <th key={entry.name} scope="col">
                {entry.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, categoryIndex) => (
            <tr key={category}>
              <th scope="row">{category}</th>
              {series.map((entry) => (
                <td key={entry.name}>
                  {formatNumber(entry.values[categoryIndex] ?? 0)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
