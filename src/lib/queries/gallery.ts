export const GALLERY_QUERY = `*[_type == "galleryImage"] | order(order asc) {
  _id,
  image {
    asset,
    alt,
    hotspot,
    crop
  },
  gridSize,
  order,
  caption
}`;
