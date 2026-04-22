import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Page Not Found | 4 Aces Visa</title>
        <meta name="description" content="The page you’re looking for doesn’t exist. Return to 4 Aces Visa for Canada Express Entry, PNP, study and work-permit guidance." />
        <link rel="canonical" href={`https://www.4acesvisa.com${location.pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Page Not Found | 4 Aces Visa" />
        <meta property="og:description" content="The page you’re looking for doesn’t exist on 4 Aces Visa." />
        <meta property="og:url" content={`https://www.4acesvisa.com${location.pathname}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Page Not Found | 4 Aces Visa" />
        <meta name="twitter:description" content="The page you’re looking for doesn’t exist on 4 Aces Visa." />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
