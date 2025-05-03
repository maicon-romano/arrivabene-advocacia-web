
import React from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from '../../contexts/BlogContext';
import ImageUpload from './ImageUpload';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface NewPostProps {
  newPost: Omit<BlogPost, 'id'>;
  categories: string[];
  onNewPostChange: (post: Omit<BlogPost, 'id'>) => void;
  onCreatePost: () => void;
}

const NewPost = ({ newPost, categories, onNewPostChange, onCreatePost }: NewPostProps) => {
  const handleImageChange = (imageUrl: string) => {
    onNewPostChange({...newPost, coverImage: imageUrl});
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'dd MMM yyyy', { locale: ptBR })
        .replace('.', '')
        .replace(/^\w/, c => c.toUpperCase());
      onNewPostChange({...newPost, date: formattedDate});
    }
  };
  
  // Parse the current date string to use with the calendar
  const parseCurrentDate = (): Date => {
    try {
      const dateParts = newPost.date.split(' ');
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0]);
        const monthMap: Record<string, number> = {
          'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
          'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
        };
        const month = monthMap[dateParts[1]];
        const year = parseInt(dateParts[2]);
        
        if (!isNaN(day) && month !== undefined && !isNaN(year)) {
          return new Date(year, month, day);
        }
      }
    } catch (error) {
      console.error('Error parsing date:', error);
    }
    
    // Default to current date if parsing fails
    return new Date();
  };
  
  const currentDate = parseCurrentDate();

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
          
          {/* Image Upload */}
          <ImageUpload 
            onImageChange={handleImageChange} 
            currentImage={newPost.coverImage}
          />

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="post-date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newPost.date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {newPost.date || "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={currentDate}
                    onSelect={handleDateChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
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
