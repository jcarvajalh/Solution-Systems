import type { GroupedBarData } from "./GroupedBarChart";
import type { HorizontalBarData } from "./HorizontalBarChart";
import type { PercentDonutData } from "./PercentDonut";

/*
  Datos reales de los dashboards de IAS Financial, transcritos de las capturas
  del producto (src/assets/images/products/financial-ref-*.jpg). Las cifras están
  en millones de pesos. No inventar ni alterar estos valores.
*/

export const situacionFinanciera: GroupedBarData = {
  title: "Estado de la situación financiera",
  unit: "Millones $",
  categories: ["1-Activos", "2-Pasivos", "3-Patrimonio"],
  series: [
    { name: "2026", values: [681911, 54734, 636537] },
    { name: "2025", values: [686572, 56313, 629265] },
  ],
};

export const estadoResultados: GroupedBarData = {
  title: "Estado de resultados",
  unit: "Millones $",
  categories: ["4-Ingresos", "5-Costos y gastos", "Utilidad"],
  series: [
    { name: "2026", values: [28386, 19660, -11009] },
    { name: "2025", values: [40790, 20353, 20437] },
  ],
};

export const efectivoPorCuenta: PercentDonutData = {
  title: "% Efectivo por tipo de cuenta",
  slices: [
    { name: "CDT", value: 67 },
    { name: "CTA Ahorros", value: 33 },
    { name: "CTA Corriente", value: 1 },
  ],
};

/*
  TODO: confirmar con Juan — la captura muestra más entidades (con etiquetas de
  eje alternas). Aquí se toman las siete entidades rotuladas con su saldo. Ajustar
  el listado si se requiere reproducirlo completo.
*/
export const saldosPorEntidad: HorizontalBarData = {
  title: "Saldos en efectivo por entidad",
  unit: "Millones $",
  bars: [
    { name: "Banco de Occidente", value: 13036 },
    { name: "Mibanco", value: 5986 },
    { name: "Banco Contactar", value: 3641 },
    { name: "Davivienda", value: 1448 },
    { name: "Citibank", value: 236 },
    { name: "Colpatria", value: 61 },
    { name: "Banco Superfinanza S.A", value: 0 },
  ],
};
