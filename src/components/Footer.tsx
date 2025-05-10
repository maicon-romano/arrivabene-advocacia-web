
import React from "react";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <div className="mb-6">
              <img 
                src="/lovable-uploads/f6bbe8bd-244d-4ea5-a6db-0db108c390b2.png" 
                alt="Arrivabene Advocacia" 
                className="w-full h-auto max-w-xs"
              />
            </div>
            <p className="mb-4 text-gray-300 font-lora">
              Assessoria jurídica confiável e eficaz na Mesorregião de Campinas, com foco na excelência e no atendimento personalizado.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/arrivabeneadvocacia/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors" 
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61575479817862" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors" 
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-accent pb-2 font-playfair">Navegação</h3>
            <ul className="space-y-2 font-lora">
              <li><button onClick={() => scrollToSection("inicio")} className="hover:text-accent transition-colors">Início</button></li>
              <li><button onClick={() => scrollToSection("quem-somos")} className="hover:text-accent transition-colors">Quem Somos</button></li>
              <li><button onClick={() => scrollToSection("servicos")} className="hover:text-accent transition-colors">Serviços</button></li>
              <li><button onClick={() => scrollToSection("por-que-nos")} className="hover:text-accent transition-colors">Por que Nós</button></li>
              <li><button onClick={() => scrollToSection("contato")} className="hover:text-accent transition-colors">Contato</button></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-accent pb-2 font-playfair">Contato</h3>
            <ul className="space-y-3 font-lora">
              <li className="flex items-start">
                <a 
                  href="tel:+5519998223557" 
                  className="flex items-start hover:text-accent transition-colors"
                >
                  <Phone size={18} className="mr-3 mt-1 text-accent" />
                  <span>(19) 9 9822-3557</span>
                </a>
              </li>
              <li className="flex items-start">
                <a 
                  href="mailto:contato@arrivabeneadvocacia.com.br"
                  className="flex items-start hover:text-accent transition-colors"
                >
                  <Mail size={18} className="mr-3 mt-1 text-accent" />
                  <span>contato@arrivabeneadvocacia.com.br</span>
                </a>
              </li>
              <li className="flex items-start">
                <a 
                  href="https://maps.app.goo.gl/pr7z71w7Lj4nEkEn7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start hover:text-accent transition-colors"
                >
                  <MapPin size={18} className="mr-3 mt-1 text-accent" />
                  <span>R. Dez de Abril, 516 - Centro, Artur Nogueira - SP, 13160-162</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-primary-light py-4">
        <div className="container mx-auto px-6 text-center text-gray-300 text-sm font-lora">
          © {currentYear} Arrivabene Advocacia - Todos os direitos reservados — Desenvolvido por <a 
            href="https://www.originaldigital.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:text-white transition-all transform hover:scale-110 inline-block"
          >
            Original Digital
          </a>.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
