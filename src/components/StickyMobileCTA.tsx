import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CTA_MATRIX, intentFromPath } from "@/data/ctaMatrix";

/**
 * Sticky mobile-only CTA bar. Replaces the floating WhatsApp-only button on
 * small screens with intent-matched primary + secondary actions.
 * Hidden on the homepage (already has strong above-the-fold CTAs) and on
 * /contact (the form *is* the CTA).
 */
const StickyMobileCTA = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/" || pathname === "/contact") return null;

  const cfg = CTA_MATRIX[intentFromPath(pathname)];
  const isExternal = (href: string) => href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-elevated transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Quick actions"
    >
      <div className="flex items-stretch gap-2 p-2">
        <a
          href={cfg.primaryHref}
          {...(isExternal(cfg.primaryHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gold text-accent-foreground font-bold text-sm py-3 rounded-lg active:scale-95 transition-transform"
        >
          {cfg.primaryLabel} <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={cfg.secondaryHref}
          {...(isExternal(cfg.secondaryHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center justify-center gap-1.5 bg-success text-cream font-semibold text-sm px-4 py-3 rounded-lg active:scale-95 transition-transform"
          aria-label={cfg.secondaryLabel}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden xs:inline">{cfg.secondaryLabel}</span>
        </a>
      </div>
    </div>
  );
};

export default StickyMobileCTA;