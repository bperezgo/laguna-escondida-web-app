export const BLOG_PREVIEW_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) [0...3] {
  title,
  slug,
  excerpt,
  featuredImage,
  "category": category->{title, badgeClass}
}`;
