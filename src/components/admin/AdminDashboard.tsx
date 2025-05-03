
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useBlog, BlogPost } from '../../contexts/BlogContext';
import PostList from './PostList';
import CategoryManager from './CategoryManager';
import NewPost from './NewPost';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { 
    posts, 
    categories,
    addPost,
    deletePost,
    updatePost,
    addCategory,
    deleteCategory
  } = useBlog();

  const todayFormatted = format(new Date(), 'dd MMM yyyy', { locale: ptBR })
    .replace('.', '')
    .replace(/^\w/, c => c.toUpperCase());

  // New post state
  const [newPost, setNewPost] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: categories.filter(c => c !== 'Todos')[0] || 'Outros',
    date: todayFormatted,
    readTime: '5 min de leitura'
  });

  // Edit post state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.excerpt || !newPost.content) {
      toast({
        title: "Erro ao criar post",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    addPost(newPost);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      coverImage: '',
      category: categories.filter(c => c !== 'Todos')[0] || 'Outros',
      date: todayFormatted,
      readTime: '5 min de leitura'
    });

    toast({
      title: "Post criado com sucesso!",
      description: "O post foi adicionado ao blog.",
      variant: "default"
    });
  };

  const handleAddCategory = (category: string) => {
    if (!category) {
      toast({
        title: "Erro ao criar categoria",
        description: "Por favor, digite um nome para a categoria.",
        variant: "destructive"
      });
      return;
    }

    if (categories.includes(category)) {
      toast({
        title: "Categoria já existe",
        description: "Por favor, escolha um nome diferente.",
        variant: "destructive"
      });
      return;
    }

    addCategory(category);
    
    // Update the new post form to use the new category
    setNewPost(prev => ({
      ...prev,
      category: category
    }));
    
    toast({
      title: "Categoria criada com sucesso!",
      description: "A nova categoria foi adicionada.",
      variant: "default"
    });
  };

  const handleDeleteCategory = (category: string) => {
    if (category === 'Todos') {
      toast({
        title: "Operação não permitida",
        description: "Não é possível excluir a categoria 'Todos'.",
        variant: "destructive"
      });
      return;
    }

    deleteCategory(category);
    
    toast({
      title: "Categoria excluída",
      description: "A categoria foi removida com sucesso.",
      variant: "default"
    });
  };

  const handleDeletePost = (id: number) => {
    deletePost(id);
    
    toast({
      title: "Post excluído",
      description: "O post foi removido com sucesso.",
      variant: "default"
    });
  };

  const handleUpdatePost = (id: number, post: BlogPost) => {
    updatePost(id, post);
    setEditingPost(null);
    
    toast({
      title: "Post atualizado",
      description: "O post foi atualizado com sucesso.",
      variant: "default"
    });
  };

  // Fix for the TypeScript error - we need to use a proper TypeScript cast
  const switchToNewPostTab = () => {
    const newPostTab = document.querySelector('[data-state="inactive"][data-value="new-post"]');
    if (newPostTab) {
      // Cast to HTMLElement which has the click() method
      (newPostTab as HTMLElement).click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
            <Link 
              to="/" 
              className="ml-4 text-white/70 text-sm hover:text-white"
            >
              Visualizar site
            </Link>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout} className="text-white">
            <LogOut size={16} className="mr-2" /> Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="new-post">Novo Post</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <PostList 
              posts={posts}
              categories={categories}
              onDeletePost={handleDeletePost}
              onUpdatePost={handleUpdatePost}
              editingPost={editingPost}
              setEditingPost={setEditingPost}
              switchToNewPostTab={switchToNewPostTab}
            />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager 
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </TabsContent>

          <TabsContent value="new-post">
            <NewPost 
              newPost={newPost}
              categories={categories}
              onNewPostChange={setNewPost}
              onCreatePost={handleCreatePost}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
