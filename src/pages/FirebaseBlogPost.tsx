
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getPostById, Post } from '../services/posts';
import BlogHeader from '../components/BlogHeader';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';

const FirebaseBlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const postData = await getPostById(id);
        setPost(postData);
        if (!postData) {
          setError('Post não encontrado');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Falha ao carregar o post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [id]);

  // Calculate estimated read time
  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute
    return `${readTime} min de leitura`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlogHeader />
        <div className="flex-grow pt-16 flex items-center justify-center">
          <p className="text-xl text-gray-600 font-lora">Carregando post...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlogHeader />
        <div className="flex-grow pt-16 flex flex-col items-center justify-center">
          <p className="text-xl text-gray-600 mb-4 font-lora">{error || 'Post não encontrado'}</p>
          <Link 
            to="/blog"
            className="flex items-center text-accent hover:text-primary font-medium transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            Voltar para o blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Format date
  const date = post.createdAt instanceof Date 
    ? post.createdAt 
    : post.createdAt.toDate();
  const formattedDate = format(date, 'dd MMM yyyy', { locale: ptBR });

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-grow pt-16">
        {/* Hero section with post image */}
        <section className="relative aspect-[16/9] max-h-[400px] bg-gray-100">
          {post.imageUrl ? (
            <img 
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover mx-auto"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </section>
        
        {/* Post content */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link 
              to="/blog"
              className="inline-flex items-center text-accent hover:text-primary font-medium mb-6"
            >
              <ArrowLeft size={18} className="mr-1" />
              Voltar para o blog
            </Link>
            
            {/* Post title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              {post.title}
            </h1>
            
            {/* Post meta */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8 font-lora">
              <div className="flex items-center mr-6 mb-2">
                <Calendar size={14} className="mr-1" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Clock size={14} className="mr-1" />
                <span>{calculateReadTime(post.content)}</span>
              </div>
              {post.author && (
                <div className="flex items-center mb-2">
                  <User size={14} className="mr-1" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
            
            {/* Post content */}
            <div className="prose prose-lg max-w-none font-lora">
              {post.content && post.content.includes('<') ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                // Otherwise, split by newlines for plain text
                post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default FirebaseBlogPost;
