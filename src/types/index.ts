export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdownItem extends NavLink {
  description?: string;
}

export interface NavItem extends NavLink {
  dropdown?: NavDropdownItem[];
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
