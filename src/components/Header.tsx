
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-primary shadow-md py-2" : "bg-primary/80 py-4"
      )}
    >
      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/f6bbe8bd-244d-4ea5-a6db-0db108c390b2.png" 
              alt="Arrivabene Advocacia" 
              className="h-auto w-48 md:w-64" 
            />
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 text-white">
              <li><button onClick={() => scrollToSection("inicio")} className="hover:text-accent transition-colors">Início</button></li>
              <li><button onClick={() => scrollToSection("quem-somos")} className="hover:text-accent transition-colors">Quem Somos</button></li>
              <li><button onClick={() => scrollToSection("servicos")} className="hover:text-accent transition-colors">Serviços</button></li>
              <li><button onClick={() => scrollToSection("por-que-nos")} className="hover:text-accent transition-colors">Por que Nós</button></li>
              <li><button onClick={() => scrollToSection("contato")} className="hover:text-accent transition-colors">Contato</button></li>
              <li><button onClick={() => scrollToSection("blog")} className="hover:text-accent transition-colors">Blog</button></li>
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2" 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`md:hidden bg-primary-light overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4 text-white">
            <li><button onClick={() => scrollToSection("inicio")} className="w-full text-left py-2 hover:text-accent transition-colors">Início</button></li>
            <li><button onClick={() => scrollToSection("quem-somos")} className="w-full text-left py-2 hover:text-accent transition-colors">Quem Somos</button></li>
            <li><button onClick={() => scrollToSection("servicos")} className="w-full text-left py-2 hover:text-accent transition-colors">Serviços</button></li>
            <li><button onClick={() => scrollToSection("por-que-nos")} className="w-full text-left py-2 hover:text-accent transition-colors">Por que Nós</button></li>
            <li><button onClick={() => scrollToSection("contato")} className="w-full text-left py-2 hover:text-accent transition-colors">Contato</button></li>
            <li><button onClick={() => scrollToSection("blog")} className="w-full text-left py-2 hover:text-accent transition-colors">Blog</button></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
