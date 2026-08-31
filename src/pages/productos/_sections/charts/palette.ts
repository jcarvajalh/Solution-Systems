/*
  Paleta de las gráficas recreadas de los productos (IAS Financial, IAS Accounts…).
  Reutiliza los tokens del sitio pero, a diferencia de la demo interactiva
  (`chart-palette.ts`), la segunda serie es verde en lugar de naranja, para
  reproducir el azul/verde de los dashboards reales. El tercer color —azul claro—
  reproduce porciones/series menores sin chocar con el verde de la segunda.
*/
export const chartColors = [
  "var(--color-brand)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
] as const;

export function chartColor(index: number): string {
  return chartColors[index % chartColors.length]!;
}
