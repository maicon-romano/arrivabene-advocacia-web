
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

const BlogHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
            <Link to="/">
              <img 
                src="/lovable-uploads/f6bbe8bd-244d-4ea5-a6db-0db108c390b2.png" 
                alt="Arrivabene Advocacia" 
                className="h-auto w-48 md:w-64" 
              />
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 text-white">
              <li><Link to="/" className="hover:text-accent transition-colors">Início</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
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
            <li><Link to="/" className="block py-2 hover:text-accent transition-colors">Início</Link></li>
            <li><Link to="/blog" className="block py-2 hover:text-accent transition-colors">Blog</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
