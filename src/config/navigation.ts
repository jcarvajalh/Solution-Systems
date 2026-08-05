import type { FooterColumn, HeaderActions, NavItem } from "@/types";
import { siteConfig } from "@config/site";

export interface Product {
  name: string;
  slug: string;
}

/**
 * Catálogo de productos. Fuente única para el desplegable del header, la columna
 * del footer y las fichas (`/productos/[slug]`), que comparten diseño.
 * TODO: confirmar con Juan — catálogo definitivo y rutas de cada producto.
 */
export const products: Product[] = [
  { name: "RISK", slug: "risk" },
  { name: "IAS Financial", slug: "ias-financial" },
  { name: "IAS Human", slug: "ias-human" },
  { name: "IAS Accounts", slug: "ias-accounts" },
  { name: "IAS Operational", slug: "ias-operational" },
  { name: "IAS NIIF", slug: "ias-niif" },
  { name: "IAS Audit", slug: "ias-audit" },
];

const productLinks = products.map((product) => ({
  label: product.name,
  href: `/productos/${product.slug}`,
}));

/**
 * Orden y etiquetas tomados del header de Figma (node 154:4651).
 * `hasDropdown` marca los ítems que en el diseño llevan chevron.
 */
export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  {
    label: "Productos",
    href: "/productos",
    hasDropdown: true,
    dropdown: productLinks,
  },
  { label: "Soluciones", href: "/soluciones" },
  {
    label: "Recursos",
    href: "/contacto",
    hasDropdown: true,
    dropdown: [
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

export const headerActions: HeaderActions = {
  // "Soporte" abre el portal de Mesa de Ayuda (externo).
  secondary: { label: "Soporte", href: siteConfig.supportUrl || "/soporte" },
  // TODO: confirmar con Juan — destino de "Empezar ahora"; se asume /contacto.
  primary: { label: "Empezar ahora", href: "/contacto" },
};

/**
 * Columnas de enlaces del footer (Figma, node Frame 32). Los ítems sin `href`
 * se pintan como texto: su ruta aún no existe/está por confirmar.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: "Productos",
    titleHref: "/productos",
    links: productLinks,
  },
  {
    title: "Soluciones",
    titleHref: "/soluciones",
    links: [
      { label: "Soluciones en la nube", href: "/soluciones" },
      { label: "SaaS", href: "/soluciones" },
      { label: "IaaS", href: "/soluciones" },
      { label: "Mesa de ayuda", href: siteConfig.supportUrl || "/soporte" },
    ],
  },
  {
    title: "Recursos",
    // TODO: confirmar con Juan — páginas de Clientes.
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Clientes" },
      { label: "Política de privacidad", href: "/politica-de-privacidad" },
    ],
  },
];
