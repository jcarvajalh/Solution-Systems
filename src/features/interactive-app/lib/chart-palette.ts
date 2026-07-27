/**
 * Paleta categórica de las gráficas, en orden fijo: una serie conserva su color
 * aunque cambie el número de series. Validada con el script del skill de
 * dataviz sobre superficie blanca (banda de luminosidad, croma, separación para
 * daltonismo y contraste). El primer color es el azul de marca.
 *
 * `--color-chart-3` queda por debajo de 3:1 sobre blanco, así que toda gráfica
 * que lo use debe llevar etiquetas visibles: por eso la leyenda muestra siempre
 * el valor junto al nombre.
 */
export const seriesColors = [
  "var(--color-brand)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
] as const;

export function seriesColor(index: number): string {
  return seriesColors[index % seriesColors.length]!;
}
