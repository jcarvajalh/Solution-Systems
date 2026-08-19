import type { Client, SiteConfig } from "@/types";


export const siteConfig: SiteConfig = {
  name: "Solution Systems",
  description: "",
  url: "https://example.com",
  social: {
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  },
  // Datos de contacto tomados del footer de Figma (Frame 32).
  contact: {
    email: "comercial@e-solutionsystems.net",
    phone: "+57 301 813 5745",
    address: "",
  },
  // Portal de Mesa de Ayuda (Oracle APEX). Fuente única: la usan el botón
  // flotante y los botones de "Soporte" / "Mesa de ayuda".
  // TODO: confirmar con Juan — el `?session=` parece específico de una sesión;
  // conviene una URL de login estable.
  supportUrl:
    "https://g553d75c29da6f6-d9l8quf3dkjc8ult.adb.us-ashburn-1.oraclecloudapps.com/ords/r/ws_ias/solution-systems/login?session=113980180682589",
};

/** Titular de la rejilla. El salto es del diseño (≥1024px); abajo el texto fluye solo. */
export const clientsHeading = [
  "Únete a más de 15 organizaciones que ya confían en",
  "nuestras soluciones.",
];

/** Logos de la rejilla de clientes. `null` deja la celda vacía (ver diseño). */
export const clients: (Client | null)[] = [
  { name: "Infi Manizales", slug: "infimanizales" },
  { name: "InfiHuila", slug: "infihuila" },
  { name: "Infi Caldas", slug: "inficaldas" },
  { name: "Emsirva", slug: "emsirva" },
  { name: "Idear", slug: "idear" },
  { name: "Promotora Energética del Centro", slug: "promotora" },
  { name: "Personería de de santiago de cali", slug: "personeria" },
  { name: "IFC — Instituto Financiero de Casanare", slug: "ifc" },
  // Nota (contenido.md): se retira el logo de INFIVALLE; en su lugar entra Promueve+.
  { name: "Promueve+", slug: "promueve-mas" },
  { name: "Infibagué", slug: "infibague" },
];
