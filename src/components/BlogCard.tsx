
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { CircleArrowRight, Clock, Calendar } from "lucide-react";
import { Post } from '../services/posts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Convert Firestore timestamp to JavaScript Date
  const date = post.createdAt instanceof Date 
    ? post.createdAt 
    : post.createdAt.toDate();
  
  const formattedDate = format(date, 'dd MMM yyyy', { locale: ptBR });
  
  // Create excerpt from content (first 150 chars)
  const excerpt = post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '');
  
  // Estimated read time (roughly 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="h-48 bg-gray-100 relative">
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar size={14} className="mr-1" />
          <span className="mr-4">{formattedDate}</span>
          <Clock size={14} className="mr-1" />
          <span>{readTime} min de leitura</span>
        </div>
        
        <h3 className="text-xl font-semibold text-primary mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        
        <Link 
          to={`/blog/${post.id}`} 
          className="inline-flex items-center text-accent hover:text-primary font-medium transition-colors"
        >
          Leia mais
          <CircleArrowRight size={18} className="ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
