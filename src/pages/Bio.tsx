
import React from "react";
import { MessageCircle, Globe, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Bio = () => {
  const whatsappUrl =
    "https://api.whatsapp.com/send/?phone=5519998223557&text=Ol%C3%A1!+Quero+saber+mais+sobre+os+servi%C3%A7os+jur%C3%ADdicos.+Vim+pelo+Instagram.&type=phone_number&app_absent=0";
  
  const websiteUrl = window.location.origin;
  const emailUrl = "mailto:contato@arrivabeneadvocacia.com.br";
  const locationUrl = "https://maps.google.com/?q=Arrivabene+Advocacia+Campinas";

  const links = [
    {
      title: "WhatsApp",
      description: "Fale conosco agora",
      url: whatsappUrl,
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Site Oficial",
      description: "Conheça nossos serviços",
      url: websiteUrl,
      icon: Globe,
      color: "bg-primary hover:bg-primary/90",
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
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
            <div className="text-white font-bold text-2xl">EA</div>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2 font-playfair">
            Eduardo Arrivabene
          </h1>
          <h2 className="text-lg text-accent font-semibold mb-1">
            Advocacia
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            OAB/SP nº 375.994
          </p>
        </div>

        {/* Texto de apresentação */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6 text-center">
            <p className="text-gray-700 text-sm leading-relaxed">
              Assessoria jurídica confiável e eficaz na Mesorregião de Campinas. 
              Não medimos esforços para atender nossos clientes com máxima 
              eficiência e atenção aos detalhes.
            </p>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  className={`w-full h-auto p-4 ${link.color} text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
                  variant="default"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <IconComponent size={24} />
                    <div className="text-left">
                      <div className="font-semibold text-base">{link.title}</div>
                      <div className="text-sm opacity-90">{link.description}</div>
                    </div>
                  </div>
                </Button>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2024 Eduardo Arrivabene Advocacia
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
