
import React from "react";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <div className="mb-6">
              <img 
                src="/lovable-uploads/f6bbe8bd-244d-4ea5-a6db-0db108c390b2.png" 
                alt="Arrivabene Advocacia" 
                className="w-full h-auto max-w-xs"
              />
            </div>
            <p className="mb-4 text-gray-300">
              Assessoria jurídica confiável e eficaz na Mesorregião de Campinas, com foco na excelência e no atendimento personalizado.
            </p>
            <div className="flex space-x-3">
              <a href="https://instagram.com" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-accent pb-2">Navegação</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection("inicio")} className="hover:text-accent transition-colors">Início</button></li>
              <li><button onClick={() => scrollToSection("quem-somos")} className="hover:text-accent transition-colors">Quem Somos</button></li>
              <li><button onClick={() => scrollToSection("servicos")} className="hover:text-accent transition-colors">Serviços</button></li>
              <li><button onClick={() => scrollToSection("por-que-nos")} className="hover:text-accent transition-colors">Por que Nós</button></li>
              <li><button onClick={() => scrollToSection("contato")} className="hover:text-accent transition-colors">Contato</button></li>
              <li><button onClick={() => scrollToSection("blog")} className="hover:text-accent transition-colors">Blog</button></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-accent pb-2">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-1 text-accent" />
                <span>(19) 9 9822-3557</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-1 text-accent" />
                <span>contato@arrivabeneadvocacia.com.br</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-accent" />
                <span>R. Dez de Abril, 516 - Centro, Artur Nogueira - SP, 13160-162</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-primary-light py-4">
        <div className="container mx-auto px-4 text-center text-gray-300 text-sm">
          © {currentYear} Arrivabene Advocacia - Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
