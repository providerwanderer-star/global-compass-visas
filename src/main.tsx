import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// If the root already has prerendered content (from react-snap), hydrate it.
// Otherwise fall back to a normal client render. This keeps dev/CSR working
// AND enables SEO/AEO-friendly static HTML in production builds.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
