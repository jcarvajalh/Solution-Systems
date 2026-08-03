export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdownItem extends NavLink {
  description?: string;
}

export interface NavItem extends NavLink {
  /**
   * Dibuja el chevron del diseño. El contenido del menú todavía no está definido
   * en Figma, por eso es independiente de `dropdown`.
   */
  hasDropdown?: boolean;
  dropdown?: NavDropdownItem[];
}

export interface HeaderActions {
  /** Botón delineado del header. */
  secondary: NavLink;
  /** Botón sólido (CTA principal) del header. */
  primary: NavLink;
}

export interface FooterLink {
  label: string;
  /** Sin `href` se renderiza como texto (ruta aún no definida). */
  href?: string;
}

export interface FooterColumn {
  title: string;
  /** Si existe, el título de la columna es un enlace. */
  titleHref?: string;
  links: FooterLink[];
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  social: SocialLinks;
  contact: ContactInfo;
  /** URL externa de la Mesa de Ayuda (botón flotante). Vacío deshabilita el botón. */
  supportUrl?: string;
}

export interface Client {
  /** Nombre de la entidad. Se usa como texto alternativo del logo. */
  name: string;
  /** Nombre del archivo en src/assets/images/clients/, sin extensión. */
  slug: string;
}