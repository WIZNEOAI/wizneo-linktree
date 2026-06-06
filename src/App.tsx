import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CONSULTORIA_RETIRE_REDIRECT =
  "https://reto.wizneo.org/sprint?utm_source=wizneo_consultoria_retired&utm_medium=redirect&utm_campaign=wizneo_ai_builder_sprint";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

// Loading component for Suspense
const LoadingScreen = () => (
  <div className="min-h-screen bg-black text-white font-matrix flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="text-matrix-green text-2xl animate-pulse">CARGANDO...</div>
      <div className="matrix-text-glow">Preparando experiencia</div>
    </div>
  </div>
);

const ConsultoriaRedirect = () => {
  useEffect(() => {
    window.location.replace(CONSULTORIA_RETIRE_REDIRECT);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-matrix flex items-center justify-center px-4">
      <p className="text-center">
        Redirecting to AI Builder Sprint...{" "}
        <a
          href={CONSULTORIA_RETIRE_REDIRECT}
          className="text-matrix-green underline underline-offset-2"
        >
          Continue here
        </a>
      </p>
    </div>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/consultoria" element={<ConsultoriaRedirect />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
