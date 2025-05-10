import React, { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { CircleArrowRight, Clock, Calendar, Search } from "lucide-react";
import { Link } from 'react-router-dom';
import BlogHeader from '../components/BlogHeader';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import { getAllPosts } from '../services/posts';
import { Post } from '../services/posts';
import BlogCard from '../components/BlogCard';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from '@/components/ui/pagination';

const POSTS_PER_PAGE = 6; // Number of posts to display per page

const FirebaseBlog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Using react-intersection-observer for animation
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Falha ao carregar os posts do blog.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Filter posts by search term
  const filteredPosts = posts.filter(post => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
  // Get current page posts
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on search
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const getPaginationNumbers = () => {
    let pages = [];
    
    // For a small number of pages, show all of them
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    // Always include page 1
    pages.push(1);
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after page 1 if there's a gap
    if (startPage > 2) {
      pages.push(null); // Represents ellipsis
    }
    
    // Add the pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before the last page if there's a gap
    if (endPage < totalPages - 1) {
      pages.push(null); // Represents ellipsis
    }
    
    // Always include the last page
    pages.push(totalPages);
    
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-grow pt-16"> {/* Add padding-top to account for fixed header */}
        {/* Hero Section */}
        <section className="bg-primary py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in font-playfair">
                Blog Jurídico Arrivabene
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-10 animate-fade-in font-lora" style={{ animationDelay: "0.2s" }}>
                Acompanhe nossos artigos e fique atualizado sobre as principais novidades jurídicas
              </p>
              
              <form onSubmit={handleSearch} className="relative max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <input 
                  type="text" 
                  placeholder="Buscar no blog..." 
                  className="w-full py-4 pl-5 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 font-lora"
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
        
        {/* Blog Content */}
        <section ref={ref} className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 font-lora">Carregando posts...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 font-lora">{error}</p>
              </div>
            ) : currentPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post, index) => (
                  <div 
                    key={post.id}
                    className={cn(
                      "opacity-0",
                      inView && "opacity-100 animate-slide-up"
                    )}
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-medium text-gray-600 mb-2 font-playfair">Nenhum resultado encontrado</h3>
                <p className="text-gray-500 font-lora">Tente buscar por outros termos</p>
                {searchTerm && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                    className="mt-4 px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-lora"
                  >
                    Limpar busca
                  </button>
                )}
              </div>
            )}
            
            {/* Pagination - Only show if we have more than one page */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={prevPage} 
                        className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")}
                      />
                    </PaginationItem>
                    
                    {getPaginationNumbers().map((page, index) => (
                      page === null ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => goToPage(page as number)}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={nextPage} 
                        className={cn("cursor-pointer", currentPage === totalPages && "pointer-events-none opacity-50")}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
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

export default FirebaseBlog;
