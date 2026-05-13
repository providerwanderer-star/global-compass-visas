/**
 * Author registry. Single source of truth for byline + Person schema across the site.
 * Founder/author name is **Sahil Garg** (NEVER "Sahil Sharma").
 * No fabricated RCIC license numbers — we do not claim CICC registration in schema until a real number is provided.
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
    name: "Sahil Garg",
    jobTitle: "Founder",
    organization: "4 Aces Visa",
    yearsExperience: 12,
    shortBio:
      "Founder of 4 Aces Visa. 12+ years guiding skilled professionals, students and families through Canadian, Australian, UK and German immigration pathways.",
    bio:
      "Sahil Garg is the Founder of 4 Aces Visa. Over the last 12+ years he has personally guided thousands of skilled workers, international students and families through Express Entry, PNP, LMIA-backed work permits, study permits and family sponsorship across Canada, Australia, the United Kingdom and Germany. He writes and reviews every guide on this site to make sure the information matches what IRCC, the Department of Home Affairs, UK Home Office and BAMF actually publish — not what social media claims.",
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

/** Returns a schema.org Person JSON-LD object for the given author id. */
export function getAuthorSchema(authorId: string = "sahil-garg") {
  const a = authors[authorId] ?? defaultAuthor;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/about#${a.id}`,
    name: a.name,
    jobTitle: a.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: a.organization,
      url: SITE,
    },
    description: a.shortBio,
    image: a.image,
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
