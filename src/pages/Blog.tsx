
import React, { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { CircleArrowRight, Clock, Calendar, Search } from "lucide-react";
import { Link } from 'react-router-dom';
import BlogHeader from '../components/BlogHeader';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import { useBlog, BlogPost } from '../contexts/BlogContext';

const BlogPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { 
    posts, 
    categories, 
    searchTerm, 
    setSearchTerm, 
    activeCategory, 
    setActiveCategory 
  } = useBlog();

  // Filter posts by search term and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The search is already handled by the controlled input
  };

  return (
    <div className="min-h-screen">
      <BlogHeader />
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-20 relative overflow-hidden mt-16">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                Blog Jurídico Arrivabene
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Acompanhe nossos artigos e fique atualizado sobre as principais novidades jurídicas
              </p>
              
              <form onSubmit={handleSearch} className="relative max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <input 
                  type="text" 
                  placeholder="Buscar no blog..." 
                  className="w-full py-4 pl-5 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                >
                  <Search size={20} />
                </button>
              </form>
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
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full transition-all ${
                    category === activeCategory 
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
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
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
                      
                      <Link 
                        to={`/blog/${post.id}`} 
                        className="inline-flex items-center text-accent hover:text-primary font-medium transition-colors"
                      >
                        Leia mais
                        <CircleArrowRight size={18} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-medium text-gray-600 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-500">Tente buscar por outros termos ou categorias</p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Limpar busca
                  </button>
                )}
              </div>
            )}
            
            {/* Pagination - Only show if we have enough posts */}
            {filteredPosts.length > 6 && (
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
                    Próximo
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default BlogPage;
