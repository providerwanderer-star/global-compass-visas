import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp button. Hidden on small screens (≤ md) where the
 * StickyMobileCTA bar takes over with intent-matched actions.
 */
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/16478622190?text=Hi%2C%20I%20need%20immigration%20guidance"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-success text-cream px-4 py-3 rounded-full shadow-elevated hover:scale-105 transition-transform font-semibold text-sm"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span>Chat with Expert</span>
    </a>
  );
};

export default WhatsAppButton;
