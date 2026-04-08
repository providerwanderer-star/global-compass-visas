import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/1234567890?text=Hi%2C%20I%20need%20immigration%20guidance"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-success text-cream px-4 py-3 rounded-full shadow-elevated hover:scale-105 transition-transform font-semibold text-sm"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat with Expert</span>
    </a>
  );
};

export default WhatsAppButton;
