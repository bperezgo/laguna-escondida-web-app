import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "eycsitos",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Generate srcset and sizes attributes for responsive Sanity images.
 * Uses Sanity's CDN to serve optimally-sized images per viewport.
 */
export function responsiveImage(
  source: any,
  widths: number[] = [400, 800, 1200, 1600],
  sizes: string = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
) {
  const srcset = widths
    .map((w) => `${urlFor(source).width(w).quality(80).auto('format').url()} ${w}w`)
    .join(', ');
  const src = urlFor(source).width(widths[1]).quality(80).auto('format').url();
  return { src, srcset, sizes };
}
