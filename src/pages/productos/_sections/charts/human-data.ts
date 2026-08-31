import type { GroupedBarData } from "./GroupedBarChart";
import type { PercentDonutData } from "./PercentDonut";

/*
  Datos de los dashboards de IAS Human, leídos de las capturas del producto
  (src/assets/images/products/_referencia/human-ref-*.jpg).

  IMPORTANTE: a diferencia de Financial y Accounts, estas capturas NO imprimen
  los valores sobre las barras ni las porciones. Las cifras de abajo son lecturas
  aproximadas contra la escala del eje, aprobadas por Juan como provisionales.
  TODO: confirmar con Juan las cifras exactas.
*/

export const estadoPlanta: GroupedBarData = {
  title: "Estado de la planta",
  unit: "Personas",
  categories: ["Activos", "Vacantes", "Provisionales"],
  series: [
    { name: "2026", values: [1145, 82, 55] },
    { name: "2025", values: [1090, 112, 48] },
  ],
};

export const ausentismo: GroupedBarData = {
  title: "Ausentismo (días)",
  unit: "Días",
  categories: ["Médica", "Incapacidad", "Permisos"],
  series: [
    { name: "2026", values: [208, 155, 97] },
    { name: "2025", values: [243, 137, 110] },
  ],
};

/*
  Sin porcentajes impresos: `value` es el peso relativo aproximado (suma 100) y
  la leyenda se muestra sin cifra (showPercent: false). Orden y color:
  Carrera administrativa (azul), Provisional (verde), Libre nombramiento (azul
  claro), Contratistas (ámbar).
*/
export const tipoVinculacion: PercentDonutData = {
  title: "Distribución por tipo de vinculación",
  showPercent: false,
  slices: [
    { name: "Carrera administrativa", value: 45 },
    { name: "Provisional", value: 20 },
    { name: "Libre nombramiento", value: 13 },
    { name: "Contratistas", value: 22 },
  ],
};

export const capacitaciones: GroupedBarData = {
  title: "Capacitaciones por dependencia (personas)",
  unit: "Personas",
  categories: ["Salud", "Educación", "Hacienda", "Infraestructura", "Gobierno"],
  series: [{ name: "Personas", values: [147, 131, 95, 73, 57] }],
};
