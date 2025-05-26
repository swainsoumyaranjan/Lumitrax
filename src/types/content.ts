export interface ContentItem {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  type: "video" | "article" | "book" | "report" | "talk";
  category: "climate" | "education" | "healthcare" | "equality" | "poverty";
  date: string;
  image: string;
  url: string;
  featured: boolean;
  views: number;
}
