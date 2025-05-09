
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { CircleArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Post, getAllPosts } from "../services/posts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const BlogSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get latest 3 posts for display
  const latestPosts = posts.slice(0, 3);

  // Function to format date
  const formatPostDate = (postDate: any) => {
    if (postDate instanceof Date) {
      return format(postDate, 'dd/MM/yyyy', { locale: ptBR });
    } else if (postDate && typeof postDate.toDate === 'function') {
      return format(postDate.toDate(), 'dd/MM/yyyy', { locale: ptBR });
    }
    return 'Data indisponível';
  };

  // Function to estimate read time
  const estimateReadTime = (content: string) => {
    // Strip HTML tags
    const strippedContent = content.replace(/<[^>]*>/g, '');
    // Average reading speed: 200 words per minute
    const words = strippedContent.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min de leitura`;
  };

  const getExcerpt = (content: string, maxLength = 120) => {
    // Strip HTML tags
    const strippedContent = content.replace(/<[^>]*>/g, '');
    if (strippedContent.length <= maxLength) return strippedContent;
    return strippedContent.substring(0, maxLength) + '...';
  };

  return (
    <section id="blog" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-primary mb-4",
            inView ? "opacity-100 animate-slide-up" : "opacity-0"
          )}>
            Blog Jurídico
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className={cn(
            "max-w-2xl mx-auto text-gray-600",
            inView ? "opacity-100 animate-slide-up" : "opacity-0"
          )} style={{ animationDelay: "0.2s" }}>
            Fique por dentro das principais novidades jurídicas relevantes para você e seu negócio.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando artigos...</p>
          </div>
        ) : latestPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum artigo publicado ainda.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <div 
                key={post.id}
                className={cn(
                  "bg-white rounded-lg shadow-md overflow-hidden border border-gray-100",
                  "hover:shadow-lg transition-all duration-300",
                  inView ? "opacity-100 animate-slide-up" : "opacity-0"
                )}
                style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              >
                <div className="h-40 bg-gray-100 relative">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex items-center justify-center h-full text-primary opacity-50 text-lg">Imagem do Post</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-4">{formatPostDate(post.createdAt)}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{estimateReadTime(post.content)}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-primary mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{getExcerpt(post.content)}</p>
                  
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center text-accent hover:text-primary font-medium transition-colors">
                    Leia mais
                    <CircleArrowRight size={18} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={cn(
          "text-center mt-12",
          inView ? "opacity-100 animate-slide-up" : "opacity-0"
        )} style={{ animationDelay: "0.9s" }}>
          <Link 
            to="/blog" 
            className="inline-block bg-accent hover:bg-primary text-white px-8 py-3 rounded-md transition-colors"
          >
            Acesse nosso Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
