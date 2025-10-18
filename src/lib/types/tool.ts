export interface Tool {
  id: number;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  category?: string;
  tags?: string[];
}
