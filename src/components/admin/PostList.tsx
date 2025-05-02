
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from '../../contexts/BlogContext';

interface PostListProps {
  posts: BlogPost[];
  categories: string[];
  onDeletePost: (id: number) => void;
  onUpdatePost: (id: number, post: BlogPost) => void;
  editingPost: BlogPost | null;
  setEditingPost: (post: BlogPost | null) => void;
  switchToNewPostTab: () => void;
}

const PostList = ({ 
  posts,
  categories,
  onDeletePost,
  onUpdatePost,
  editingPost,
  setEditingPost,
  switchToNewPostTab
}: PostListProps) => {
  const navigate = useNavigate();
  
  const handlePreviewPost = (id: number) => {
    navigate(`/blog/${id}`);
  };

  const handleEditPost = () => {
    if (!editingPost) return;
    onUpdatePost(editingPost.id, editingPost);
  };

  return (
    <>
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
                            <Button variant="destructive" onClick={() => onDeletePost(post.id)}>
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
    </>
  );
};

export default PostList;
