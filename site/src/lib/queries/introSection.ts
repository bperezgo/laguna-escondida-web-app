export const INTRO_SECTION_QUERY = `*[_type == "introSection" && _id == "introSection"][0] {
  eyebrow,
  heading,
  lead,
  body,
  stats
}`;

export type IntroStat = {
  value: string;
  label: string;
};

export type IntroSectionData = {
  eyebrow?: string;
  heading?: string;
  lead?: string;
  body?: string;
  stats?: IntroStat[];
};
