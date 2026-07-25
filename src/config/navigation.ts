import type { HeaderActions, NavItem, NavLink } from "@/types";

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

export const footerNav: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Contacto", href: "/contacto" },
  { label: "Soporte", href: "/soporte" },
];
