import { formatNumber } from "@features/interactive-app/lib";
import { chartColor } from "./palette";

/*
  Gráfica de líneas (p. ej. "Cartera por líneas" del dashboard IAS Accounts).
  Estática, sin isla de React. Marcadores cuadrados y etiqueta de valor sobre
  cada punto, como en la captura. Reutiliza la paleta y el formateo del sitio.
*/

export interface LineSeries {
  name: string;
  values: number[];
}

export interface LineChartData {
  title: string;
  /** Etiqueta de magnitud del eje. */
  unit: string;
  categories: string[];
  series: LineSeries[];
}

const VIEW = { width: 300, height: 150 };
const PAD = { top: 20, right: 14, bottom: 22, left: 44 };
const PLOT = {
  width: VIEW.width - PAD.left - PAD.right,
  height: VIEW.height - PAD.top - PAD.bottom,
};

const MARKER = 4;
const GRID_STEPS = 4;

function niceStep(range: number, steps: number): number {
  if (range <= 0) return 1;
  const raw = range / steps;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const normalized = raw / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return factor * magnitude;
}

export interface LineChartProps {
  data: LineChartData;
}

export default function LineChart({ data }: LineChartProps) {
  const { title, unit, categories, series } = data;

  const dataMax = Math.max(...series.flatMap((entry) => entry.values), 0);
  const step = niceStep(dataMax, GRID_STEPS);
  const axisMax = Math.ceil(dataMax / step) * step || 1;

  const count = categories.length;
  const xFor = (index: number) =>
    count <= 1
      ? PAD.left + PLOT.width / 2
      : PAD.left + (index / (count - 1)) * PLOT.width;
  const yFor = (value: number) =>
    PAD.top + ((axisMax - value) / axisMax) * PLOT.height;

  const gridValues: number[] = [];
  for (let value = 0; value <= axisMax + 0.5; value += step) {
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
          return (
            <g key={value}>
              <line
                x1={PAD.left}
                x2={PAD.left + PLOT.width}
                y1={y}
                y2={y}
                stroke="rgb(0 0 0 / 0.08)"
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

        {categories.map((category, index) => (
          <text
            key={category}
            x={xFor(index)}
            y={PAD.top + PLOT.height + 14}
            textAnchor="middle"
            className="fill-black/60 text-[7.5px]"
          >
            {category}
          </text>
        ))}

        {series.map((entry, seriesIndex) => {
          const color = chartColor(seriesIndex);
          const points = entry.values.map((value, index) => ({
            x: xFor(index),
            y: yFor(value),
            value,
          }));
          const path = points
            .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
            .join(" ");

          return (
            <g key={entry.name}>
              <path d={path} fill="none" stroke={color} strokeWidth={1.5} />
              {points.map((point, index) => (
                <g key={`${entry.name}-${index}`}>
                  <rect
                    x={point.x - MARKER / 2}
                    y={point.y - MARKER / 2}
                    width={MARKER}
                    height={MARKER}
                    fill={color}
                  />
                  <text
                    x={point.x}
                    y={point.y - 6}
                    textAnchor="middle"
                    className="fill-black/70 text-[7.5px]"
                  >
                    {formatNumber(point.value)}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>

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
          {categories.map((category, index) => (
            <tr key={category}>
              <th scope="row">{category}</th>
              {series.map((entry) => (
                <td key={entry.name}>{formatNumber(entry.values[index] ?? 0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
