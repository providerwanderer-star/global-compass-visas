import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FAQCallToAction = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="py-10 bg-secondary/50 border-y border-border"
  >
    <div className="container-narrow mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
          <HelpCircle className="h-5 w-5 text-gold" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-sm md:text-base">Have More Questions?</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Browse 35+ expert answers on immigration pathways, costs, IELTS, and government programs.</p>
        </div>
      </div>
      <Link
        to="/faq"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-accent-foreground font-semibold text-sm hover:bg-gold-dark shadow-gold hover:scale-105 transition-transform shrink-0"
      >
        Visit FAQ Hub <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </motion.section>
);

export default FAQCallToAction;
