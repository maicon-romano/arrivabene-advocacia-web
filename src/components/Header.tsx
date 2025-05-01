
import React, { useState, useEffect } from "react";
import { Phone, Mail, Instagram, Facebook, MapPin, Menu, X } from "lucide-react";
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
      {/* Top bar with contact info */}
      <div className="container mx-auto px-4">
        <div className="hidden md:flex justify-end items-center text-white text-sm mb-2">
          <a href="tel:+5519998223557" className="flex items-center mr-6 hover:text-accent transition-colors">
            <Phone size={16} className="mr-2" />
            (19) 9 9822-3557
          </a>
          <a href="mailto:contato@arrivabeneadvocacia.com.br" className="flex items-center mr-6 hover:text-accent transition-colors">
            <Mail size={16} className="mr-2" />
            contato@arrivabeneadvocacia.com.br
          </a>
          <div className="flex items-center space-x-3">
            <a href="https://instagram.com" className="hover:text-accent transition-colors" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="https://facebook.com" className="hover:text-accent transition-colors" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="https://maps.google.com" className="hover:text-accent transition-colors" aria-label="Localização">
              <MapPin size={16} />
            </a>
          </div>
        </div>
        
        {/* Main header */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/1cd7e80b-d083-41c5-93cd-068b63e2cd46.png" 
              alt="Arrivabene Advocacia" 
              className="h-12 md:h-14 mr-3" 
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
          
          <div className="mt-6 flex flex-col space-y-4 text-white text-sm">
            <a href="tel:+5519998223557" className="flex items-center hover:text-accent transition-colors">
              <Phone size={16} className="mr-2" />
              (19) 9 9822-3557
            </a>
            <a href="mailto:contato@arrivabeneadvocacia.com.br" className="flex items-center hover:text-accent transition-colors">
              <Mail size={16} className="mr-2" />
              contato@arrivabeneadvocacia.com.br
            </a>
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://instagram.com" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://maps.google.com" className="hover:text-accent transition-colors" aria-label="Localização">
                <MapPin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
