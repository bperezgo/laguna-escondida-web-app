// src/types/blog.ts

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    instagram?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;         // HTML or markdown
  coverImage?: string;
  author: Author;
  category: Category;
  tags: string[];
  publishedAt: string;     // ISO date string
  updatedAt?: string;
  readingTime?: number;    // minutes
  featured?: boolean;
}

export interface BlogListMeta {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export interface BlogListResult {
  posts: BlogPost[];
  meta: BlogListMeta;
}
