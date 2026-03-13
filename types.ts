export interface Project {
  id: number;
  number: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: number;
  slug: string; // URL friendly name
  title: string;
  category: string;
  year: string;
  client?: string;
  location?: string;
  services?: string;
  description: string;
  mainImage: string;
  gallery: (string | string[])[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}