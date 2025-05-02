
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from '../../contexts/BlogContext';

interface NewPostProps {
  newPost: Omit<BlogPost, 'id'>;
  categories: string[];
  onNewPostChange: (post: Omit<BlogPost, 'id'>) => void;
  onCreatePost: () => void;
}

const NewPost = ({ newPost, categories, onNewPostChange, onCreatePost }: NewPostProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Novo Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="post-title">Título</Label>
            <Input 
              id="post-title" 
              placeholder="Digite o título do post" 
              value={newPost.title}
              onChange={(e) => onNewPostChange({...newPost, title: e.target.value})}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="post-category">Categoria</Label>
            <select
              id="post-category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newPost.category}
              onChange={(e) => onNewPostChange({...newPost, category: e.target.value})}
            >
              {categories
                .filter(cat => cat !== 'Todos')
                .map(category => (
                  <option key={category} value={category}>{category}</option>
                ))
              }
            </select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="post-excerpt">Resumo</Label>
            <Textarea 
              id="post-excerpt" 
              placeholder="Digite um breve resumo do post" 
              value={newPost.excerpt}
              onChange={(e) => onNewPostChange({...newPost, excerpt: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="post-content">Conteúdo</Label>
            <Textarea 
              id="post-content" 
              placeholder="Digite o conteúdo completo do post" 
              value={newPost.content}
              onChange={(e) => onNewPostChange({...newPost, content: e.target.value})}
              rows={10}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="post-readtime">Tempo de Leitura</Label>
              <Input 
                id="post-readtime" 
                placeholder="Ex: 5 min de leitura" 
                value={newPost.readTime}
                onChange={(e) => onNewPostChange({...newPost, readTime: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-date">Data</Label>
              <Input 
                id="post-date" 
                placeholder="Ex: 01 Jan 2025" 
                value={newPost.date}
                onChange={(e) => onNewPostChange({...newPost, date: e.target.value})}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onCreatePost}>
          <Plus size={16} className="mr-2" />
          Criar Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewPost;
