import type { NavItem, NavLink } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  {
    label: "Soluciones",
    href: "/soluciones",
    dropdown: [{ label: "Productos", href: "/productos" }],
  },
  { label: "Contacto", href: "/contacto" },
  { label: "Soporte", href: "/soporte" },
];

export const footerNav: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Contacto", href: "/contacto" },
  { label: "Soporte", href: "/soporte" },
];
