import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle, Globe, GraduationCap, Briefcase, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserProfile, type Intent } from "@/hooks/useUserProfile";
import EligibilityForm from "@/components/EligibilityForm";

interface QuizOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

const questions: QuizQuestion[] = [
  {
    id: "goal",
    question: "What is your primary immigration goal?",
    subtitle: "This helps us narrow down the right visa category for you.",
    options: [
      { label: "Permanent Residency (PR)", value: "pr", icon: <Globe className="w-5 h-5" /> },
      { label: "Study Abroad", value: "study", icon: <GraduationCap className="w-5 h-5" /> },
      { label: "Work Visa / Job Search", value: "work", icon: <Briefcase className="w-5 h-5" /> },
      { label: "Family Sponsorship", value: "family", icon: <Heart className="w-5 h-5" /> },
      { label: "Visit / Tourism", value: "visit", icon: <MapPin className="w-5 h-5" /> },
    ],
  },
  {
    id: "age",
    question: "What is your age range?",
    subtitle: "Age affects your eligibility and points in most immigration programs.",
    options: [
      { label: "18–24 years", value: "18-24" },
      { label: "25–30 years", value: "25-30" },
      { label: "31–35 years", value: "31-35" },
      { label: "36–40 years", value: "36-40" },
      { label: "41+ years", value: "41+" },
    ],
  },
  {
    id: "education",
    question: "What is your highest level of education?",
    subtitle: "Higher education opens more pathways and earns more points.",
    options: [
      { label: "High School / Diploma", value: "highschool" },
      { label: "Bachelor's Degree", value: "bachelors" },
      { label: "Master's Degree", value: "masters" },
      { label: "PhD / Doctorate", value: "phd" },
      { label: "Trade / Vocational Certificate", value: "trade" },
    ],
  },
  {
    id: "experience",
    question: "How many years of skilled work experience do you have?",
    subtitle: "Relevant work experience is key for points-based systems.",
    options: [
      { label: "No experience", value: "0" },
      { label: "1–2 years", value: "1-2" },
      { label: "3–5 years", value: "3-5" },
      { label: "6–10 years", value: "6-10" },
      { label: "10+ years", value: "10+" },
    ],
  },
  {
    id: "english",
    question: "What is your English proficiency level?",
    subtitle: "Language scores heavily impact visa eligibility and CRS points.",
    options: [
      { label: "Beginner (IELTS 4–5)", value: "beginner" },
      { label: "Intermediate (IELTS 5.5–6)", value: "intermediate" },
      { label: "Proficient (IELTS 6.5–7)", value: "proficient" },
      { label: "Expert (IELTS 7.5+)", value: "expert" },
      { label: "Haven't taken a test yet", value: "none" },
    ],
  },
  {
    id: "budget",
    question: "What is your approximate budget for immigration?",
    subtitle: "Different countries and visa types have varying cost requirements.",
    options: [
      { label: "Under ₹5 Lakh / CAD 8K", value: "low" },
      { label: "₹5–10 Lakh / CAD 8–15K", value: "medium" },
      { label: "₹10–20 Lakh / CAD 15–30K", value: "high" },
      { label: "₹20 Lakh+ / CAD 30K+", value: "very-high" },
      { label: "Not sure yet", value: "unsure" },
    ],
  },
];

interface Recommendation {
  country: string;
  countrySlug: string;
  flag: string;
  visa: string;
  visaSlug: string;
  score: number;
  reason: string;
  timeline: string;
}

