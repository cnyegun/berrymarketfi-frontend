import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import HowItWorksPage from "./pages/HowItWorksPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";

// Leaflet + the map demo are heavy and only used here — load them on demand
// so the marketing pages stay light.
const DemoPage = lazy(() => import("./pages/DemoPage"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route
          path="/demo"
          element={
            <Suspense fallback={<div className="min-h-screen bg-white" />}>
              <DemoPage />
            </Suspense>
          }
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </>
  );
}
