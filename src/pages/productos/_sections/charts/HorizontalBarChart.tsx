import { formatNumber } from "@features/interactive-app/lib";
import { chartColor } from "./palette";

/*
  Barras horizontales (gráfica "Saldos en efectivo por entidad" del dashboard
  IAS Financial). Estática, sin isla de React. Una sola serie: cada barra usa el
  azul de marca. El nombre de la entidad va a la izquierda y el valor al final de
  la barra.
*/

export interface HorizontalBar {
  name: string;
  value: number;
}

export interface HorizontalBarData {
  title: string;
  unit: string;
  bars: HorizontalBar[];
}

const VIEW = { width: 300, height: 150 };
const PAD = { top: 8, right: 30, bottom: 18, left: 96 };
const PLOT = {
  width: VIEW.width - PAD.left - PAD.right,
  height: VIEW.height - PAD.top - PAD.bottom,
};

const BAR_HEIGHT = 8;
const CORNER = 2;
const GRID_STEPS = 4;

function niceStep(range: number, steps: number): number {
  if (range <= 0) return 1;
  const raw = range / steps;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const normalized = raw / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return factor * magnitude;
}

export interface HorizontalBarChartProps {
  data: HorizontalBarData;
}

export default function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  const { title, unit, bars } = data;

  const dataMax = Math.max(...bars.map((bar) => bar.value), 0);
  const step = niceStep(dataMax, GRID_STEPS);
  const axisMax = Math.ceil(dataMax / step) * step || 1;

  const rowHeight = PLOT.height / bars.length;
  const xFor = (value: number) => PAD.left + (value / axisMax) * PLOT.width;

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

      <svg
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        className="mt-1 w-full flex-1"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${title}. Valores en ${unit}. Consulta la tabla equivalente para el detalle.`}
      >
        {gridValues.map((value) => {
          const x = xFor(value);
          return (
            <g key={value}>
              <line
                x1={x}
                x2={x}
                y1={PAD.top}
                y2={PAD.top + PLOT.height}
                stroke="rgb(0 0 0 / 0.08)"
                strokeWidth={1}
              />
              <text
                x={x}
                y={PAD.top + PLOT.height + 12}
                textAnchor="middle"
                className="fill-black/40 text-[7px]"
              >
                {formatNumber(value)}
              </text>
            </g>
          );
        })}

        {bars.map((bar, index) => {
          const yCenter = PAD.top + rowHeight * index + rowHeight / 2;
          const y = yCenter - BAR_HEIGHT / 2;
          const width = Math.max(0, xFor(bar.value) - PAD.left);

          return (
            <g key={bar.name}>
              <title>{`${bar.name}: ${formatNumber(bar.value)} ${unit}`}</title>
              <text
                x={PAD.left - 5}
                y={yCenter + 2.5}
                textAnchor="end"
                className="fill-black/60 text-[7px]"
              >
                {bar.name}
              </text>
              {width > 0 && (
                <rect
                  x={PAD.left}
                  y={y}
                  width={width}
                  height={BAR_HEIGHT}
                  rx={CORNER}
                  fill={chartColor(0)}
                />
              )}
              <text
                x={PAD.left + width + 3}
                y={yCenter + 2.5}
                textAnchor="start"
                className="fill-black/70 text-[7px]"
              >
                {formatNumber(bar.value)}
              </text>
            </g>
          );
        })}
      </svg>

      <table className="sr-only">
        <caption>{`${title} (${unit})`}</caption>
        <thead>
          <tr>
            <th scope="col">Entidad</th>
            <th scope="col">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {bars.map((bar) => (
            <tr key={bar.name}>
              <th scope="row">{bar.name}</th>
              <td>{formatNumber(bar.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
