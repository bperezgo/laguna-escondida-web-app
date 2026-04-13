export const HERO_SECTION_QUERY = `*[_type == "heroSection" && _id == "heroSection"][0] {
  backgroundImage,
  headline,
  subheadline,
  whatsappNumber,
  whatsappMessage,
  ctaPrimaryText,
  ctaSecondaryText,
  trustBadgeText
}`;
