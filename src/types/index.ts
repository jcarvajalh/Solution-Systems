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
}
