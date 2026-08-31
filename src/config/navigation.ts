import type { FooterColumn, HeaderActions, NavItem } from "@/types";
import { siteConfig } from "@config/site";

export interface Product {
  name: string;
  slug: string;
  /**
   * Si está definido, el producto enlaza a este sitio externo y NO genera ficha
   * interna en `/productos/[slug]` (caso RISK, con web propia).
   */
  externalUrl?: string;
}

// TODO: confirmar con Juan — URL del sitio web de RISK. Reemplazar el
// placeholder "#" por la URL real (https://...); al hacerlo, "RISK" abre ese
// sitio (en pestaña nueva) y sigue sin generar ficha interna.
const RISK_EXTERNAL_URL = "#";

/**
 * Catálogo de productos. Fuente única para el desplegable del header, la columna
 * del footer y las fichas (`/productos/[slug]`), que comparten diseño.
 * Son cuatro productos (contenido.md): RISK e IAS (Financial, Human, Accounts).
 * RISK no tiene ficha interna: enlaza a su propio sitio web.
 */
export const products: Product[] = [
  { name: "RISK", slug: "risk", externalUrl: RISK_EXTERNAL_URL },
  { name: "IAS Financial", slug: "ias-financial" },
  { name: "IAS Human", slug: "ias-human" },
  { name: "IAS Accounts", slug: "ias-accounts" },
];

/** Resuelve el destino de un producto: sitio externo o ficha interna. */
export const productHref = (product: Product) =>
  product.externalUrl ?? `/productos/${product.slug}`;

const productLinks = products.map((product) => ({
  label: product.name,
  href: productHref(product),
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
      { label: "Serviciones en la nube", href: "/soluciones" },
      { label: "Bolsa de horas", href: "/soluciones" },
      { label: "Generador de informes", href: "/soluciones" },
      { label: "Mesa de ayuda", href: siteConfig.supportUrl || "/soporte" },
    ],
  },
  {
    title: "Recursos",
    // TODO: confirmar con Juan — páginas de Clientes.
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/contacto" },
      { label: "Política de privacidad", href: "/politica-de-privacidad" },
    ],
  },
];
