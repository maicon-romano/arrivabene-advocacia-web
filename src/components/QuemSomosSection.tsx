
import React from "react";
import { Shield, Book, Users, User, Eye, Handshake } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuemSomosSection = () => {
  const { ref: sectionRef, inView: sectionVisible } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="quem-somos" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-primary mb-4",
            sectionVisible ? "opacity-100 animate-slide-up" : "opacity-0"
          )}>
            Quem Somos
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Primeira Seção: Quem é Arrivabene Advocacia */}
        <div className={cn(
          "mb-16",
          sectionVisible ? "opacity-100 animate-slide-up" : "opacity-0"
        )} style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center mb-4 justify-center">
            <Users className="text-accent mr-3" size={28} />
            <h3 className="text-2xl md:text-3xl font-semibold text-primary">Quem é Arrivabene Advocacia</h3>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <p className="text-gray-700 text-center mb-4">
              A Arrivabene Advocacia é um escritório jurídico focado em oferecer soluções jurídicas personalizadas, 
              com excelência e atenção aos detalhes. Nosso compromisso é garantir a segurança jurídica de nossos 
              clientes, sempre atuando com ética, comprometimento e transparência.
            </p>
            <p className="text-gray-700 text-center">
              Atuamos na Mesorregião de Campinas, com foco em assessoria jurídica contínua, preventiva e assertiva.
            </p>
          </div>
        </div>

        {/* Segunda Seção: Quem é Eduardo Arrivabene */}
        <div className={cn(
          "mb-16",
          sectionVisible ? "opacity-100 animate-slide-up" : "opacity-0"
        )} style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center mb-4 justify-center">
            <User className="text-accent mr-3" size={28} />
            <h3 className="text-2xl md:text-3xl font-semibold text-primary">Quem é Eduardo Arrivabene</h3>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8 border-4 border-accent flex-shrink-0">
                <Avatar className="w-full h-full">
                  <AvatarImage src="/placeholder.svg" alt="Eduardo Arrivabene" className="object-cover" />
                  <AvatarFallback className="bg-primary text-white text-2xl">EA</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-primary mb-2 text-center md:text-left">Eduardo Arrivabene</h4>
                <p className="text-gray-700 mb-4 text-center md:text-left">OAB/SP nº 375.994</p>
                <p className="text-gray-700 text-center md:text-left">
                  Advogado com vasta experiência em direito civil, empresarial e contratual. Graduado em Direito com especialização
                  em Direito Empresarial e Contratos. Possui mais de 10 anos de atuação na assessoria jurídica empresarial, 
                  conduzindo casos complexos com dedicação e compromisso inabalável.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terceira Seção: Missão, Visão e Valores em cards */}
        <div className={cn(
          sectionVisible ? "opacity-100 animate-slide-up" : "opacity-0"
        )} style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center mb-4 justify-center">
            <Shield className="text-accent mr-3" size={28} />
            <h3 className="text-2xl md:text-3xl font-semibold text-primary">Missão, Visão e Valores</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Card de Missão */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Shield className="text-accent" size={40} />
                </div>
                <CardTitle className="text-center text-primary">Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">
                  Prestar assessoria jurídica com excelência, compreendendo as necessidades específicas de cada cliente.
                </p>
              </CardContent>
            </Card>

            {/* Card de Visão */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Eye className="text-accent" size={40} />
                </div>
                <CardTitle className="text-center text-primary">Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">
                  Ser referência em assessoria jurídica na região, reconhecidos pela qualidade e eficiência.
                </p>
              </CardContent>
            </Card>

            {/* Card de Valores */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Handshake className="text-accent" size={40} />
                </div>
                <CardTitle className="text-center text-primary">Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">
                  Ética, integridade, excelência, transparência e compromisso com resultados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuemSomosSection;
