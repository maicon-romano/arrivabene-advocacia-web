
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import BlogHeader from '../components/BlogHeader';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import { useToast } from "@/components/ui/use-toast";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts } = useBlog();
  const { toast } = useToast();
  
  // Find the post by id
  const post = posts.find(p => p.id === Number(id));
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!post && id) {
      toast({
        title: "Post não encontrado",
        description: "O artigo que você está procurando não existe ou foi removido.",
        variant: "destructive"
      });
      
      // Redirect to blog page after a short delay
      setTimeout(() => {
        navigate('/blog');
      }, 2000);
    }
  }, [id, post, toast, navigate]);
  
  if (!post) {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-10"></div>
            <div className="h-40 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <BlogHeader />
      <main>
        {/* Hero Banner */}
        <div className="w-full h-64 bg-primary/90 relative mt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70"></div>
          <div className="container mx-auto px-4 h-full relative z-10 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center max-w-4xl">{post.title}</h1>
          </div>
        </div>
        
        {/* Article Content */}
        <article className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-primary mb-8">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para o blog
            </Link>
            
            {/* Meta info */}
            <div className="flex items-center text-gray-500 mb-8">
              <Calendar size={16} className="mr-1" />
              <span className="mr-4">{post.date}</span>
              <Clock size={16} className="mr-1" />
              <span className="mr-4">{post.readTime}</span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
            </div>
            
            {/* Featured image */}
            <div className="w-full aspect-video bg-gray-100 mb-8 rounded-lg"></div>
            
            {/* Content */}
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
              <div className="text-gray-700 whitespace-pre-line">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
        
        {/* Related Posts section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {posts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map(relatedPost => (
                  <div 
                    key={relatedPost.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 bg-gray-100"></div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-primary mb-2">{relatedPost.title}</h3>
                      <Link 
                        to={`/blog/${relatedPost.id}`}
                        className="text-accent hover:text-primary text-sm font-medium inline-flex items-center"
                      >
                        Leia mais
                        <ArrowLeft size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default BlogPost;
