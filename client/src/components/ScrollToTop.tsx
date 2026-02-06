import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Handle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showScrollToTop) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-14 h-14 p-0 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </Button>
  );
}
