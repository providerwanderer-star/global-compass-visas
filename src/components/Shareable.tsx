import { useState, type ReactNode } from "react";
import { Copy, Check, Share2 } from "lucide-react";

/**
 * Shareable — wraps any Q/A block with "Copy answer" + "Share on X" buttons.
 * Key AEO primitive: encourages AI-shaped, copy-paste-ready answer units.
 */
interface ShareableProps {
  question: string;
  answer: string;
  /** Full URL or path that deep-links back to this answer */
  permalink?: string;
  children?: ReactNode;
}

export const Shareable = ({ question, answer, permalink, children }: ShareableProps) => {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    typeof window !== "undefined"
      ? permalink
        ? permalink.startsWith("http")
          ? permalink
          : `${window.location.origin}${permalink}`
        : window.location.href
      : permalink ?? "";

  const copyText = `${question}\n\n${answer}\n\nSource: ${fullUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select + execCommand
    }
  };

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    question + " — " + answer.slice(0, 140) + "…"
  )}&url=${encodeURIComponent(fullUrl)}`;

  return (
    <div className="relative">
      {children}
      <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-border/50">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-muted/50"
          aria-label="Copy answer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-600" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy answer
            </>
          )}
        </button>
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-muted/50"
          aria-label="Share on X"
        >
          <Share2 className="h-3.5 w-3.5" /> Share
        </a>
      </div>
    </div>
  );
};

export default Shareable;
