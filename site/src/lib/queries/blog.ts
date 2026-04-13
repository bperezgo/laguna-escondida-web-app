import type { PortableTextBlock } from '@portabletext/types';

export interface SanitySlug {
  current: string;
  _type: 'slug';
}

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface BlogCategory {
  title: string;
  slug: SanitySlug;
  badgeClass: 'primary' | 'secondary' | 'accent';
}

export interface BlogPostPreview {
  title: string;
  slug: SanitySlug;
  excerpt: string;
  featuredImage: SanityImage;
  category: BlogCategory;
}

export interface BlogPostListItem extends BlogPostPreview {
  publishedAt: string;
  author?: string;
}

export interface BlogPost extends BlogPostListItem {
  content: PortableTextBlock[];
}

export const BLOG_PREVIEW_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) [0...3] {
  title,
  slug,
  excerpt,
  featuredImage,
  "category": category->{title, slug, badgeClass}
}`;

export const BLOG_LIST_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  author,
  "category": category->{title, slug, badgeClass}
}`;

export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  publishedAt,
  author,
  "category": category->{title, slug, badgeClass}
}`;

export const BLOG_CATEGORY_QUERY = `*[_type == "blogPost" && category->slug.current == $slug] | order(publishedAt desc) {
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  author,
  "category": category->{title, slug, badgeClass}
}`;

export const BLOG_CATEGORY_TITLE_QUERY = `*[_type == "blogCategory" && slug.current == $slug][0] {
  title,
  badgeClass
}`;
