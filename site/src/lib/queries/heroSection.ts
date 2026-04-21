export const HERO_SECTION_QUERY = `*[_type == "heroSection" && _id == "heroSection"][0] {
  backgroundImage,
  headline,
  subheadline,
  whatsappNumber,
  whatsappMessage,
  ctaPrimaryText,
  ctaSecondaryText,
  trustBadgeText,
  stats,
  houseNoteEyebrow,
  houseNote
}`;

export type HeroStat = {
  label: string;
  value: string;
};

export type HeroSectionData = {
  backgroundImage?: { alt?: string } & Record<string, unknown>;
  headline?: { line1?: string; line2?: string; line3?: string };
  subheadline?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  trustBadgeText?: string;
  stats?: HeroStat[];
  houseNoteEyebrow?: string;
  houseNote?: string;
};
