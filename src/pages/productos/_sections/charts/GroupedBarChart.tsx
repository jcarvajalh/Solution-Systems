import { formatNumber } from "@features/interactive-app/lib";
import { chartColor } from "./palette";

/*
  Recreación vectorial de las gráficas de barras del dashboard IAS Financial
  (antes capturas). Estática: se renderiza en el servidor sin isla de React, así
  que no envía JavaScript al cliente. Reutiliza la paleta y el formateo de la
  librería `interactive-app`; a diferencia del `BarChart` de esa demo, aquí las
  series pueden tener valores negativos (p. ej. una utilidad en pérdida).
*/

export interface GroupedBarSeries {
  name: string;
  values: number[];
}

export interface GroupedBarData {
  title: string;
  /** Etiqueta de magnitud del eje (p. ej. "Millones $"). */
  unit: string;
  categories: string[];
  series: GroupedBarSeries[];
}

const VIEW = { width: 300, height: 150 };
const PAD = { top: 18, right: 6, bottom: 22, left: 44 };
const PLOT = {
  width: VIEW.width - PAD.left - PAD.right,
  height: VIEW.height - PAD.top - PAD.bottom,
};

const BAR_WIDTH = 15;
const BAR_GAP = 2;
const CORNER = 3;
const GRID_STEPS = 4;

/** Paso "bonito" (1 / 2 / 5 × 10ⁿ) para una división de eje legible. */
function niceStep(range: number, steps: number): number {
  if (range <= 0) return 1;
  const raw = range / steps;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const normalized = raw / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return factor * magnitude;
}

/** Barra con las dos esquinas del extremo (el que marca el valor) redondeadas. */
function barPath(
  x: number,
  width: number,
  yTip: number,
  yBase: number,
): string {
  const r = Math.min(CORNER, Math.abs(yBase - yTip), width / 2);
  if (r <= 0) return `M${x},${yBase} H${x + width} V${yTip} H${x} Z`;

  const dir = yTip < yBase ? 1 : -1; // 1: barra hacia arriba; -1: hacia abajo
  const tipInner = yTip + r * dir;

  return [
    `M${x},${yBase}`,
    `L${x},${tipInner}`,
    `Q${x},${yTip} ${x + r},${yTip}`,
    `L${x + width - r},${yTip}`,
    `Q${x + width},${yTip} ${x + width},${tipInner}`,
    `L${x + width},${yBase}`,
    "Z",
  ].join(" ");
}

export interface GroupedBarChartProps {
  data: GroupedBarData;
}

export default function GroupedBarChart({ data }: GroupedBarChartProps) {
  const { title, unit, categories, series } = data;

  const allValues = series.flatMap((entry) => entry.values);
  const dataMax = Math.max(...allValues, 0);
  const dataMin = Math.min(...allValues, 0);
  const step = niceStep(dataMax - dataMin, GRID_STEPS);
  const axisMax = Math.ceil(dataMax / step) * step;
  const axisMin = Math.floor(dataMin / step) * step;
  const range = axisMax - axisMin || 1;

  const yFor = (value: number) =>
    PAD.top + ((axisMax - value) / range) * PLOT.height;
  const zeroY = yFor(0);
  const baseline = PAD.top + PLOT.height;

  const slotWidth = PLOT.width / categories.length;
  const groupWidth = series.length * BAR_WIDTH + (series.length - 1) * BAR_GAP;

  const gridValues: number[] = [];
  for (let value = axisMin; value <= axisMax + 0.5; value += step) {
    gridValues.push(value);
  }

  return (
    <figure className="flex h-full flex-col rounded-[4px] border border-black/10 bg-white p-2.5">
      <figcaption className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[11px] font-semibold text-black">
          {title}
        </span>
        <span className="shrink-0 text-[8px] text-black/40">{unit}</span>
      </figcaption>

      <ul className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5">
        {series.map((entry, index) => (
          <li
            key={entry.name}
            className="flex items-center gap-1 text-[9px] text-black/60"
          >
            <span
              className="size-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: chartColor(index) }}
            />
            {entry.name}
          </li>
        ))}
      </ul>

      <svg
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        className="mt-1 w-full flex-1"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${title}. Valores en ${unit}. Consulta la tabla equivalente para el detalle.`}
      >
        {gridValues.map((value) => {
          const y = yFor(value);
          const isZero = value === 0;
          return (
            <g key={value}>
              <line
                x1={PAD.left}
                x2={PAD.left + PLOT.width}
                y1={y}
                y2={y}
                stroke={isZero ? "rgb(0 0 0 / 0.25)" : "rgb(0 0 0 / 0.08)"}
                strokeWidth={1}
              />
              <text
                x={PAD.left - 5}
                y={y + 3}
                textAnchor="end"
                className="fill-black/45 text-[8px]"
              >
                {formatNumber(value)}
              </text>
            </g>
          );
        })}

        {categories.map((category, categoryIndex) => {
          const slotStart = PAD.left + slotWidth * categoryIndex;
          const groupStart = slotStart + (slotWidth - groupWidth) / 2;

          return (
            <g key={category}>
              {series.map((entry, seriesIndex) => {
                const value = entry.values[categoryIndex] ?? 0;
                const x = groupStart + seriesIndex * (BAR_WIDTH + BAR_GAP);
                const yTip = yFor(value);
                const positive = value >= 0;

                return (
                  <g key={entry.name}>
                    <title>{`${entry.name} · ${category}: ${formatNumber(value)}`}</title>
                    {value !== 0 && (
                      <path
                        d={barPath(x, BAR_WIDTH, yTip, zeroY)}
                        fill={chartColor(seriesIndex)}
                      />
                    )}
                    <text
                      x={x + BAR_WIDTH / 2}
                      y={positive ? yTip - 4 : yTip + 8}
                      textAnchor="middle"
                      className="fill-black/70 text-[7.5px]"
                    >
                      {formatNumber(value)}
                    </text>
                  </g>
                );
              })}

              <text
                x={slotStart + slotWidth / 2}
                y={baseline + 14}
                textAnchor="middle"
                className="fill-black/60 text-[8px]"
              >
                {category}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Alternativa textual: la gráfica no puede ser la única vía al dato. */}
      <table className="sr-only">
        <caption>{`${title} (${unit})`}</caption>
        <thead>
          <tr>
            <th scope="col">Concepto</th>
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
