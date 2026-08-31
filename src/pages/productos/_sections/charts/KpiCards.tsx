/*
  Fila de indicadores (gráfica "Cifras al corte de la fecha final" del dashboard
  IAS Accounts). Es solo texto, así que es accesible por sí misma; se renderiza
  estática, sin isla de React. Los valores ya vienen formateados: son datos de
  demostración transcritos de la captura, no se calculan.
*/

export interface KpiItem {
  /** Valor ya formateado, p. ej. "$ 9.634" o "2". */
  value: string;
  /** Unidad o aclaración bajo el valor, p. ej. "Millones" o "#". */
  unit?: string;
  label: string;
}

export interface KpiCardsData {
  title: string;
  items: KpiItem[];
}

export interface KpiCardsProps {
  data: KpiCardsData;
}

export default function KpiCards({ data }: KpiCardsProps) {
  const { title, items } = data;

  return (
    <figure className="flex h-full flex-col rounded-[4px] border border-black/10 bg-white p-2.5">
      <figcaption className="truncate text-[11px] font-semibold text-black">
        {title}
      </figcaption>

      <ul className="mt-2 grid flex-1 grid-cols-2 gap-2">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex flex-col items-center justify-center rounded-[4px] border border-black/10 px-1.5 py-1 text-center"
          >
            <p className="text-brand text-[13px] leading-none font-semibold">
              {item.value}
            </p>
            {item.unit && (
              <p className="mt-0.5 text-[8px] text-black/45">{item.unit}</p>
            )}
            <p className="mt-1 text-[8px] leading-tight text-black/55">
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </figure>
  );
}
