
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data for a blog post
  // In a real app, you would fetch this data based on the id
  const post = {
    id: parseInt(id || "1"),
    title: "Novas regulamentações empresariais: O que seu negócio precisa saber",
    content: `
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.</p>
      
      <p class="mb-4">Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit.</p>
      
      <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">O que mudou na legislação?</h2>
      
      <p class="mb-4">Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Novas diretrizes para proteção de dados corporativos</li>
        <li>Requisitos fiscais para empresas de pequeno e médio porte</li>
        <li>Procedimentos de conformidade ambiental</li>
        <li>Regulamentações trabalhistas atualizadas</li>
      </ul>
      
      <p class="mb-4">Cras sagittis, mi in euismod lobortis, nunc lectus luctus orci, eget tristique velit tellus nec justo. Nullam vel urna lorem. Donec placerat cursus laoreet. Ut eu lorem eget lacus volutpat sagittis a nec massa.</p>
      
      <blockquote class="border-l-4 border-accent pl-4 italic my-6 text-gray-700">
        "É fundamental que os empresários se mantenham atualizados sobre as mudanças na legislação para evitar problemas futuros e garantir a conformidade de suas operações."
      </blockquote>
      
      <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">Como se preparar para as novas regras</h2>
      
      <p class="mb-4">Proin ullamcorper pretium orci. Donec nec scelerisque leo. Nam massa dolor, imperdiet nec consequat a, congue id sem. Maecenas malesuada faucibus finibus. Donec vitae libero porttitor, laoreet sapien a, ultrices leo. Duis dictum vestibulum ante vitae ullamcorper.</p>
      
      <p class="mb-4">Aliquam lacinia diam eu sem malesuada, in interdum ante bibendum. Etiam felis erat, elementum eu felis a, molestie volutpat risus. Nunc vel luctus mi, non laoreet sapien. Integer blandit bibendum velit, eleifend lacinia orci cursus vel. Nam molestie est id nisi viverra, nec fermentum ipsum condimentum.</p>
      
      <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">Conclusão</h2>
      
      <p class="mb-4">Quisque vitae varius ex, eu volutpat orci. Quisque vitae varius ex. Etiam maximus urna non libero hendrerit, vitae consectetur purus volutpat. Curabitur at arcu id turpis posuere bibendum. Sed commodo risus lacus, non ultricies mi commodo non.</p>
    `,
    date: "15 Abr 2025",
    readTime: "5 min de leitura",
    category: "Empresarial",
    author: "Dr. Eduardo Arrivabene",
    authorTitle: "Advogado Especialista em Direito Empresarial"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <a href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={18} className="mr-1" />
              Voltar para o blog
            </a>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center text-sm text-white/80 mb-3">
                <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded mr-4">
                  {post.category}
                </span>
                <Calendar size={14} className="mr-1" />
                <span className="mr-4">{post.date}</span>
                <Clock size={14} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <p className="text-white font-medium">{post.author}</p>
                  <p className="text-white/70 text-sm">{post.authorTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-12 gap-8">
              {/* Sidebar */}
              <div className="hidden lg:block col-span-3">
                <div className="sticky top-24">
                  {/* Share Links */}
                  <div className="mb-8 border-b border-gray-200 pb-6">
                    <h4 className="font-semibold text-primary mb-4">Compartilhar</h4>
                    <div className="flex space-x-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                        <Facebook size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600">
                        <Twitter size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800">
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                  
                  {/* Related Posts */}
                  <div>
                    <h4 className="font-semibold text-primary mb-4">Artigos Relacionados</h4>
                    <div className="space-y-4">
                      <a href="#" className="block group">
                        <h5 className="text-gray-800 group-hover:text-accent transition-colors">A importância dos contratos bem elaborados para pequenos negócios</h5>
                        <p className="text-sm text-gray-500">03 Abr 2025</p>
                      </a>
                      <a href="#" className="block group">
                        <h5 className="text-gray-800 group-hover:text-accent transition-colors">Como proteger seu patrimônio pessoal em negócios empresariais</h5>
                        <p className="text-sm text-gray-500">15 Mar 2025</p>
                      </a>
                      <a href="#" className="block group">
                        <h5 className="text-gray-800 group-hover:text-accent transition-colors">Recuperação judicial para pequenas empresas: Quando é indicado</h5>
                        <p className="text-sm text-gray-500">20 Fev 2025</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="col-span-12 lg:col-span-9 lg:pl-8">
                <div className="max-w-3xl">
                  {/* Featured Image */}
                  <div className="w-full h-80 bg-gray-100 rounded-lg mb-8 flex items-center justify-center text-gray-400">
                    Imagem do Artigo
                  </div>
                  
                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                      <a href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-accent/10">Legislação</a>
                      <a href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-accent/10">Empresarial</a>
                      <a href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-accent/10">Compliance</a>
                      <a href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-accent/10">Pequenas Empresas</a>
                    </div>
                  </div>
                  
                  {/* Mobile Share */}
                  <div className="mt-8 border-t border-gray-200 pt-6 lg:hidden">
                    <h4 className="font-semibold text-primary mb-4">Compartilhar</h4>
                    <div className="flex space-x-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                        <Facebook size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600">
                        <Twitter size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800">
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
