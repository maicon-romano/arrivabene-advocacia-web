import React, { useState, useEffect } from "react";
import { Menu, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const BlogHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    // If we're on the home page, scroll to section
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    } else {
      // If we're on another page, navigate to home and then to section
      setIsMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-accent" : "text-white";
  };

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-primary shadow-md py-2" : "bg-primary py-4"
      )}
      style={{ top: 0 }} // Ensure the header is pinned to the top
    >
      {/* Main header */}
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center pl-4 md:pl-6 lg:pl-8">
            <Link to="/">
              <img
                src="/lovable-uploads/f6bbe8bd-244d-4ea5-a6db-0db108c390b2.png"
                alt="Arrivabene Advocacia"
                className="h-auto w-36 md:w-48 lg:w-56"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex pr-4 md:pr-6 lg:pr-8">
            <ul className="flex space-x-6 text-white font-lora">
              <li>
                <Link
                  to="/"
                  className={`hover:text-accent transition-colors ${isActive(
                    "/"
                  )}`}
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-accent transition-colors"
                  onClick={() => scrollToSection("quem-somos")}
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-accent transition-colors"
                  onClick={() => scrollToSection("servicos")}
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-accent transition-colors"
                  onClick={() => scrollToSection("por-que-nos")}
                >
                  Por que Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-accent transition-colors"
                  onClick={() => scrollToSection("contato")}
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`hover:text-accent transition-colors ${isActive(
                    "/blog"
                  )}`}
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
              <Link
                to="/"
                className={`block py-2 hover:text-accent transition-colors ${isActive(
                  "/"
                )}`}
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => scrollToSection("quem-somos")}
              >
                Quem Somos
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => scrollToSection("servicos")}
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => scrollToSection("por-que-nos")}
              >
                Por que Nós
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => scrollToSection("contato")}
              >
                Contato
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`block py-2 hover:text-accent transition-colors ${isActive(
                  "/blog"
                )}`}
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

export default BlogHeader;
