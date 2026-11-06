import { lazy, Suspense, type ReactElement } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Navigate, useParams, useRoutes, type RouteObject } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Offer = lazy(() => import("./pages/Offer"));
const Agencies = lazy(() => import("./pages/Agencies"));

/** Articolele de blog exista doar in romana: /en/blog/:slug duce la varianta RO. */
function BlogPostRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug}`} replace />;
}

const page = (element: ReactElement) => <Layout>{element}</Layout>;

// Paginile publice care exista in ambele limbi. RO fara prefix ("/services"), EN sub "/en" ("/en/services").
const bilingualPages: { path: string; element: ReactElement }[] = [
  { path: "", element: <Index /> },
  { path: "services", element: <Services /> },
  { path: "portfolio", element: <Portfolio /> },
  { path: "portfolio/:slug", element: <CaseStudy /> },
  { path: "about", element: <About /> },
  { path: "pricing", element: <Pricing /> },
  { path: "contact", element: <Contact /> },
  { path: "blog", element: <Blog /> },
  { path: "privacy", element: <Privacy /> },
  { path: "terms", element: <Terms /> },
];

const routes: RouteObject[] = [
  ...bilingualPages.map((p) => ({ path: `/${p.path}`, element: page(p.element) })),
  ...bilingualPages.map((p) => ({ path: p.path ? `/en/${p.path}` : "/en", element: page(p.element) })),

  // Doar romana
  { path: "/oferta", element: page(<Offer />) },
  { path: "/offer", element: <Navigate to="/oferta" replace /> },
  { path: "/blog/:slug", element: page(<BlogPost />) },

  // Doar engleza
  { path: "/en/agencies", element: page(<Agencies />) },
  { path: "/en/blog/:slug", element: <BlogPostRedirect /> },
  { path: "/en/oferta", element: <Navigate to="/en/pricing" replace /> },
  { path: "/en/offer", element: <Navigate to="/en/pricing" replace /> },

  { path: "*", element: page(<NotFound />) },
];

function AppRoutes() {
  return <Suspense fallback={null}>{useRoutes(routes)}</Suspense>;
}

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
