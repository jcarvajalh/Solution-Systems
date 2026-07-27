import { formatNumber } from "../lib";
import { seriesColor } from "../lib/chart-palette";
import type { DonutChartData } from "../types";

const SIZE = 200;
const CENTER = SIZE / 2;
const OUTER = 78;
const INNER = 48;
/** Separación angular que hace de hueco de 2px entre porciones contiguas. */
const GAP_DEGREES = 1.6;

function polar(radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180;

  return {
    x: CENTER + radius * Math.cos(radians),
    y: CENTER + radius * Math.sin(radians),
  };
}

function arcPath(startAngle: number, endAngle: number): string {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const outerStart = polar(OUTER, startAngle);
  const outerEnd = polar(OUTER, endAngle);
  const innerEnd = polar(INNER, endAngle);
  const innerStart = polar(INNER, startAngle);

  return [
    `M${outerStart.x},${outerStart.y}`,
    `A${OUTER},${OUTER} 0 ${largeArc} 1 ${outerEnd.x},${outerEnd.y}`,
    `L${innerEnd.x},${innerEnd.y}`,
    `A${INNER},${INNER} 0 ${largeArc} 0 ${innerStart.x},${innerStart.y}`,
    "Z",
  ].join(" ");
}

export interface DonutChartProps {
  data: DonutChartData;
}

export default function DonutChart({ data }: DonutChartProps) {
  const { slices, title } = data;
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  let cursor = 0;
  const arcs = slices.map((slice, index) => {
    const sweep = total > 0 ? (slice.value / total) * 360 : 0;
    const start = cursor;
    cursor += sweep;

    return {
      slice,
      color: seriesColor(index),
      share: total > 0 ? (slice.value / total) * 100 : 0,
      path: arcPath(
        start + GAP_DEGREES / 2,
        Math.max(start + GAP_DEGREES / 2, cursor - GAP_DEGREES / 2),
      ),
    };
  });

  return (
    <figure className="flex h-full flex-col rounded-[4px] border border-black/10 bg-white p-3">
      <figcaption className="text-center text-[11px] font-semibold text-black">
        {title}
      </figcaption>

      <div className="mt-2 flex flex-1 flex-wrap items-center justify-center gap-4">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-[150px] w-[150px] shrink-0"
          role="img"
          aria-label={`${title}. Consulta la tabla equivalente para el detalle.`}
        >
          {arcs.map(({ slice, color, path, share }) => (
            <g key={slice.name} className="transition-opacity hover:opacity-80">
              <title>{`${slice.name}: ${formatNumber(slice.value)} (${share.toFixed(1)} %)`}</title>
              <path d={path} fill={color} />
            </g>
          ))}

          <text
            x={CENTER}
            y={CENTER - 2}
            textAnchor="middle"
            className="fill-black text-[15px] font-semibold"
          >
            {formatNumber(total)}
          </text>
          <text
            x={CENTER}
            y={CENTER + 12}
            textAnchor="middle"
            className="fill-black/50 text-[9px]"
          >
            Total
          </text>
        </svg>

        {/*
          La leyenda lleva el valor además del nombre: es la etiqueta visible que
          exige el color de serie 3, que no alcanza 3:1 sobre blanco.
        */}
        <ul className="min-w-0 space-y-1.5">
          {arcs.map(({ slice, color, share }) => (
            <li
              key={slice.name}
              className="flex items-center gap-2 text-[9px] text-black/60"
            >
              <span
                className="size-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: color }}
              />
              <span className="truncate">{slice.name}</span>
              <span className="ml-auto shrink-0 font-semibold text-black/80">
                {formatNumber(slice.value)}
              </span>
              <span className="shrink-0 text-black/40 tabular-nums">
                {share.toFixed(1)} %
              </span>
            </li>
          ))}
        </ul>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Concepto</th>
            <th scope="col">Valor</th>
            <th scope="col">Participación</th>
          </tr>
        </thead>
        <tbody>
          {arcs.map(({ slice, share }) => (
            <tr key={slice.name}>
              <th scope="row">{slice.name}</th>
              <td>{formatNumber(slice.value)}</td>
              <td>{share.toFixed(1)} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
