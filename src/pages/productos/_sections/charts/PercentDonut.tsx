import { chartColor } from "./palette";

/*
  Dona de participación porcentual (gráfica "% Efectivo por tipo de cuenta" del
  dashboard IAS Financial). Estática, sin isla de React. Los valores ya vienen
  como porcentaje; el barrido de cada arco se calcula sobre su suma para tolerar
  redondeos (67 + 33 + 1 ≈ 100).
*/

export interface DonutSlice {
  name: string;
  /** Peso de la porción (porcentaje directo si el conjunto suma 100). */
  value: number;
}

export interface PercentDonutData {
  title: string;
  slices: DonutSlice[];
  /**
   * Si es false, la leyenda no muestra cifra (categorías sin porcentaje oficial
   * en la captura). Por defecto true: muestra `value` como porcentaje.
   */
  showPercent?: boolean;
}

const SIZE = 120;
const CENTER = SIZE / 2;
const OUTER = 54;
const INNER = 32;
/** Separación angular que deja un hueco fino entre porciones. */
const GAP_DEGREES = 2;

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

export interface PercentDonutProps {
  data: PercentDonutData;
}

export default function PercentDonut({ data }: PercentDonutProps) {
  const { title, slices, showPercent = true } = data;
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;

  let cursor = 0;
  const arcs = slices.map((slice, index) => {
    const sweep = (slice.value / total) * 360;
    const start = cursor;
    cursor += sweep;
    return {
      slice,
      color: chartColor(index),
      /** Porcentaje del total (para la tabla accesible cuando no hay cifra impresa). */
      share: Math.round((slice.value / total) * 100),
      path: arcPath(
        start + GAP_DEGREES / 2,
        Math.max(start + GAP_DEGREES / 2, cursor - GAP_DEGREES / 2),
      ),
    };
  });

  return (
    <figure className="flex h-full flex-col rounded-[4px] border border-black/10 bg-white p-2.5">
      <figcaption className="truncate text-[11px] font-semibold text-black">
        {title}
      </figcaption>

      <div className="mt-1 flex flex-1 items-center justify-center gap-3">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full max-h-[104px] w-auto shrink-0"
          role="img"
          aria-label={`${title}. Consulta la tabla equivalente para el detalle.`}
        >
          {arcs.map(({ slice, color, path }) => (
            <path key={slice.name} d={path} fill={color} />
          ))}
        </svg>

        {/* El nombre junto al swatch es la etiqueta visible obligatoria (los
            colores no bastan como único indicio); el porcentaje se muestra solo
            cuando la captura trae cifra oficial. */}
        <ul className="min-w-0 space-y-1">
          {arcs.map(({ slice, color }) => (
            <li
              key={slice.name}
              className="flex items-center gap-1.5 text-[9px] text-black/60"
            >
              <span
                className="size-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: color }}
              />
              <span className="truncate">{slice.name}</span>
              {showPercent && (
                <span className="ml-auto shrink-0 font-semibold text-black/80 tabular-nums">
                  {slice.value} %
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Concepto</th>
            <th scope="col">Participación</th>
          </tr>
        </thead>
        <tbody>
          {arcs.map(({ slice, share }) => (
            <tr key={slice.name}>
              <th scope="row">{slice.name}</th>
              <td>{showPercent ? slice.value : share} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
