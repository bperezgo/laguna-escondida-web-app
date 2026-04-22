export const EXPERIENCES_SECTION_QUERY = `*[_type == "experiencesSection" && _id == "experiencesSection"][0] {
  eyebrow,
  heading,
  subtitle
}`;

export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  label,
  italicSubtitle,
  description,
  image,
  metaLeftLabel,
  metaLeftValue,
  metaRight,
  cta,
  eventKey
}`;

export type ExperiencesSectionData = {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
};

export type ExperienceCard = {
  _id: string;
  title: string;
  slug: string;
  label: string;
  italicSubtitle: string;
  description: string;
  image: { alt?: string } & Record<string, unknown>;
  metaLeftLabel: string;
  metaLeftValue: string;
  metaRight: string;
  cta: string;
  eventKey: string;
};
