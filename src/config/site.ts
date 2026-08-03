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
    phone: "+57 3018135745",
    address: "",
  },
  // TODO: confirmar con Juan — URL externa de la Mesa de Ayuda (botón flotante).
  supportUrl: "",
};

/** Titular de la rejilla. El salto es del diseño (≥1024px); abajo el texto fluye solo. */
export const clientsHeading = [
  "Únete a más de 15 entidades que confían en el ERP IAS de",
  "Solution Systems.",
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
  { name: "InfiValle", slug: "infivalle" },
  { name: "Infibagué", slug: "infibague" },
];
