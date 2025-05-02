
import React, { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { CircleArrowRight, Clock, Calendar, Search } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Example blog posts (would be replaced with real data in a production app)
  const blogPosts = [
    {
      id: 1,
      title: "Novas regulamentações empresariais: O que seu negócio precisa saber",
      excerpt: "Conheça as mudanças recentes na legislação empresarial e como elas podem afetar o seu negócio e suas operações cotidianas.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
      date: "15 Abr 2025",
      readTime: "5 min de leitura",
      category: "Empresarial"
    },
    {
      id: 2,
      title: "A importância dos contratos bem elaborados para pequenos negócios",
      excerpt: "Entenda como contratos claros e objetivos podem proteger seu empreendimento e evitar problemas futuros com clientes e fornecedores.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
      date: "03 Abr 2025",
      readTime: "4 min de leitura",
      category: "Contratos"
    },
    {
      id: 3,
      title: "Direitos trabalhistas: O que empregadores precisam estar atentos",
      excerpt: "Um guia completo sobre as principais responsabilidades trabalhistas que todo empresário deve conhecer para evitar problemas legais.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
      date: "28 Mar 2025",
      readTime: "6 min de leitura",
      category: "Trabalhista"
    },
    {
      id: 4,
      title: "Como proteger seu patrimônio pessoal em negócios empresariais",
      excerpt: "Aprenda estratégias legais para separar seu patrimônio pessoal do empresarial e proteger seus bens em caso de processos.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
      date: "15 Mar 2025",
      readTime: "5 min de leitura",
      category: "Patrimonial"
    },
    {
      id: 5,
      title: "LGPD e pequenas empresas: Como se adequar à legislação",
      excerpt: "Um guia prático sobre as exigências da Lei Geral de Proteção de Dados para pequenos e médios negócios brasileiros.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
      date: "05 Mar 2025",
      readTime: "7 min de leitura",
      category: "LGPD"
    },
    {
      id: 6,
      title: "Recuperação judicial para pequenas empresas: Quando é indicado",
      excerpt: "Entenda quando e como a recuperação judicial pode ser uma alternativa para empresas em dificuldades financeiras.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
      date: "20 Fev 2025",
      readTime: "6 min de leitura",
      category: "Empresarial"
    }
  ];

  // Categories for filtering
  const categories = ["Todos", "Empresarial", "Contratos", "Trabalhista", "Patrimonial", "LGPD"];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                Blog Jurídico Arrivabene
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Acompanhe nossos artigos e fique atualizado sobre as principais novidades jurídicas
              </p>
              
              <div className="relative max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <input 
                  type="text" 
                  placeholder="Buscar no blog..." 
                  className="w-full py-4 pl-5 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-accent/10 rounded-tl-full -z-0 blur-xl"></div>
          <div className="absolute left-0 top-1/2 w-32 h-32 bg-accent/10 rounded-full -z-0 blur-xl"></div>
        </section>
        
        {/* Categories */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-5 py-2 rounded-full transition-all ${
                    index === 0 
                      ? 'bg-primary text-white' 
                      : 'bg-white border border-gray-200 hover:border-accent text-gray-700 hover:bg-accent/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog Content */}
        <section ref={ref} className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className={cn(
                    "bg-white rounded-lg shadow-md overflow-hidden border border-gray-100",
                    "hover:shadow-lg transition-all duration-300",
                    inView ? "opacity-100 animate-slide-up" : "opacity-0"
                  )}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="h-48 bg-gray-100 relative">
                    <div className="absolute top-4 left-4 bg-accent text-white text-xs font-medium px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar size={14} className="mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <Clock size={14} className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <a href={`/blog/${post.id}`} className="inline-flex items-center text-accent hover:text-primary font-medium transition-colors">
                      Leia mais
                      <CircleArrowRight size={18} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                  Anterior
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  3
                </button>
                <span className="px-3 text-gray-500">...</span>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  8
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Próximo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
