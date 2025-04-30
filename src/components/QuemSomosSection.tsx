
import React, { useEffect } from "react";
import { Shield, User, Book } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

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

        <div className="grid md:grid-cols-3 gap-8">
          {/* Quem Somos */}
          <div className={cn(
            "bg-white p-8 rounded-lg shadow-lg",
            sectionVisible ? "opacity-100 animate-slide-up" : "opacity-0"
          )} style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-semibold text-primary mb-4">Nossa Essência</h3>
            <p className="text-gray-700 mb-4">
              A Arrivabene Advocacia é um escritório jurídico focado em oferecer soluções jurídicas personalizadas, 
              com excelência e atenção aos detalhes. Nosso compromisso é garantir a segurança jurídica de nossos 
              clientes, sempre atuando com ética, comprometimento e transparência.
            </p>
            <p className="text-gray-700">
              Atuamos na Mesorregião de Campinas, com foco em assessoria jurídica contínua, preventiva e assertiva.
            </p>
          </div>

          {/* Quem é Eduardo Arrivabene */}
          <div className={cn(
            "bg-white p-8 rounded-lg shadow-lg",
            sectionVisible ? "opacity-100 animate-slide-up" : "opacity-0"
          )} style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center mb-4">
              <User className="text-accent mr-3" size={24} />
              <h3 className="text-2xl font-semibold text-primary">Eduardo Arrivabene</h3>
            </div>
            <p className="text-gray-700 mb-2">OAB/SP nº 375.994</p>
            <p className="text-gray-700">
              Advogado com experiência em direito civil, empresarial e contratual. Graduado em Direito com especialização
              em Direito Empresarial e Contratos. Possui mais de 10 anos de atuação na assessoria jurídica empresarial, 
              conduzindo casos complexos com dedicação e compromisso inabalável.
            </p>
          </div>

          {/* Missão, Visão e Valores */}
          <div className={cn(
            "bg-white p-8 rounded-lg shadow-lg",
            sectionVisible ? "opacity-100 animate-slide-up" : "opacity-0"
          )} style={{ animationDelay: "0.6s" }}>
            <h3 className="text-2xl font-semibold text-primary mb-6">Missão, Visão e Valores</h3>
            
            <div className="mb-6">
              <h4 className="text-xl font-medium text-primary mb-2 flex items-center">
                <Shield className="text-accent mr-2" size={20} />
                Missão
              </h4>
              <p className="text-gray-700">
                Prestar assessoria jurídica com excelência, compreendendo as necessidades específicas de cada cliente.
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-xl font-medium text-primary mb-2 flex items-center">
                <Book className="text-accent mr-2" size={20} />
                Visão
              </h4>
              <p className="text-gray-700">
                Ser referência em assessoria jurídica na região, reconhecidos pela qualidade e eficiência.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-medium text-primary mb-2 flex items-center">
                <Shield className="text-accent mr-2" size={20} />
                Valores
              </h4>
              <p className="text-gray-700">
                Ética, integridade, excelência, transparência e compromisso com resultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuemSomosSection;
