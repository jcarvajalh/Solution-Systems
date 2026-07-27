export { appModules, defaultModuleId } from "./mock-data";

/**
 * Separador de miles con punto, al estilo colombiano. Implementado a mano y no
 * con `Intl` para que el servidor y el cliente produzcan exactamente la misma
 * cadena: cualquier diferencia rompería la hidratación de la isla.
 */
export function formatNumber(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Escala "bonita" (1 / 2 / 5 × 10ⁿ) por encima del valor máximo de la serie. */
export function niceAxisMax(max: number, steps = 6): number {
  if (max <= 0) return steps;

  const rawStep = max / steps;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const niceStep =
    (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) *
    magnitude;

  return Math.ceil(max / niceStep) * niceStep;
}
