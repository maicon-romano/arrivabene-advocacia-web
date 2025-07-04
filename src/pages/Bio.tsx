
import React from "react";
import { Globe, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Bio = () => {
  const whatsappUrl =
    "https://api.whatsapp.com/send/?phone=5519998223557&text=Ol%C3%A1!+Quero+saber+mais+sobre+os+servi%C3%A7os+jur%C3%ADdicos.+Vim+pelo+Instagram.&type=phone_number&app_absent=0";
  
  const websiteUrl = window.location.origin;
  const emailUrl = "mailto:contato@arrivabeneadvocacia.com.br";
  const locationUrl = "https://maps.google.com/?q=Arrivabene+Advocacia+Campinas";

  // Ícone do WhatsApp em SVG
  const WhatsAppIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/>
    </svg>
  );

  const links = [
    {
      title: "WhatsApp",
      description: "Fale conosco agora",
      url: whatsappUrl,
      icon: WhatsAppIcon,
      color: "bg-accent hover:bg-accent/90",
    },
    {
      title: "Site Oficial",
      description: "Conheça nossos serviços",
      url: websiteUrl,
      icon: Globe,
      color: "bg-accent hover:bg-accent/90",
    },
    {
      title: "Localização",
      description: "Encontre nosso escritório",
      url: locationUrl,
      icon: MapPin,
      color: "bg-accent hover:bg-accent/90",
    },
    {
      title: "E-mail",
      description: "Entre em contato",
      url: emailUrl,
      icon: Mail,
      color: "bg-accent hover:bg-accent/90",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="max-w-sm mx-auto">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img 
              src="/lovable-uploads/f6bbe8bd-244d-4ea5-a6db-0db108c390b2.png" 
              alt="Arrivabene Advocacia" 
              className="w-full h-auto max-w-[280px] mx-auto drop-shadow-lg"
            />
          </div>
        </div>

        {/* Texto de apresentação */}
        <Card className="mb-10 shadow-xl border-0 bg-white/95 backdrop-blur-sm opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-8 text-center">
            <p className="text-gray-700 text-base leading-relaxed font-lora">
              Assessoria jurídica confiável e eficaz na Mesorregião de Campinas. 
              Não medimos esforços para atender nossos clientes com máxima 
              eficiência e atenção aos detalhes.
            </p>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="space-y-5 mb-12">
          {links.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <div
                key={index}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    className={`w-full h-auto p-6 ${link.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 rounded-xl border-0`}
                    variant="default"
                  >
                    <div className="flex items-center justify-start space-x-4 w-full">
                      <div className="flex-shrink-0">
                        <IconComponent size={28} />
                      </div>
                      <div className="text-left flex-grow">
                        <div className="font-semibold text-lg font-playfair">{link.title}</div>
                        <div className="text-sm opacity-90 font-lora">{link.description}</div>
                      </div>
                    </div>
                  </Button>
                </a>
              </div>
            );
          })}
        </div>

        {/* OAB */}
        <div className="text-center mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "1.0s" }}>
          <div className="inline-block bg-accent/10 px-6 py-3 rounded-full">
            <p className="text-accent font-semibold text-sm font-playfair">
              OAB/SP nº 375.994
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-accent/20 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <p className="text-sm text-accent/70 font-lora">
            © {currentYear} Eduardo Arrivabene Advocacia
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
