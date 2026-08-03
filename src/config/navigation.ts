import type { FooterColumn, HeaderActions, NavItem } from "@/types";

/**
 * Orden y etiquetas tomados del header de Figma (node 154:4651).
 * `hasDropdown` marca los ítems que en el diseño llevan chevron.
 */
export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  // TODO: confirmar con Juan — ítems del desplegable de Productos (no diseñados en Figma).
  { label: "Productos", href: "/productos", hasDropdown: true },
  { label: "Soluciones", href: "/soluciones" },
  // TODO: confirmar con Juan — la página /recursos no existe todavía y su
  // desplegable tampoco está diseñado en Figma.
  { label: "Recursos", href: "/recursos", hasDropdown: true },
];

export const headerActions: HeaderActions = {
  secondary: { label: "Soporte", href: "/soporte" },
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
    // TODO: confirmar con Juan — rutas individuales de cada producto (fichas).
    links: [
      { label: "RISK" },
      { label: "IAS Financial" },
      { label: "IAS Human" },
      { label: "IAS Accounts" },
      { label: "IAS Operational" },
      { label: "IAS NIIF" },
      { label: "IAS Audit" },
    ],
  },
  {
    title: "Soluciones",
    titleHref: "/soluciones",
    links: [
      { label: "Soluciones en la nube", href: "/soluciones" },
      { label: "SaaS", href: "/soluciones" },
      { label: "IaaS", href: "/soluciones" },
      { label: "Mesa de ayuda", href: "/soporte" },
    ],
  },
  {
    title: "Recursos",
    // TODO: confirmar con Juan — páginas de Blog, Clientes y Política de privacidad.
    links: [
      { label: "Blog" },
      { label: "Clientes" },
      { label: "Política de privacidad" },
    ],
  },
];
