export interface CityData {
  slug: string;
  name: string;
  country: "india" | "canada";
  region: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  services: string[];
  testimonial: { name: string; text: string; visa: string };
  faqs: { question: string; answer: string }[];
}

const indianCities: CityData[] = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Ahmedabad", "Kolkata",
  "Lucknow", "Jaipur", "Chandigarh", "Noida", "Gurugram", "Indore", "Patna", "Bhubaneswar",
  "Coimbatore", "Vadodara", "Nagpur", "Rajkot", "Varanasi", "Kanpur", "Nashik", "Agra", "Cochin"
].map((name) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return {
    slug,
    name,
    country: "india" as const,
    region: "India",
    metaTitle: `Best Immigration Consultant in ${name} | Canada, Australia & Germany PR – 4 Aces Visa`,
    metaDescription: `Looking for a trusted immigration consultant in ${name}? 4 Aces Visa helps with Canada PR, Australia migration, Germany work visa, study permits & more. Free assessment.`,
    intro: `Are you in ${name} and dreaming of settling abroad? 4 Aces Visa is your trusted immigration partner in ${name}, offering expert guidance for Canada PR, Australia skilled migration, and Germany Job Seeker Visa. Our ${name} team has helped hundreds of local professionals and families achieve their global immigration goals with a 98% success rate.`,
    services: [
      `Canada Express Entry PR from ${name}`,
      `Australia Skilled Migration (189/190/491)`,
      `Germany Job Seeker Visa & EU Blue Card`,
      `Study Visa for Canada & Australia`,
      `Work Permits & LMIA Processing`,
      `Provincial Nominee Programs (PNP)`,
      `Family Sponsorship & Visitor Visa`,
    ],
    testimonial: {
      name: `Client from ${name}`,
      text: `4 Aces Visa made my Canada PR journey seamless. From document prep in ${name} to landing in Canada — every step was guided perfectly.`,
      visa: "Canada PR",
    },
    faqs: [
      { question: `Who is the best immigration consultant in ${name}?`, answer: `4 Aces Visa is rated among the top immigration consultants in ${name}, with a 98% success rate across Canada, Australia, and Germany immigration applications. We offer personalized pathway guidance, transparent pricing, and free initial assessments.` },
      { question: `How much does Canada PR cost from ${name}?`, answer: `Canada PR costs from ${name} include government fees (CAD 1,365), IELTS exam (~₹16,000), WES evaluation (~₹15,000), and consulting fees. 4 Aces Visa offers transparent all-inclusive packages. Book a free consultation for an exact quote.` },
      { question: `Can I apply for Australia PR from ${name}?`, answer: `Yes! Many professionals from ${name} qualify for Australia's skilled migration program. You need 65+ points, an occupation on the Skilled Occupation List, and a valid skills assessment. Our ${name} team handles the entire process.` },
      { question: `What documents do I need for Germany visa from ${name}?`, answer: `For Germany Job Seeker Visa from ${name}, you need a recognized degree, proof of funds (~€11,208 blocked account), health insurance, and ideally B1 German proficiency. Contact our ${name} office for a document checklist.` },
    ],
  };
});

const canadianCities: CityData[] = [
  "Toronto", "Vancouver", "Calgary", "Edmonton", "Mississauga", "Ottawa", "Winnipeg",
  "Quebec City", "Brampton", "Surrey", "Halifax", "London ON", "Kitchener", "Victoria",
  "Saskatoon", "Regina", "Hamilton", "Windsor", "Kelowna", "Richmond", "Thunder Bay",
  "Moncton", "Saint John", "Charlottetown", "Prince George"
].map((name) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return {
    slug,
    name,
    country: "canada" as const,
    region: "Canada",
    metaTitle: `Immigration Services in ${name} | PR, Work Permit & Sponsorship – 4 Aces Visa`,
    metaDescription: `Need immigration help in ${name}? 4 Aces Visa offers PR applications, work permits, family sponsorship, and citizenship guidance in ${name}. Free consultation.`,
    intro: `Welcome to 4 Aces Visa ${name} — your local immigration partner for all visa and PR needs. Whether you're a newcomer looking to extend your status, sponsor your family, or transition from a work permit to permanent residency, our ${name} team provides hands-on guidance every step of the way.`,
    services: [
      `PR Application & Express Entry in ${name}`,
      `Work Permit Extensions & LMIA`,
      `Family Sponsorship (Spouse, Parents, Children)`,
      `Citizenship Application`,
      `Provincial Nominee Program (PNP)`,
      `Study Permit & Post-Graduation Work Permit`,
      `Visitor Visa & Super Visa`,
    ],
    testimonial: {
      name: `Client in ${name}`,
      text: `The ${name} team at 4 Aces Visa helped me sponsor my parents. The entire process was smooth and stress-free. Highly recommended!`,
      visa: "Family Sponsorship",
    },
    faqs: [
      { question: `What immigration services are available in ${name}?`, answer: `4 Aces Visa in ${name} offers Express Entry PR, work permits, family sponsorship, PNP applications, study permits, visitor visas, and citizenship guidance. Book a free consultation to discuss your specific needs.` },
      { question: `How long does PR processing take from ${name}?`, answer: `Express Entry PR processing from ${name} typically takes 6 months after receiving an Invitation to Apply (ITA). PNP-based applications may take 12-18 months. Our ${name} team expedites every step.` },
      { question: `Can I sponsor my family from ${name}?`, answer: `Yes! If you're a Canadian PR or citizen in ${name}, you can sponsor your spouse, common-law partner, parents, and dependent children. Processing times vary — spousal sponsorship takes about 12 months.` },
      { question: `Do you offer in-person consultations in ${name}?`, answer: `Yes, 4 Aces Visa offers both in-person and virtual consultations in ${name}. Book a free initial assessment online or call our ${name} office.` },
    ],
  };
});

export const cities: CityData[] = [...indianCities, ...canadianCities];
