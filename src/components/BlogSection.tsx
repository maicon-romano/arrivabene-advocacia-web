
import React from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { CircleArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";

const BlogSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Get posts from BlogContext
  const { posts } = useBlog();
  
  // Get latest 3 posts for display
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

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

        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-lg shadow-md overflow-hidden border border-gray-100",
                "hover:shadow-lg transition-all duration-300",
                inView ? "opacity-100 animate-slide-up" : "opacity-0"
              )}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className="h-40 bg-gray-100 relative">
                {post.coverImage ? (
                  <img 
                    src={post.coverImage}
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
                  <span className="mr-4">{post.date}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-primary mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-accent hover:text-primary font-medium transition-colors">
                  Leia mais
                  <CircleArrowRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

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
