
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useBlog, BlogPost } from '../contexts/BlogContext';
import { Plus, Trash, Edit, LogOut, Save } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminLogin = ({ onLogin }: { onLogin: (username: string, password: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    onLogin(username, password);
    setError('Credenciais inválidas');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Admin - Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Usuário</Label>
                <Input 
                  id="username" 
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Digite sua senha" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button className="w-full mt-6" type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
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

  // New post state
  const [newPost, setNewPost] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    excerpt: '',
    content: '',
    category: categories.filter(c => c !== 'Todos')[0] || 'Outros',
    date: new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace('.', ''),
    readTime: '5 min de leitura'
  });

  // New category state
  const [newCategory, setNewCategory] = useState('');

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
      category: categories.filter(c => c !== 'Todos')[0] || 'Outros',
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace('.', ''),
      readTime: '5 min de leitura'
    });

    toast({
      title: "Post criado com sucesso!",
      description: "O post foi adicionado ao blog.",
      variant: "default"
    });
  };

  const handleAddCategory = () => {
    if (!newCategory) {
      toast({
        title: "Erro ao criar categoria",
        description: "Por favor, digite um nome para a categoria.",
        variant: "destructive"
      });
      return;
    }

    if (categories.includes(newCategory)) {
      toast({
        title: "Categoria já existe",
        description: "Por favor, escolha um nome diferente.",
        variant: "destructive"
      });
      return;
    }

    addCategory(newCategory);
    setNewCategory('');
    
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

  const handleEditPost = () => {
    if (!editingPost) return;

    updatePost(editingPost.id, editingPost);
    setEditingPost(null);
    
    toast({
      title: "Post atualizado",
      description: "O post foi atualizado com sucesso.",
      variant: "default"
    });
  };

  const handlePreviewPost = (id: number) => {
    navigate(`/blog/${id}`);
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
          <h1 className="text-xl font-bold">Painel Administrativo</h1>
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
            <h2 className="text-2xl font-bold mb-4">Gerenciar Posts</h2>
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum post encontrado</p>
                <Button className="mt-4" onClick={switchToNewPostTab}>
                  Criar novo post
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handlePreviewPost(post.id)}
                            >
                              Ver
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingPost(post)}
                                >
                                  <Edit size={14} />
                                </Button>
                              </DialogTrigger>
                              {editingPost && editingPost.id === post.id && (
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Editar Post</DialogTitle>
                                    <DialogDescription>
                                      Faça as alterações necessárias no post
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="title" className="text-right">
                                        Título
                                      </Label>
                                      <Input
                                        id="title"
                                        value={editingPost.title}
                                        onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="category" className="text-right">
                                        Categoria
                                      </Label>
                                      <select 
                                        id="category"
                                        value={editingPost.category}
                                        onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                                        className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      >
                                        {categories
                                          .filter(cat => cat !== 'Todos')
                                          .map(category => (
                                            <option key={category} value={category}>{category}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="excerpt" className="text-right">
                                        Resumo
                                      </Label>
                                      <Textarea
                                        id="excerpt"
                                        value={editingPost.excerpt}
                                        onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                                        className="col-span-3"
                                        rows={3}
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-start gap-4">
                                      <Label htmlFor="content" className="text-right pt-2">
                                        Conteúdo
                                      </Label>
                                      <Textarea
                                        id="content"
                                        value={editingPost.content}
                                        onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                                        className="col-span-3"
                                        rows={10}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit" onClick={handleEditPost}>
                                      <Save size={16} className="mr-2" />
                                      Salvar alterações
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              )}
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                >
                                  <Trash size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Excluir post</DialogTitle>
                                  <DialogDescription>
                                    Tem certeza que deseja excluir o post "{post.title}"? Esta ação não pode ser desfeita.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Cancelar</Button>
                                  <Button variant="destructive" onClick={() => handleDeletePost(post.id)}>
                                    Excluir
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Nova Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor="newCategory">Nome da Categoria</Label>
                      <Input 
                        id="newCategory" 
                        placeholder="Digite o nome da categoria" 
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddCategory}>
                      <Plus size={16} className="mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Categorias Existentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {categories.map((category, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-md"
                      >
                        <span>{category}</span>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteCategory(category)}
                          disabled={category === 'Todos'}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="new-post">
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
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="post-category">Categoria</Label>
                    <select
                      id="post-category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
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
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="post-content">Conteúdo</Label>
                    <Textarea 
                      id="post-content" 
                      placeholder="Digite o conteúdo completo do post" 
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
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
                        onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="post-date">Data</Label>
                      <Input 
                        id="post-date" 
                        placeholder="Ex: 01 Jan 2025" 
                        value={newPost.date}
                        onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCreatePost}>
                  <Plus size={16} className="mr-2" />
                  Criar Post
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const Admin = () => {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const { toast } = useToast();

  const handleLogin = (username: string, password: string) => {
    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
        variant: "default"
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado com sucesso!",
      description: "Você foi desconectado do painel administrativo.",
      variant: "default"
    });
  };

  return isAuthenticated ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
};

export default Admin;
