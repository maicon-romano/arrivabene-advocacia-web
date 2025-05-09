
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogOut, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../contexts/AuthContext";
import PostForm from "./PostForm";
import { getAllPosts, Post, deletePost } from '../../services/posts';

const FirebaseAdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Falha ao carregar as postagens.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado com sucesso!",
        description: "Você foi desconectado do painel administrativo.",
      });
      navigate('/admin/login');
    } catch (err) {
      console.error('Error logging out:', err);
      toast({
        title: "Erro ao desconectar",
        description: "Ocorreu um erro ao tentar fazer logout.",
        variant: "destructive"
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta postagem?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
        toast({
          title: "Postagem excluída!",
          description: "A postagem foi removida com sucesso.",
        });
      } catch (err) {
        console.error('Error deleting post:', err);
        toast({
          title: "Erro ao excluir",
          description: "Ocorreu um erro ao tentar excluir a postagem.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
          <p className="text-gray-600">Logado como: {currentUser?.email}</p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="create">Criar Postagem</TabsTrigger>
          <TabsTrigger value="manage">Gerenciar Postagens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="max-w-3xl mx-auto">
            <PostForm />
          </div>
        </TabsContent>
        
        <TabsContent value="manage">
          {isLoading ? (
            <div className="text-center py-8">Carregando postagens...</div>
          ) : error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma postagem encontrada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-32 h-32">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {post.content.substring(0, 100)}...
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {post.createdAt instanceof Date
                              ? post.createdAt.toLocaleDateString()
                              : new Date(post.createdAt.toDate()).toLocaleDateString()}
                          </span>
                          <div className="space-x-2">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => post.id && handleDeletePost(post.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FirebaseAdminDashboard;
