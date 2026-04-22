import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface AnswerBlockProps {
  /** 40–60 word direct answer for AI Overviews & featured snippets */
  answer: string;
  whoFor?: string;
  whoNotFor?: string;
  lastUpdated?: string; // e.g. "April 2026"
  className?: string;
}

/**
 * AEO-optimized answer block. Drop near the top of long-form pages so
 * Google AI Overview / Bing Copilot / Perplexity can grab a clean,
 * structured "tl;dr" plus eligibility cues.
 */
const AnswerBlock = ({
  answer,
  whoFor,
  whoNotFor,
  lastUpdated,
  className = "",
}: AnswerBlockProps) => {
  return (
    <aside
      className={`bg-card border-l-4 border-primary rounded-r-xl p-5 md:p-6 shadow-sm ${className}`}
      aria-label="Quick answer"
    >
      <p className="text-base md:text-lg text-foreground leading-relaxed font-medium mb-4">
        {answer}
      </p>
      {(whoFor || whoNotFor) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {whoFor && (
            <div className="flex items-start gap-2">
              <CheckCircle2
                className="h-5 w-5 text-primary shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                  Who this is for
                </p>
                <p className="text-sm text-foreground">{whoFor}</p>
              </div>
            </div>
          )}
          {whoNotFor && (
            <div className="flex items-start gap-2">
              <XCircle
                className="h-5 w-5 text-destructive shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                  Who should look elsewhere
                </p>
                <p className="text-sm text-foreground">{whoNotFor}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {lastUpdated && (
        <p className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground inline-flex items-center gap-1.5">
          <Clock className="h-3 w-3" aria-hidden="true" />
          Last updated: <span className="font-semibold">{lastUpdated}</span> by 4 Aces Visa
        </p>
      )}
    </aside>
  );
};

export default AnswerBlock;