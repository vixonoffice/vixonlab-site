import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageSEO } from "@/hooks/usePageSEO";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const isEn = language === "en";
  usePageSEO({ title: isEn ? "Page not found" : "Pagina nu a fost găsită", noindex: true });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center px-4">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{isEn ? "Page not found" : "Pagina nu a fost găsită"}</p>
        <Link to="/" className="text-primary-light underline hover:text-foreground">
          {isEn ? "Back to the home page" : "Înapoi acasă"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
