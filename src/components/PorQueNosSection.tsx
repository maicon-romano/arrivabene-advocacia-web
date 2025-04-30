
import React from "react";
import { Shield, Award, MessageSquare } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const PorQueNosSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const razoes = [
    {
      icon: <Shield className="text-accent" size={48} />,
      title: "Segurança",
      description: "Profissionais qualificados e compromisso inabalável com a ética profissional, garantindo a segurança jurídica dos nossos clientes."
    },
    {
      icon: <Award className="text-accent" size={48} />,
      title: "Experiência",
      description: "Anos de atuação em diversas áreas do direito, com resultados consistentes e soluções eficazes para casos complexos."
    },
    {
      icon: <MessageSquare className="text-accent" size={48} />,
      title: "Comunicação",
      description: "Atendimento direto, transparente e acessível. Valorizamos a comunicação clara e constante com nossos clientes."
    },
  ];

  return (
    <section id="por-que-nos" className="py-20 bg-primary text-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            inView ? "opacity-100 animate-slide-up" : "opacity-0"
          )}>
            Por que a Arrivabene Advocacia
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className={cn(
            "max-w-2xl mx-auto",
            inView ? "opacity-100 animate-slide-up" : "opacity-0"
          )} style={{ animationDelay: "0.2s" }}>
            Escolher o parceiro jurídico certo é fundamental para o sucesso dos seus empreendimentos. Conheça os diferenciais que fazem da Arrivabene Advocacia a escolha ideal para suas necessidades jurídicas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {razoes.map((razao, index) => (
            <div 
              key={index}
              className={cn(
                "p-8 rounded-lg bg-primary-light bg-opacity-30 backdrop-blur-sm",
                "border border-white/10 hover:border-accent/50 transition-all",
                inView ? "opacity-100 animate-slide-up" : "opacity-0"
              )}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  {razao.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-accent">{razao.title}</h3>
                <p className="text-center">{razao.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PorQueNosSection;
