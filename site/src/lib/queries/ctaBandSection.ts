export const CTA_BAND_SECTION_QUERY = `*[_type == "ctaBandSection" && _id == "ctaBandSection"][0] {
  eyebrow,
  heading,
  primaryCtaText,
  whatsappCtaText,
  whatsappNumber,
  whatsappMessage
}`;

export type CtaBandSectionData = {
  eyebrow?: string;
  heading?: string;
  primaryCtaText?: string;
  whatsappCtaText?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
};
