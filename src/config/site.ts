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
  contact: {
    email: "",
    phone: "",
    address: "",
  },
};

/** Titular de la rejilla. El salto es del diseño (≥1024px); abajo el texto fluye solo. */
export const clientsHeading = [
  "Únete a más de 15 entidades que confían en el ERP IAS de",
  "Solution Systems.",
];

/** Logos de la rejilla de clientes. `null` deja la celda vacía (ver diseño). */
export const clients: (Client | null)[] = [
  { name: "Infi Manizales", slug: "infi-manizales" },
  { name: "InfiHuila", slug: "infihuila" },
  { name: "Infi Caldas", slug: "infi-caldas" },
  null,
  { name: "Idear", slug: "idear" },
  { name: "Promotora Energética del Centro", slug: "promotora-energetica" },
  null,
  { name: "IFC — Instituto Financiero de Casanare", slug: "ifc" },
  { name: "InfiValle", slug: "infivalle" },
  { name: "Infibagué", slug: "infibague" },
];
