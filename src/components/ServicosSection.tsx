
import React from "react";
import { FileText, Briefcase, FilePen, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const ServicosSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const servicos = [
    {
      icon: <FileText size={40} className="text-accent" />,
      title: "Direito Civil",
      description: "Questões de responsabilidade, práticas comerciais, proteção contratual, ações de consumo, posse e usucapião."
    },
    {
      icon: <Briefcase size={40} className="text-accent" />,
      title: "Direito Empresarial",
      description: "Litígios societários, consultoria empresarial, recuperação e falência."
    },
    {
      icon: <FilePen size={40} className="text-accent" />,
      title: "Direito Contratual",
      description: "Elaboração, análise e revisão de contratos, com foco em segurança jurídica e atuação consultiva."
    },
    {
      icon: <Users size={40} className="text-accent" />,
      title: "Direito Trabalhista Empresarial",
      description: "Consultoria e defesa em ações trabalhistas, prevenção de passivos, elaboração de contratos e políticas internas, suporte em demissões e negociações coletivas."
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-primary mb-4",
            inView ? "opacity-100 animate-slide-up" : "opacity-0"
          )}>
            Nossos Serviços
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className={cn(
            "max-w-2xl mx-auto text-gray-600",
            inView ? "opacity-100 animate-slide-up" : "opacity-0"
          )} style={{ animationDelay: "0.2s" }}>
            Oferecemos uma gama completa de serviços jurídicos para atender às suas necessidades específicas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicos.map((servico, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300",
                "border-t-4 border-accent hover:transform hover:scale-105",
                inView ? "opacity-100 animate-slide-up" : "opacity-0"
              )}
              style={{ animationDelay: `${0.2 + index * 0.2}s` }}
            >
              <div className="bg-gray-50 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                {servico.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3 text-center">{servico.title}</h3>
              <p className="text-gray-600 text-center">{servico.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicosSection;
