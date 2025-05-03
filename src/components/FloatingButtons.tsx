
import React, { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/5519998223557", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button - dynamically positioned based on back-to-top visibility */}
      <button
        onClick={openWhatsApp}
        className={cn(
          "bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg",
          "transition-all duration-300 hover:scale-110",
          "flex items-center justify-center",
          showBackToTop ? "mb-0" : "mb-0" // No extra margin when back-to-top is hidden
        )}
        aria-label="Contato via WhatsApp"
        style={{ transform: `translateY(${showBackToTop ? '0' : '0'}px)` }}
      >
        <MessageCircle size={24} />
      </button>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "bg-accent hover:bg-accent/90 text-white p-3 rounded-full shadow-lg",
          "transition-all duration-300 hover:scale-110",
          "flex items-center justify-center",
          "opacity-0 scale-0 absolute",
          showBackToTop && "opacity-100 scale-100 relative"
        )}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default FloatingButtons;
