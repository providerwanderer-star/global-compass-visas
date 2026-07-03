// Wave 2 — Origin geo targeting (USA, UK, Australia → Canada)
// Pure additive data. Powers /usa, /uk, /australia and /from/:country/:city.

export interface OriginCity {
  slug: string;
  name: string;
  countrySlug: string;
  hook: string;
  whyMove: string[];
  topPathways: string[];
  destinationCities: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

export interface OriginCountry {
  slug: "usa" | "uk" | "australia";
  name: string;
  demonym: string;
  flag: string;
  audience: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  whyCanada: { title: string; body: string }[];
  pathways: {
    name: string;
    slug?: string;
    summary: string;
    bestFor: string;
    timeline: string;
  }[];
  faqs: { q: string; a: string }[];
  cities: string[];
  lastUpdated: string;
}

const today = new Date().toISOString().slice(0, 10);

const usaCities: OriginCity[] = [
  {
    slug: "seattle",
    name: "Seattle",
    countrySlug: "usa",
    hook: "H-1B holders at Amazon, Microsoft and Meta facing green-card backlogs of 50+ years.",
    whyMove: [
      "Vancouver is a 2.5-hour drive — keep your tech network and weekend life intact.",
      "Canadian PR in 6–18 months via Express Entry vs. decades-long EB-2/EB-3 waits.",
      "No H-1B lottery, no employer dependency, no 60-day grace-period anxiety.",
      "Big Tech has Canadian offices (Amazon YVR, Microsoft Vancouver) — internal transfers possible.",
      "Spouse gets an open work permit on day one of your work permit."
    ],
    topPathways: ["Express Entry (CEC/FSW)", "Global Talent Stream (2-week LMIA)", "BC PNP Tech"],
    destinationCities: ["Vancouver", "Toronto", "Calgary"],
    faqs: [
      {
        q: "Can I move from Seattle to Vancouver while keeping my Amazon job?",
        a: "Yes. Amazon, Microsoft, and Meta all have Vancouver offices and routinely transfer staff via intra-company transfer (ICT) work permits, which can be issued in days. You can then convert to PR via Express Entry once you have 1 year of Canadian work experience.",
      },
      {
        q: "How long does PR take from Seattle vs. waiting for a US green card?",
        a: "Express Entry from Seattle typically takes 6–12 months end to end. The current EB-2/EB-3 backlog for India-born applicants is 50–80+ years.",
      }
    ],
    metaTitle: "Seattle to Canada Immigration — H-1B to Canadian PR in 12 Months",
    metaDescription: "Skip the green-card backlog. Move from Seattle to Vancouver or Toronto via Express Entry, BC PNP Tech, or intra-company transfer.",
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    countrySlug: "usa",
    hook: "Bay Area tech workers, startup founders, and laid-off H-1B holders.",
    whyMove: [
      "Toronto and Vancouver are top-3 North American tech hubs — same salaries, lower cost of living.",
      "Canada's Start-Up Visa gives PR to founders with $200K+ in committed VC.",
      "Post-layoff: 60-day H-1B grace period vs. unlimited time on a Canadian work permit.",
      "Single-payer healthcare ends $25K/year insurance premiums.",
      "Citizenship in 3 years vs. 5+ in the US."
    ],
    topPathways: ["Express Entry (CEC/FSW)", "Start-Up Visa", "Global Talent Stream"],
    destinationCities: ["Toronto", "Vancouver", "Montreal"],
    faqs: [
      {
        q: "I just got laid off from a Bay Area startup on H-1B. What's the fastest Canadian option?",
        a: "The Global Talent Stream issues work permits in 2 weeks for tech roles. With a Canadian job offer you can be working in Toronto or Vancouver before your H-1B grace period expires.",
      },
      {
        q: "Does my US tech experience count for Canadian Express Entry?",
        a: "Yes — every year of full-time skilled work in the US counts toward your CRS score and FSW eligibility, with no degree re-credentialing needed beyond an ECA.",
      }
    ],
    metaTitle: "San Francisco to Canada — Bay Area Tech Workers Move to Toronto & Vancouver",
    metaDescription: "From SF to Toronto or Vancouver: Express Entry, Start-Up Visa, and Global Talent Stream pathways for Bay Area tech workers and founders.",
  },
  {
    slug: "new-york",
    name: "New York",
    countrySlug: "usa",
    hook: "NYC finance, consulting, and creative professionals tired of US visa limbo.",
    whyMove: [
      "Toronto is Canada's financial capital — Big 5 banks, asset managers, fintech all here.",
      "Direct 1.5-hour flights NYC ↔ Toronto, same Eastern time zone.",
      "MBA and consulting backgrounds score 470+ CRS easily.",
      "Canadian PR is permanent — no renewals, no employer ties.",
      "Tax-advantaged TFSA and RRSP plus universal healthcare."
    ],
    topPathways: ["Express Entry (FSW/CEC)", "Ontario PNP Human Capital Priorities", "Provincial Nominee streams"],
    destinationCities: ["Toronto", "Montreal", "Ottawa"],
    faqs: [
      {
        q: "Will my Wall Street salary translate to Toronto?",
        a: "Toronto Bay Street pays roughly 70–85% of NYC base in CAD, but cost of living is often 30–40% lower, so net take-home is usually comparable or better.",
      },
      {
        q: "How does Ontario PNP work for finance professionals?",
        a: "Ontario's Human Capital Priorities Stream regularly invites Express Entry candidates with 460+ CRS and tech/finance NOCs, fast-tracking PR in 6–9 months.",
      }
    ],
    metaTitle: "New York to Canada — NYC Professionals Move to Toronto & Montreal",
    metaDescription: "Move from New York to Toronto via Express Entry or Ontario PNP. Designed for Wall Street, consulting, and tech professionals on H-1B or O-1.",
  },
  {
    slug: "austin",
    name: "Austin",
    countrySlug: "usa",
    hook: "Austin tech workers and startup operators looking for a Canadian Plan B.",
    whyMove: [
      "Toronto-Waterloo corridor mirrors Austin's startup density without the visa caps.",
      "Calgary and Vancouver tech scenes are growing fast with PNP-tech fast-tracks.",
      "Get PR before your H-1B clock runs out, then keep working remotely for US employers.",
      "Spouse gets open work permit; kids get free public schooling.",
      "BC and Ontario tech draws happen monthly — predictable timeline."
    ],
    topPathways: ["Express Entry (CEC)", "BC PNP Tech", "Ontario Tech Draws"],
    destinationCities: ["Toronto", "Vancouver", "Calgary"],
    faqs: [
      {
        q: "Can I keep my Austin tech job and move to Canada?",
        a: "Yes, if your employer allows remote work from Canada. Once you're a Canadian PR, you can work for any US employer remotely with no immigration risk.",
      },
      {
        q: "Is Toronto really comparable to Austin for tech?",
        a: "Toronto-Waterloo has 250K+ tech workers, the second-largest tech hub in North America after the Bay Area, with offices for Google, Shopify, OpenAI, Cohere, and most US scale-ups.",
      }
    ],
    metaTitle: "Austin to Canada — Texas Tech Workers Move to Toronto & Vancouver",
    metaDescription: "Austin tech workers: get Canadian PR via Express Entry or BC PNP Tech. Skip H-1B caps, keep remote US salary, gain a permanent backup plan.",
  },
  {
    slug: "boston",
    name: "Boston",
    countrySlug: "usa",
    hook: "Boston biotech, academia, and healthcare workers with stalled green cards.",
    whyMove: [
      "Toronto and Montreal have world-class biotech and pharma clusters with active hiring.",
      "Canadian universities recognize US PhDs and postdocs without re-credentialing.",
      "Healthcare workers benefit from Canada-wide credential pathways and loan-forgiveness in underserved areas.",
      "Quebec PEQ and Ontario PNP have streams for researchers and PhDs.",
      "Public healthcare means no $1,500/month family insurance."
    ],
    topPathways: ["Express Entry (FSW)", "Quebec Skilled Worker", "Ontario PhD Stream"],
    destinationCities: ["Toronto", "Montreal", "Vancouver"],
    faqs: [
      {
        q: "I'm a postdoc at MIT — what's my best Canadian pathway?",
        a: "Ontario's PhD graduate stream and Quebec's PEQ both prioritize PhD holders. You can apply for PR directly without a Canadian job offer, with processing in 6–12 months.",
      },
      {
        q: "Will my US medical license transfer to Canada?",
        a: "US-trained MDs go through the MCC qualifying exams. Most provinces have practice-ready assessments that let you start working within 3–6 months of arrival.",
      }
    ],
    metaTitle: "Boston to Canada — Biotech, Academia & Healthcare Workers Move North",
    metaDescription: "Boston PhDs, postdocs, and healthcare workers: Express Entry, Quebec PEQ, and Ontario PhD streams to Canadian PR. Free assessment.",
  }
];

const ukCities: OriginCity[] = [
  {
    slug: "london",
    name: "London",
    countrySlug: "uk",
    hook: "London finance, tech, and professional-services workers seeking better quality of life.",
    whyMove: [
      "Canadian PR is permanent — no Settled Status reviews, no Skilled Worker visa renewals.",
      "Toronto and Vancouver salaries (CAD) often beat London (GBP) on purchasing-power basis.",
      "Space — actual houses, gardens, and commutes under 30 minutes.",
      "British qualifications and English fluency give you near-maximum CRS language scores.",
      "Citizenship in 3 years; dual UK/Canadian citizenship is permitted."
    ],
    topPathways: ["Express Entry (FSW/CEC)", "Atlantic Immigration Program", "Provincial Nominee Programs"],
    destinationCities: ["Toronto", "Vancouver", "Calgary"],
    faqs: [
      {
        q: "Will I lose my UK pension if I move to Canada?",
        a: "No. UK State Pension is payable in Canada, though annual increases are frozen unless you also qualify for QPP/CPP. Private and workplace pensions transfer or remain accessible.",
      },
      {
        q: "How does Canadian Express Entry compare to UK Skilled Worker?",
        a: "Express Entry leads to permanent residence in 6–12 months with no employer dependency. UK Skilled Worker requires sponsorship, 5 years to ILR, and ongoing employer ties.",
      }
    ],
    metaTitle: "London to Canada — UK Professionals Move to Toronto & Vancouver",
    metaDescription: "From London to Toronto: Express Entry pathway for British finance, tech, and professional workers. Permanent residence in 6–12 months.",
  },
  {
    slug: "manchester",
    name: "Manchester",
    countrySlug: "uk",
    hook: "Manchester tech, healthcare, and trades workers ready for the Canadian PR pathway.",
    whyMove: [
      "Calgary and Edmonton have Manchester-like cost of living with higher salaries.",
      "NHS nurses and doctors are heavily recruited by Canadian provinces with relocation packages.",
      "Skilled trades have direct PR via Federal Skilled Trades.",
      "Manchester's tech scene maps well to Toronto, Vancouver, and Halifax.",
      "Public healthcare maintained without NHS workforce pressure."
    ],
    topPathways: ["Express Entry (FST/FSW)", "Atlantic Immigration Program", "Alberta Advantage Stream"],
    destinationCities: ["Calgary", "Toronto", "Halifax"],
    faqs: [
      {
        q: "I'm an NHS nurse — what's the fastest route to Canada?",
        a: "Most provinces have direct nursing streams. Ontario, BC, and Nova Scotia issue work permits within weeks after NNAS credential recognition; PR follows in 12–18 months.",
      },
      {
        q: "Are UK trades qualifications recognized in Canada?",
        a: "Yes, via the Red Seal program. UK time-served tradespeople usually qualify for challenge exams to earn the Red Seal, which is recognized in every province.",
      }
    ],
    metaTitle: "Manchester to Canada — UK Tech, Trades & NHS Workers Move North",
    metaDescription: "Manchester to Calgary, Toronto, or Halifax: Express Entry and Atlantic Immigration for UK tech, trades, and NHS professionals.",
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    countrySlug: "uk",
    hook: "Birmingham professionals, students, and engineers planning a Canadian future.",
    whyMove: [
      "Engineering NOCs are in shortage across Ontario, Alberta, and BC.",
      "Birmingham university grads can apply directly via Federal Skilled Worker.",
      "Predictable PR timeline beats Skilled Worker visa renewals and ILR uncertainty.",
      "Strong South Asian community in Toronto and Brampton mirrors Birmingham demographics.",
      "Family reunification is straightforward — bring spouse and kids on the same PR application."
    ],
    topPathways: ["Express Entry (FSW)", "Ontario Human Capital Priorities", "BC Skills Immigration"],
    destinationCities: ["Toronto", "Brampton", "Calgary"],
    faqs: [
      {
        q: "Do UK engineering qualifications transfer to Canada?",
        a: "ICE, IMechE, and IET memberships are recognized by Engineers Canada. You'll need a P.Eng licence to use the protected title, but you can work as an EIT immediately while licensing.",
      },
      {
        q: "Is the Brampton/Mississauga area really comparable to Birmingham?",
        a: "Demographically and culturally, yes — large Punjabi, Gujarati, and South Asian communities, gurdwaras, mandirs, and authentic restaurants are everywhere across the GTA.",
      }
    ],
    metaTitle: "Birmingham to Canada — Engineers, Grads & Families Move to Toronto",
    metaDescription: "Birmingham to Toronto, Brampton, or Calgary: Canadian PR via Express Entry and Ontario PNP for UK engineers and families.",
  }
];

const ausCities: OriginCity[] = [
  {
    slug: "sydney",
    name: "Sydney",
    countrySlug: "australia",
    hook: "Sydney tech, finance, and skilled-worker visa holders weighing Canada vs. Australia.",
    whyMove: [
      "Canadian PR processing is faster than Australia's 189/190 in 2025–2026 (6–12 months vs. 18–36).",
      "Sydney cost of living is among the world's highest — Toronto and Vancouver are slightly cheaper.",
      "Canadian citizenship in 3 years, then easy travel back to AU/UK.",
      "Most Australian work experience counts at maximum CRS points.",
      "Healthcare and parental leave are comparable to Australia's Medicare and PPL."
    ],
    topPathways: ["Express Entry (FSW/CEC)", "BC PNP", "Ontario PNP"],
    destinationCities: ["Vancouver", "Toronto", "Calgary"],
    faqs: [
      {
        q: "Should I pursue Australian PR (subclass 189) or Canadian PR?",
        a: "If your CRS is 470+ or you have Canadian work experience, Canada is usually faster and cheaper. Subclass 189 invitation rounds have shrunk dramatically since 2023.",
      },
      {
        q: "Does my Australian work experience count for Canadian Express Entry?",
        a: "Yes — every year of skilled (NOC TEER 0/1/2/3) employment in Australia adds full points to your CRS, identical to UK or US experience.",
      }
    ],
    metaTitle: "Sydney to Canada — Australian Skilled Workers Move to Vancouver & Toronto",
    metaDescription: "From Sydney to Vancouver or Toronto: Canadian PR via Express Entry in 6–12 months — faster than Australia's 189/190 in 2025.",
  },
  {
    slug: "melbourne",
    name: "Melbourne",
    countrySlug: "australia",
    hook: "Melbourne creatives, tech, and academic workers exploring Canadian PR.",
    whyMove: [
      "Toronto and Montreal cultural scenes rival Melbourne's at lower cost.",
      "Canadian Express Entry is points-based and predictable — no occupation ceilings like SkillSelect.",
      "Quebec offers French-track PR for bilingual Melbournians.",
      "Citizenship in 3 years preserves dual nationality with Australia.",
      "Stronger winter, milder summer — but no bushfires, no extreme heat domes."
    ],
    topPathways: ["Express Entry (FSW/CEC)", "Quebec Skilled Worker (PEQ)", "Ontario PNP"],
    destinationCities: ["Toronto", "Montreal", "Vancouver"],
    faqs: [
      {
        q: "Is Quebec a good option if I already speak French?",
        a: "Yes. The Quebec Skilled Worker and PEQ programs prioritize French speakers and have been reopening to applicants with B2+ French. Processing is independent of federal Express Entry.",
      },
      {
        q: "How does Toronto's tech market compare to Melbourne's?",
        a: "Toronto has roughly 4x the tech workforce of Melbourne with similar AUD-equivalent salaries and a denser ecosystem of US-headquartered companies hiring locally.",
      }
    ],
    metaTitle: "Melbourne to Canada — Australians Move to Toronto, Montreal & Vancouver",
    metaDescription: "Melbourne to Canada: Express Entry, Quebec PEQ, and Ontario PNP pathways for Australian skilled workers, creatives, and academics.",
  },
  {
    slug: "perth",
    name: "Perth",
    countrySlug: "australia",
    hook: "Perth mining, oil & gas, and trades workers transitioning to Canadian energy hubs.",
    whyMove: [
      "Calgary and Edmonton's energy sector hires Perth's mining and O&G workforce directly.",
      "Federal Skilled Trades and Alberta Advantage Stream fast-track trades to PR.",
      "Red Seal recognition of Australian trade tickets via challenge exams.",
      "Comparable lifestyle: outdoor culture, big sky, low density — Calgary is often called Perth's Canadian twin.",
      "PR via Express Entry in 6–9 months for high-CRS trades and engineers."
    ],
    topPathways: ["Express Entry (FST)", "Alberta Advantage Stream", "BC Skills Immigration"],
    destinationCities: ["Calgary", "Edmonton", "Vancouver"],
    faqs: [
      {
        q: "Are Australian mining and O&G qualifications recognized in Alberta?",
        a: "Yes. Most engineering qualifications are recognized via APEGA, and trades transfer through Red Seal challenge exams. Many Calgary energy firms actively recruit from Perth.",
      },
      {
        q: "Is Calgary really like Perth?",
        a: "Lifestyle-wise, very similar — outdoorsy, family-oriented, lower density than Toronto, with a strong energy economy.",
      }
    ],
    metaTitle: "Perth to Canada — Mining & O&G Workers Move to Calgary & Edmonton",
    metaDescription: "Perth to Calgary or Edmonton: Express Entry, Federal Skilled Trades, and Alberta Advantage for Australian mining, energy, and trades workers.",
  }
];

const allCities: OriginCity[] = [...usaCities, ...ukCities, ...ausCities];

export const originCountries: Record<string, OriginCountry> = {
  usa: {
    slug: "usa",
    name: "United States",
    demonym: "American",
    flag: "🇺🇸",
    audience: "H-1B holders, green-card backlog applicants, US tech workers, and laid-off professionals",
    metaTitle: "USA to Canada Immigration — H-1B to PR, Green Card Backlog Alternatives",
    metaDescription: "Move from USA to Canada via Express Entry, BC PNP Tech, or Global Talent Stream. Skip the green-card backlog. Free eligibility assessment.",
    h1: "USA to Canada Immigration: A Faster Path to Permanent Residence",
    intro:
      "If you're on H-1B, O-1, L-1, or stuck in a decades-long EB-2/EB-3 backlog, Canada offers permanent residence in 6–18 months with no employer dependency, no lottery, and no annual renewals. This guide covers every pathway available to US-based applicants in 2025–2026.",
    whyCanada: [
      {
        title: "Skip the green-card backlog",
        body: "EB-2 and EB-3 backlogs for India-born applicants currently exceed 50 years. Canadian Express Entry processes most PR applications in 6–12 months with no country-of-birth penalty.",
      },
      {
        title: "Keep your tech career intact",
        body: "Vancouver, Toronto, and Calgary host offices for Amazon, Microsoft, Google, Meta, Shopify, OpenAI, Cohere, and most US scale-ups. Internal transfers are routine.",
      },
      {
        title: "Permanent status, no employer ties",
        body: "Canadian PR is permanent. No 60-day grace periods, no H-1B portability anxiety, no renewals every 3 years.",
      },
      {
        title: "Faster path to citizenship",
        body: "3 years of physical presence as a PR earns Canadian citizenship — half the US naturalization timeline. Dual citizenship is permitted.",
      }
    ],
    pathways: [
      {
        name: "Express Entry (CEC / FSW)",
        slug: "express-entry",
        summary:
          "Points-based federal program. CRS scores of 470+ in 2025 are typically invited within 2–6 months. US work experience counts at full value.",
        bestFor: "Tech, finance, engineering, and skilled professionals on H-1B/O-1.",
        timeline: "6–12 months from ITA to PR.",
      },
      {
        name: "Global Talent Stream (LMIA + Work Permit)",
        summary:
          "2-week processing for Canadian employers hiring tech roles. Convert to PR via CEC after 1 year of Canadian work.",
        bestFor: "Laid-off H-1B holders or anyone with a Canadian job offer in tech NOCs.",
        timeline: "2 weeks to work permit; 1–2 years to PR.",
      },
      {
        name: "BC PNP Tech / Ontario Tech Draws",
        summary:
          "Provincial nominee streams that fast-track tech workers. BC PNP Tech invites weekly; Ontario tech draws happen monthly.",
        bestFor: "Tech workers willing to commit to BC or Ontario.",
        timeline: "6–9 months end-to-end.",
      },
      {
        name: "Start-Up Visa",
        summary:
          "Direct PR for founders backed by a designated VC ($200K+) or angel group ($75K+). No CRS requirement.",
        bestFor: "Bay Area and NYC founders with traction or committed funding.",
        timeline: "12–18 months to PR.",
      },
      {
        name: "Intra-Company Transfer (ICT)",
        summary:
          "If your US employer has a Canadian entity, ICT work permits can be issued in days with no LMIA required.",
        bestFor: "Employees of Amazon, Microsoft, Meta, Google, and other multinationals.",
        timeline: "Days to weeks for work permit; PR via CEC after 1 year.",
      }
    ],
    faqs: [
      {
        q: "Can I move to Canada from the USA without a job offer?",
        a: "Yes. Express Entry FSW and most PNPs do not require a Canadian job offer. A CRS score of 470+ or a provincial nomination is what matters.",
      },
      {
        q: "How long does it take to move from USA to Canada?",
        a: "Express Entry: 6–12 months from ITA. Work permit (Global Talent Stream): 2 weeks. PR via PNP: 6–9 months. Start-Up Visa: 12–18 months.",
      },
      {
        q: "Will I have to give up my US green card or H-1B?",
        a: "No. You can hold US visa status and Canadian PR simultaneously, as long as you meet residency requirements for each.",
      },
      {
        q: "What happens to my 401(k) and US retirement accounts?",
        a: "401(k) and IRA accounts can be left in the US to grow. Canada has a tax treaty preventing double taxation. Many people consolidate into RRSPs gradually after PR.",
      },
      {
        q: "Is the Canadian healthcare system actually better?",
        a: "It's universal and tax-funded — no premiums, no employer dependency, no surprise bills. Wait times for specialists can be longer than top-tier US private care, but coverage is universal.",
      }
    ],
    cities: usaCities.map((c) => c.slug),
    lastUpdated: today,
  },
  uk: {
    slug: "uk",
    name: "United Kingdom",
    demonym: "British",
    flag: "🇬🇧",
    audience: "UK skilled workers, NHS staff, trades professionals, and post-Brexit families seeking permanent residence",
    metaTitle: "UK to Canada Immigration — Move from London, Manchester & Birmingham",
    metaDescription: "From the UK to Canada: Express Entry, Atlantic Immigration, and PNP pathways for British professionals, NHS workers, and trades.",
    h1: "UK to Canada Immigration: Permanent Residence for British Professionals",
    intro:
      "Brexit, the cost-of-living crisis, and stalled Skilled Worker visa pathways have made Canada the top emigration destination for UK citizens since 2022. This guide covers every Canadian PR pathway available to British applicants — from Express Entry to the Atlantic Immigration Program.",
    whyCanada: [
      {
        title: "Permanent status from day one",
        body: "No Settled Status reviews, no Skilled Worker visa renewals every 5 years. Canadian PR is permanent and renewable indefinitely.",
      },
      {
        title: "Maximum language points",
        body: "Native English fluency means easy CLB 9+ on IELTS or CELPIP, which translates to near-maximum CRS language points.",
      },
      {
        title: "Recognised qualifications",
        body: "UK degrees, NHS clinical qualifications, ICE/IMechE engineering memberships, and time-served trade tickets all map to Canadian credentials.",
      },
      {
        title: "Citizenship in 3 years",
        body: "Dual UK/Canadian citizenship is permitted. Maintain your UK passport while gaining Canadian rights.",
      }
    ],
    pathways: [
      {
        name: "Express Entry (FSW / CEC)",
        slug: "express-entry",
        summary:
          "Points-based federal program. UK applicants typically score well due to language, education, and work experience.",
        bestFor: "Most British professionals with a Bachelor's degree and 1+ years of skilled work.",
        timeline: "6–12 months from ITA to PR.",
      },
      {
        name: "Atlantic Immigration Program",
        summary:
          "Employer-driven PR for jobs in Nova Scotia, New Brunswick, PEI, and Newfoundland. Lower CRS bar, faster processing.",
        bestFor: "Healthcare, trades, and hospitality workers open to Atlantic Canada.",
        timeline: "6–9 months from job offer to PR.",
      },
      {
        name: "Provincial Nominee Programs (PNP)",
        summary:
          "Each province (Ontario, BC, Alberta, Saskatchewan, etc.) runs its own streams. UK applicants are welcomed across all provinces.",
        bestFor: "Targeting a specific province for work or family reasons.",
        timeline: "6–12 months end-to-end.",
      },
      {
        name: "Federal Skilled Trades (FST)",
        summary:
          "Direct Express Entry stream for plumbers, electricians, welders, mechanics, and other Red Seal trades.",
        bestFor: "Time-served UK tradespeople with a job offer or trade certification.",
        timeline: "6–12 months to PR.",
      },
      {
        name: "Quebec Skilled Worker",
        summary:
          "Quebec's independent PR system. French language is a major advantage but not always required.",
        bestFor: "Bilingual UK applicants or those open to French immersion.",
        timeline: "12–24 months.",
      }
    ],
    faqs: [
      {
        q: "Do I need a job offer to move from the UK to Canada?",
        a: "No. Express Entry FSW and most PNPs do not require a job offer. A strong CRS score (470+) or a provincial nomination is sufficient.",
      },
      {
        q: "How does my UK degree count toward Canadian PR?",
        a: "You'll need an Educational Credential Assessment (ECA) from WES, ICAS, or another designated body. UK Bachelor's = Canadian Bachelor's; Master's = Master's. Full CRS points apply.",
      },
      {
        q: "Can NHS nurses and doctors move to Canada quickly?",
        a: "Yes — most provinces have nurse and physician streams with relocation support. NNAS credentialing for nurses takes 4–8 months; provincial registration follows.",
      },
      {
        q: "What about my UK pension?",
        a: "UK State Pension is payable in Canada but is not uprated annually unless you also qualify for CPP/QPP. Private pensions remain accessible.",
      },
      {
        q: "Can I bring my family on the same application?",
        a: "Yes. Spouse and dependent children (under 22) are included in your PR application at no extra processing fee per dependant beyond standard government charges.",
      }
    ],
    cities: ukCities.map((c) => c.slug),
    lastUpdated: today,
  },
  australia: {
    slug: "australia",
    name: "Australia",
    demonym: "Australian",
    flag: "🇦🇺",
    audience: "Australian skilled workers, 189/190 hopefuls, mining and trades professionals comparing Canada vs. Australia",
    metaTitle: "Australia to Canada Immigration — Move from Sydney, Melbourne, Perth",
    metaDescription: "From Australia to Canada: Express Entry beats subclass 189/190 timelines in 2025. Pathways for Australian skilled workers, trades, and energy professionals.",
    h1: "Australia to Canada Immigration: Faster PR Than Subclass 189 in 2025",
    intro:
      "Australian skilled-migration invitation rounds have shrunk dramatically since 2023, with subclass 189 timelines now stretching past 24 months. Canadian Express Entry, in contrast, runs every 2 weeks and processes most PR applications in 6–12 months. This guide compares your options and walks through every Canadian pathway available to Australian applicants.",
    whyCanada: [
      {
        title: "Faster, more predictable PR",
        body: "Express Entry runs draws every 2 weeks; subclass 189 has had quarterly or longer gaps since 2023. End-to-end PR processing is currently 6–12 months in Canada vs. 18–36 in Australia.",
      },
      {
        title: "Cost of living relief",
        body: "Sydney is consistently in the world's top 10 most expensive cities. Calgary, Edmonton, and Ottawa are significantly more affordable.",
      },
      {
        title: "Comparable institutions",
        body: "Westminster-derived legal system, similar financial regulation, healthcare structure, and education system make the transition culturally low-friction.",
      },
      {
        title: "Citizenship + dual nationality",
        body: "Canadian citizenship in 3 years; Australia permits dual citizenship.",
      }
    ],
    pathways: [
      {
        name: "Express Entry (FSW / CEC)",
        slug: "express-entry",
        summary:
          "Points-based federal program with biweekly invitation rounds. Australian work experience counts at full value.",
        bestFor: "Most Australian professionals with skilled occupation experience and English fluency.",
        timeline: "6–12 months from ITA to PR.",
      },
      {
        name: "Provincial Nominee Programs (BC, Ontario, Alberta)",
        summary:
          "BC PNP Tech, Ontario Human Capital Priorities, and Alberta Advantage Stream all welcome Australian applicants.",
        bestFor: "Targeting Vancouver, Toronto, Calgary, or Edmonton specifically.",
        timeline: "6–9 months.",
      },
      {
        name: "Federal Skilled Trades (FST)",
        summary:
          "Direct PR pathway for trades. Australian Cert IV/Diploma trades qualifications transfer via Red Seal challenge exams.",
        bestFor: "Australian electricians, plumbers, welders, mechanics, and miners.",
        timeline: "6–12 months.",
      },
      {
        name: "Quebec Skilled Worker (PEQ)",
        summary:
          "Independent provincial system that prioritises French speakers; recently reopened to broader applicants.",
        bestFor: "Bilingual Australians or those targeting Montreal.",
        timeline: "12–24 months.",
      },
      {
        name: "Start-Up Visa",
        summary:
          "Direct PR for founders with designated VC or angel funding.",
        bestFor: "Australian founders ready to base their company in Canada.",
        timeline: "12–18 months.",
      }
    ],
    faqs: [
      {
        q: "Should I apply for Australian PR (subclass 189) or Canadian PR?",
        a: "If you have a CRS of 470+ or Canadian work experience, Canada is typically faster. Subclass 189 invitations have been sparse since 2023, while Canadian Express Entry runs every 2 weeks.",
      },
      {
        q: "Does my Australian work experience count for Canadian PR?",
        a: "Yes. Skilled work in NOC TEER 0/1/2/3 occupations counts at the same rate whether earned in Australia, the UK, the US, or anywhere else.",
      },
      {
        q: "Are Australian trades qualifications recognised in Canada?",
        a: "Yes — via the Red Seal program. Australian Cert IV holders typically need to sit a challenge exam in their target province.",
      },
      {
        q: "What about Medicare and superannuation?",
        a: "Canadian provincial healthcare replaces Medicare. Superannuation can be left in Australia to grow; Canada has a tax treaty preventing double taxation.",
      },
      {
        q: "Is CANZUK a real pathway?",
        a: "CANZUK is a political proposal, not a current immigration program. For now, Australians use standard Canadian PR pathways like Express Entry.",
      }
    ],
    cities: ausCities.map((c) => c.slug),
    lastUpdated: today,
  },
};

export const originCities: Record<string, OriginCity> = Object.fromEntries(
  allCities.map((c) => [`${c.countrySlug}/${c.slug}`, c]),
);

export function getOriginCountry(slug: string): OriginCountry | undefined {
  return originCountries[slug as keyof typeof originCountries];
}

export function getOriginCity(country: string, city: string): OriginCity | undefined {
  return originCities[`${country}/${city}`];
}

export const allOriginCountrySlugs = Object.keys(originCountries);
export const allOriginCityPairs = allCities.map((c) => ({
  country: c.countrySlug,
  city: c.slug,
}));
