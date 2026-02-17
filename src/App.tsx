import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminContent from "./pages/admin/AdminContent";
import AdminServices from "./pages/admin/AdminServices";
import AdminPortfolio from "./pages/admin/AdminPortfolio";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminStats from "./pages/admin/AdminStats";
import AdminProcess from "./pages/admin/AdminProcess";
import AdminTech from "./pages/admin/AdminTech";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminTrash from "./pages/admin/AdminTrash";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
            <Route path="/portfolio/:slug" element={<Layout><CaseStudy /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><AdminLayout><AdminContent /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><AdminServices /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/portfolio" element={<ProtectedRoute><AdminLayout><AdminPortfolio /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute><AdminLayout><AdminTestimonials /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/pricing" element={<ProtectedRoute><AdminLayout><AdminPricing /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/stats" element={<ProtectedRoute><AdminLayout><AdminStats /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/process" element={<ProtectedRoute><AdminLayout><AdminProcess /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/tech" element={<ProtectedRoute><AdminLayout><AdminTech /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute><AdminLayout><AdminMessages /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/trash" element={<ProtectedRoute><AdminLayout><AdminTrash /></AdminLayout></ProtectedRoute>} />

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
