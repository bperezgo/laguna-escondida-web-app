// src/types/funnel.ts
// All data shapes for the Laguna Escondida events funnel.

export interface Stat {
  value: string;
  label: string;
}

export interface HeroData {
  credibilityPill?: string;
  headline:         string;
  subheadline:      string;
  ctaText:          string;
  ctaHref:          string;
  secondaryCta?:    string;
  secondaryHref?:   string;
  trustNote?:       string;
  stats?:           Stat[];
}

export interface ProblemData {
  eyebrow:    string;
  headline:   string;
  intro:      string;
  painPoints: string[];
  bridge?:    string;
}

export interface SolutionFeature {
  icon:  string;
  text:  string;
}

export interface SolutionData {
  eyebrow:    string;
  headline:   string;
  intro:      string;
  features:   SolutionFeature[];
  highlight?: string;
}

export interface Step {
  title:       string;
  description: string;
  outcome?:    string;
}

export interface HowItWorksData {
  eyebrow:     string;
  headline:    string;
  subheadline: string;
  steps:       Step[];
}

export interface PackageData {
  name:        string;
  price:       string;
  capacity:    string;
  description: string;
  features:    string[];
  highlighted: boolean;
  idealFor:    string;
}

export interface OfferData {
  eyebrow:     string;
  headline:    string;
  subheadline: string;
  packages:    PackageData[];
  bonuses:     string[];
  ctaText:     string;
  ctaHref:     string;
  guarantee?:  string;
}

export interface ForWhoItem {
  text: string;
}

export interface ForWhoData {
  eyebrow:  string;
  headline: string;
  isFor:    string[];
  notFor:   string[];
}

export interface FAQItem {
  question: string;
  answer:   string;
}

export interface FAQData {
  eyebrow:  string;
  headline: string;
  items:    FAQItem[];
}

export interface Testimonial {
  quote:   string;
  name:    string;
  role?:   string;
  result?: string;
}

export interface VideoTestimonial {
  mp4:      string;
  webm:     string;
  poster:   string;
  caption:  string;
  tag:      string;
}

export interface SocialProofData {
  eyebrow:      string;
  headline:     string;
  credibility:  string[];
  videos?:      VideoTestimonial[];
  testimonials: Testimonial[];
  note?:        string;
}

export interface GuaranteeData {
  eyebrow:    string;
  headline:   string;
  guarantees: { title: string; description: string }[];
}

export interface FinalCTAData {
  headline:    string;
  subheadline: string;
  ctaText:     string;
  ctaHref:     string;
  guarantee?:  string;
}

export interface FunnelData {
  meta: {
    title:       string;
    description: string;
    ogImage?:    string;
  };
  whatsappNumber: string;
  whatsappMessage: string;
  hero:         HeroData;
  problem:      ProblemData;
  solution:     SolutionData;
  howItWorks:   HowItWorksData;
  offer:        OfferData;
  forWho:       ForWhoData;
  faq:          FAQData;
  socialProof:  SocialProofData;
  guarantee:    GuaranteeData;
  finalCta:     FinalCTAData;
}
