import type { GroupedBarData } from "./GroupedBarChart";
import type { KpiCardsData } from "./KpiCards";
import type { LineChartData } from "./LineChart";

/*
  Datos reales de los dashboards de IAS Accounts, transcritos de las capturas del
  producto (src/assets/images/products/_referencia/accounts-ref-*.jpg). Cifras en
  millones de pesos salvo el conteo de clientes. No inventar ni alterar valores.
*/

export const saldosCartera: GroupedBarData = {
  title: "Saldos de cartera",
  unit: "Millones $",
  categories: ["Capital", "Interés corriente", "Interés de mora"],
  series: [
    { name: "2026", values: [9563, 247, 29] },
    { name: "2025", values: [10013, 328, 4] },
  ],
};

export const carteraVsAnterior: GroupedBarData = {
  title: "Cartera total vs año anterior",
  unit: "Millones $",
  categories: ["31-Ene", "28-Feb"],
  series: [
    { name: "Año actual", values: [9706, 9634] },
    { name: "Año anterior", values: [10331, 10259] },
  ],
};

export const cifrasCorte: KpiCardsData = {
  title: "Cifras al corte de la fecha final",
  items: [
    { value: "$ 9.634", unit: "Millones", label: "Cartera - capital" },
    { value: "$ 384", unit: "Millones", label: "Cartera - interés corriente" },
    { value: "$ 5", unit: "Millones", label: "Cartera - interés de mora" },
    { value: "2", unit: "#", label: "No. de clientes cartera" },
  ],
};

export const carteraPorLineas: LineChartData = {
  title: "Cartera por líneas",
  unit: "Millones $",
  categories: ["2026-01-31", "2026-02-28"],
  series: [{ name: "FOMENTO", values: [9706, 9634] }],
};
