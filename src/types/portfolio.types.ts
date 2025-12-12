export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUri?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  id: string;
  name: string;
  items: PortfolioItem[];
  createdAt: string;
  updatedAt: string;
}

export type PortfolioTemplate = 'grid' | 'list';

export interface PortfolioExportOptions {
  format: 'html' | 'pdf';
  template?: PortfolioTemplate;
}
