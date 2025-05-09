
import React from "react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-10">
        <div className="max-w-4xl pl-4 md:pl-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            Assessoria Jurídica Confiável e Eficaz na Mesorregião de Campinas
          </h1>
          
          <p className="text-white text-lg md:text-xl mb-10 opacity-0 animate-fade-in max-w-2xl" style={{ animationDelay: "0.7s" }}>
            Não medimos esforços para atender os nossos clientes com máxima eficiência e atenção aos detalhes, com atendimento exclusivo.
          </p>
          
          <button 
            onClick={scrollToContact}
            className={cn(
              "bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md",
              "transition-all transform hover:scale-105 duration-300",
              "text-lg font-semibold shadow-lg opacity-0 animate-fade-in"
            )}
            style={{ animationDelay: "0.9s" }}
          >
            Entre em contato agora
          </button>
        </div>
      </div>
      
      {/* Decorative geometric elements */}
      <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-accent/10 rounded-tl-full -z-10 blur-xl"></div>
      <div className="absolute left-0 top-1/2 w-32 h-32 bg-accent/10 rounded-full -z-10 blur-xl"></div>
      <div className="absolute right-1/4 top-1/4 w-24 h-24 bg-primary/20 rounded-full -z-10 blur-lg"></div>
    </section>
  );
};

export default HeroSection;
