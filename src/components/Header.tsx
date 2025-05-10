
import React, { useState, useEffect } from "react";
import { Menu, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Get all sections for intersection detection
      const sections = ["inicio", "quem-somos", "servicos", "por-que-nos", "contato", "blog"];
      let currentActive = "";

      // Find the current section based on scroll position
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is visible more than half in the viewport, set as active
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentActive = sectionId;
            break;
          }
        }
      }

      if (currentActive) {
        setActiveSection(currentActive);
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
      setActiveSection(sectionId);
    }
  };

  const isActive = (sectionId: string) => {
    return activeSection === sectionId;
  };

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-primary shadow-md py-2" : "bg-primary/80 py-4"
      )}
    >
      {/* Main header */}
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center pl-4 md:pl-6 lg:pl-8">
            <img
              src="/lovable-uploads/f6bbe8bd-244d-4ea5-a6db-0db108c390b2.png"
              alt="Arrivabene Advocacia"
              className="h-auto w-36 md:w-48 lg:w-56"
            />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex pr-4 md:pr-6 lg:pr-8">
            <ul className="flex space-x-6 text-white font-lora">
              <li>
                <button
                  onClick={() => scrollToSection("inicio")}
                  className={cn(
                    "hover:text-accent transition-colors relative",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300",
                    isActive("inicio") && "after:scale-x-100 after:origin-bottom-left"
                  )}
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("quem-somos")}
                  className={cn(
                    "hover:text-accent transition-colors relative",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300",
                    isActive("quem-somos") && "after:scale-x-100 after:origin-bottom-left"
                  )}
                >
                  Quem Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("servicos")}
                  className={cn(
                    "hover:text-accent transition-colors relative",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300",
                    isActive("servicos") && "after:scale-x-100 after:origin-bottom-left"
                  )}
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("por-que-nos")}
                  className={cn(
                    "hover:text-accent transition-colors relative",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300",
                    isActive("por-que-nos") && "after:scale-x-100 after:origin-bottom-left"
                  )}
                >
                  Por que Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contato")}
                  className={cn(
                    "hover:text-accent transition-colors relative",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300",
                    isActive("contato") && "after:scale-x-100 after:origin-bottom-left"
                  )}
                >
                  Contato
                </button>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={cn(
                    "hover:text-accent transition-colors relative",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300",
                    location.pathname.includes("/blog") && "after:scale-x-100 after:origin-bottom-left"
                  )}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-accent/80 transition-colors opacity-60 text-sm"
                  title="Painel Administrativo"
                >
                  <Settings size={16} className="inline-block" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 mr-2"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`md:hidden bg-primary overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <ul className="flex flex-col space-y-4 text-white font-lora">
            <li>
              <button
                onClick={() => scrollToSection("inicio")}
                className={cn(
                  "w-full text-left py-2 hover:text-accent transition-colors",
                  isActive("inicio") && "text-accent"
                )}
              >
                Início
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("quem-somos")}
                className={cn(
                  "w-full text-left py-2 hover:text-accent transition-colors",
                  isActive("quem-somos") && "text-accent"
                )}
              >
                Quem Somos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("servicos")}
                className={cn(
                  "w-full text-left py-2 hover:text-accent transition-colors",
                  isActive("servicos") && "text-accent"
                )}
              >
                Serviços
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("por-que-nos")}
                className={cn(
                  "w-full text-left py-2 hover:text-accent transition-colors",
                  isActive("por-que-nos") && "text-accent"
                )}
              >
                Por que Nós
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contato")}
                className={cn(
                  "w-full text-left py-2 hover:text-accent transition-colors",
                  isActive("contato") && "text-accent"
                )}
              >
                Contato
              </button>
            </li>
            <li>
              <Link
                to="/blog"
                className={cn(
                  "block py-2 hover:text-accent transition-colors",
                  location.pathname.includes("/blog") && "text-accent"
                )}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="block py-2 hover:text-accent/80 transition-colors opacity-60 text-sm"
              >
                <Settings size={16} className="inline-block mr-2" /> Painel
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
