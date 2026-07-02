/**
 * Author registry. Single source of truth for byline + Person schema across the site.
 * Bylines credit the in-house 4 Aces Visa Immigration Team (Organization schema).
 * Personal names and RCIC license numbers are intentionally NOT rendered until verified
 * credentials are supplied — this keeps the site CICC-compliant.
 */

export interface Author {
  id: string;
  name: string;
  jobTitle: string;
  organization: string;
  bio: string;
  shortBio: string;
  yearsExperience: number;
  image: string;
  url: string;
  sameAs: string[];
  email: string;
  telephone: string;
}

export const SITE = "https://www.4acesvisa.com";

export const authors: Record<string, Author> = {
  "sahil-garg": {
    id: "sahil-garg",
    name: "4 Aces Visa Immigration Team",
    jobTitle: "Immigration Consultancy Team",
    organization: "4 Aces Visa",
    yearsExperience: 12,
    shortBio:
      "The 4 Aces Visa Immigration Team has 12+ years combined experience guiding skilled professionals, students and families through Canadian, Australian, UK and German immigration pathways.",
    bio:
      "The 4 Aces Visa Immigration Team has, over the last 12+ years, guided thousands of skilled workers, international students and families through Express Entry, PNP, LMIA-backed work permits, study permits and family sponsorship across Canada, Australia, the United Kingdom and Germany. The team writes and reviews every guide on this site to make sure the information matches what IRCC, the Department of Home Affairs, UK Home Office and BAMF actually publish — not what social media claims.",
    image: `${SITE}/og-default.jpg`,
    url: `${SITE}/about`,
    sameAs: [
      "https://www.linkedin.com/company/4acesvisa",
      "https://www.facebook.com/4acesvisa",
    ],
    email: "sahil280389@gmail.com",
    telephone: "+1-647-862-2190",
  },
};

export const defaultAuthor = authors["sahil-garg"];

/** Returns a schema.org Organization JSON-LD object for the byline entity. */
export function getAuthorSchema(authorId: string = "sahil-garg") {
  const a = authors[authorId] ?? defaultAuthor;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/about#${a.id}`,
    name: a.name,
    description: a.shortBio,
    logo: a.image,
    url: a.url,
    sameAs: a.sameAs,
    email: a.email,
    telephone: a.telephone,
  };
}

/** Reviewer block — until a CICC-licensed RCIC is named, we credit the in-house team. */
export const reviewer = {
  name: "4 Aces Visa Immigration Team",
  url: `${SITE}/about`,
};

export function getReviewerSchema() {
  return {
    "@type": "Organization",
    name: reviewer.name,
    url: reviewer.url,
  };
}