function getRecommendations(answers: Record<string, string>): Recommendation[] {
  const recs: Recommendation[] = [];

  const { goal, age, education, experience, english } = answers;

  // Canada Express Entry
  const canadaPRScore = (
    (goal === "pr" ? 30 : goal === "work" ? 20 : 5) +
    (["25-30", "31-35"].includes(age) ? 25 : age === "18-24" ? 20 : 10) +
    (["masters", "phd"].includes(education) ? 25 : education === "bachelors" ? 20 : 10) +
    (["3-5", "6-10", "10+"].includes(experience) ? 20 : experience === "1-2" ? 15 : 5) +
    (["proficient", "expert"].includes(english) ? 20 : english === "intermediate" ? 12 : 5)
  );
  recs.push({
    country: "Canada",
    countrySlug: "canada",
    flag: "🇨🇦",
    visa: "Express Entry PR",
    visaSlug: "express-entry",
    score: canadaPRScore,
    reason: "Canada's Express Entry is ideal for skilled professionals with good English and education credentials.",
    timeline: "6–12 months",
  });

  // Canada Study
  if (goal === "study" || (goal === "pr" && ["18-24", "25-30"].includes(age))) {
    const studyScore = (
      (goal === "study" ? 30 : 15) +
      (["18-24", "25-30"].includes(age) ? 25 : 10) +
      (["bachelors", "masters", "phd"].includes(education) ? 20 : 15) +
      (["proficient", "expert", "intermediate"].includes(english) ? 20 : 10) + 15
    );
    recs.push({
      country: "Canada",
      countrySlug: "canada",
      flag: "🇨🇦",
      visa: "Student Visa + PGWP",
      visaSlug: "student-visa",
      score: studyScore,
      reason: "Study in Canada and gain a Post-Graduation Work Permit — a proven pathway to PR.",
      timeline: "2–4 months (study permit)",
    });
  }

  // Australia Skilled Migration
  const ausPRScore = (
    (goal === "pr" ? 30 : goal === "work" ? 20 : 5) +
    (["25-30", "31-35"].includes(age) ? 25 : age === "18-24" ? 15 : 10) +
    (["masters", "phd"].includes(education) ? 25 : education === "bachelors" ? 20 : education === "trade" ? 18 : 10) +
    (["3-5", "6-10", "10+"].includes(experience) ? 22 : experience === "1-2" ? 15 : 5) +
    (["proficient", "expert"].includes(english) ? 18 : english === "intermediate" ? 10 : 5)
  );
  recs.push({
    country: "Australia",
    countrySlug: "australia",
    flag: "🇦🇺",
    visa: "Skilled Migration (189/190)",
    visaSlug: "work-permits",
    score: ausPRScore,
    reason: "Australia's points-based system rewards skilled professionals with high wages and quality of life.",
    timeline: "8–18 months",
  });

  // Germany Job Seeker
  const germanyScore = (
    (goal === "work" ? 30 : goal === "pr" ? 20 : 5) +
    (["25-30", "31-35", "36-40"].includes(age) ? 20 : 10) +
    (["masters", "phd"].includes(education) ? 25 : education === "bachelors" ? 20 : 10) +
    (["3-5", "6-10", "10+"].includes(experience) ? 22 : experience === "1-2" ? 15 : 5) +
    (["proficient", "expert"].includes(english) ? 15 : 10)
  );
  recs.push({
    country: "Germany",
    countrySlug: "germany",
    flag: "🇩🇪",
    visa: "Job Seeker / EU Blue Card",
    visaSlug: "job-seeker-visa",
    score: germanyScore,
    reason: "Germany's Job Seeker Visa lets you enter without a job offer. EU Blue Card fast-tracks PR in 21 months.",
    timeline: "3–6 months",
  });

  // UK Skilled Worker
  const ukScore = (
    (goal === "work" ? 28 : goal === "pr" ? 18 : 5) +
    (["25-30", "31-35"].includes(age) ? 20 : 12) +
    (["masters", "phd"].includes(education) ? 22 : education === "bachelors" ? 18 : 10) +
    (["3-5", "6-10", "10+"].includes(experience) ? 20 : experience === "1-2" ? 14 : 5) +
    (["proficient", "expert"].includes(english) ? 18 : english === "intermediate" ? 12 : 5)
  );
  recs.push({
    country: "United Kingdom",
    countrySlug: "uk",
    flag: "🇬🇧",
    visa: "Skilled Worker Visa",
    visaSlug: "work-permits",
    score: ukScore,
    reason: "The UK Skilled Worker visa offers access to one of the world's strongest job markets with a path to ILR.",
    timeline: "3–8 weeks",
  });

  // Family Sponsorship (Canada)
  if (goal === "family") {
    recs.push({
      country: "Canada",
      countrySlug: "canada",
      flag: "🇨🇦",
      visa: "Family Sponsorship",
      visaSlug: "family-sponsorship",
      score: 85,
      reason: "If you have family in Canada, sponsorship is the most direct and reliable pathway.",
      timeline: "12–24 months",
    });
  }

  // Visitor Visa
  if (goal === "visit") {
    recs.push({
      country: "Canada",
      countrySlug: "canada",
      flag: "🇨🇦",
      visa: "Visitor Visa / Super Visa",
      visaSlug: "visitor-visa",
      score: 80,
      reason: "Canada's Super Visa allows extended stays of up to 5 years for parents and grandparents.",
      timeline: "2–8 weeks",
    });
  }

  return recs.sort((a, b) => b.score - a.score).slice(0, 3);
}

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { update } = useUserProfile();

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + (showResults ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendations = showResults ? getRecommendations(answers) : [];
  const topRec = recommendations[0];

  // Map quiz answers/top recommendation → EligibilityForm prefill
  const visaSlugToFormValue: Record<string, string> = {
    "express-entry": "pr",
    "student-visa": "study",
    "work-permits": "work",
    "lmia-assistance": "lmia",
    "pnp-application": "pnp",
    "visitor-visa": "visitor",
    "family-sponsorship": "family",
    "job-seeker-visa": "jobseeker",
    "visitor-visa-insurance": "insurance",
  };
  const countrySlugToFormValue: Record<string, string> = {
    canada: "canada",
    australia: "australia",
    germany: "germany",
    uk: "uk",
  };
  const educationToFormValue: Record<string, string> = {
    highschool: "highschool",
    bachelors: "bachelors",
    masters: "masters",
    phd: "phd",
    trade: "diploma",
  };
  const prefill = topRec
    ? {
        destination_country: countrySlugToFormValue[topRec.countrySlug] ?? "",
        visa_type: visaSlugToFormValue[topRec.visaSlug] ?? "",
        education_level: educationToFormValue[answers.education] ?? "",
      }
    : undefined;

  // Persist quiz outcomes to profile
  useEffect(() => {
    if (!showResults) return;
    const goal = answers.goal;
    const intentMap: Record<string, Intent> = {
      pr: "PR", study: "Study", work: "Work", visit: "Visit", family: "PR",
    };
    update({
      intent: goal ? intentMap[goal] ?? null : null,
    });
  }, [showResults, answers, update]);

  return (
    <div className="min-h-screen bg-secondary/30">
      <Helmet>
        <title>Immigration Pathway Quiz | Find Your Best Visa – 4 Aces Visa</title>
        <meta name="description" content="Take the free Canada immigration quiz — 8 questions, instant result showing your best pathway: Express Entry, PNP, study permit, or family sponsorship." />
        <link rel="canonical" href="https://www.4acesvisa.com/quiz" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="4 Aces Visa" />
        <meta property="og:title" content="Immigration Pathway Quiz | Find Your Best Visa – 4 Aces Visa" />
        <meta property="og:description" content="Take the free Canada immigration quiz — 8 questions, instant result showing your best pathway: Express Entry, PNP, study permit, or family sponsorship." />
        <meta property="og:url" content="https://www.4acesvisa.com/quiz" />
        <meta property="og:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@4acesvisa" />
        <meta name="twitter:image" content="https://www.4acesvisa.com/og-default.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "Immigration Pathway Quiz — 4 Aces Visa",
                "description": "Free interactive quiz that recommends the best immigration pathway based on your age, education, work experience, and goals.",
                "url": "https://www.4acesvisa.com/quiz",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Any",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CAD" },
                "provider": { "@type": "Organization", "name": "4 Aces Visa", "url": "https://www.4acesvisa.com" }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.4acesvisa.com/" },
                  { "@type": "ListItem", "position": 2, "name": "Immigration Quiz", "item": "https://www.4acesvisa.com/quiz" }
                ]
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            🧭 Find Your Immigration Pathway
          </motion.h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Answer 6 quick questions and we'll recommend the best country and visa type for your profile.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mt-8 max-w-3xl">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {Math.min(currentStep + 1, questions.length)} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card rounded-2xl shadow-lg p-6 md:p-10">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {currentQuestion.question}
                </h2>
                <p className="text-muted-foreground mb-8">{currentQuestion.subtitle}</p>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                          isSelected
                            ? "border-accent bg-accent/10 shadow-md"
                            : "border-border hover:border-primary/40 bg-background"
                        }`}
                      >
                        {option.icon && (
                          <span className={`flex-shrink-0 ${isSelected ? "text-accent" : "text-muted-foreground"}`}>
                            {option.icon}
                          </span>
                        )}
                        <span className={`font-medium ${isSelected ? "text-accent" : "text-foreground"}`}>
                          {option.label}
                        </span>
                        {isSelected && <CheckCircle className="w-5 h-5 text-accent ml-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={goBack}
                    className="mt-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous question
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Your Personalized Recommendations
                </h2>
                <p className="text-muted-foreground">
                  Based on your profile, here are your top immigration pathways:
                </p>
              </div>

              <div className="space-y-5">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={rec.visa + rec.country}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className={`bg-card rounded-2xl shadow-lg p-6 md:p-8 border-2 ${
                      index === 0 ? "border-accent" : "border-border"
                    }`}
                  >
                    {index === 0 && (
                      <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                        🏆 BEST MATCH
                      </span>
                    )}
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{rec.flag}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">
                          {rec.country} — {rec.visa}
                        </h3>
                        <p className="text-muted-foreground mt-1">{rec.reason}</p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                          <span className="flex items-center gap-1 text-primary font-medium">
                            ⏱ Timeline: {rec.timeline}
                          </span>
                          <span className="flex items-center gap-1 text-accent font-medium">
                            📊 Match: {rec.score}%
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <Link to={`/immigration/${rec.countrySlug}`}>
                            <Button variant="outline" size="sm">
                              Learn about {rec.country} <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                          <Link to={`/services/${rec.visaSlug}`}>
                            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                              {rec.visa} details <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA section */}
              <div className="mt-10 bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Ready to Start Your Journey?</h3>
                <p className="opacity-90 mb-5">
                  Get a free detailed assessment from our immigration experts.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Free Consultation <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" onClick={restart} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
                  </Button>
                </div>
              </div>

              <button
                onClick={goBack}
                className="mt-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to last question
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
