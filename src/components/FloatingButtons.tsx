
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
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
    window.open(
      "https://api.whatsapp.com/send/?phone=5519998223557&text=Ol%C3%A1!+Quero+saber+mais+sobre+os+servi%C3%A7os+jur%C3%ADdicos.+Vim+pelo+site.&type=phone_number&app_absent=0",
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className={cn(
          "bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg",
          "transition-all duration-300 hover:scale-110",
          "flex items-center justify-center"
        )}
        aria-label="Contato via WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-2xl"></i>
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
