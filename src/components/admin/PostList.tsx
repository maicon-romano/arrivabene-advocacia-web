
import React, { useState } from 'react';
import { Pencil, Trash, Search, Image } from 'lucide-react';
import { BlogPost } from '../../contexts/BlogContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ImageUpload from './ImageUpload';

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
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filter posts based on search term
  const filteredPosts = posts.filter(post => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerSearchTerm) ||
      post.content.toLowerCase().includes(lowerSearchTerm) ||
      post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
      post.category.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const handleUpdatePost = () => {
    if (editingPost) {
      onUpdatePost(editingPost.id, editingPost);
    }
  };

  const handleEditPostChange = (field: keyof BlogPost, value: string) => {
    if (editingPost) {
      setEditingPost({ ...editingPost, [field]: value });
    }
  };
  
  const handleImageChange = (imageUrl: string) => {
    if (editingPost) {
      setEditingPost({ ...editingPost, coverImage: imageUrl });
    }
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Pesquisar posts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 bg-gray-100 relative">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover aspect-video md:aspect-auto"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[120px]">
                      <Image size={32} className="text-gray-400" />
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-accent text-white text-xs font-medium px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
                <div className="md:w-3/4 p-4">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {post.date} • {post.readTime}
                  </p>
                  <p className="text-gray-700 line-clamp-2 mb-4">{post.excerpt}</p>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPost(post)}
                    >
                      <Pencil size={16} className="mr-1" /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setPostToDelete(post.id)}
                    >
                      <Trash size={16} className="mr-1" /> Excluir
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Nenhum post encontrado</h3>
          <Button onClick={switchToNewPostTab}>
            Criar novo post
          </Button>
        </div>
      )}

      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
        {editingPost && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Post</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={editingPost.title}
                  onChange={(e) => handleEditPostChange('title', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <select
                  id="edit-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editingPost.category}
                  onChange={(e) => handleEditPostChange('category', e.target.value)}
                >
                  {categories
                    .filter(cat => cat !== 'Todos')
                    .map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))
                  }
                </select>
              </div>

              {/* Cover Image */}
              <ImageUpload 
                onImageChange={handleImageChange}
                currentImage={editingPost.coverImage}
              />
              
              <div className="grid gap-2">
                <Label htmlFor="edit-excerpt">Resumo</Label>
                <Textarea
                  id="edit-excerpt"
                  value={editingPost.excerpt}
                  onChange={(e) => handleEditPostChange('excerpt', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Conteúdo</Label>
                <Textarea
                  id="edit-content"
                  value={editingPost.content}
                  onChange={(e) => handleEditPostChange('content', e.target.value)}
                  rows={10}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-readtime">Tempo de Leitura</Label>
                  <Input
                    id="edit-readtime"
                    value={editingPost.readTime}
                    onChange={(e) => handleEditPostChange('readTime', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-date">Data</Label>
                  <Input
                    id="edit-date"
                    value={editingPost.date}
                    onChange={(e) => handleEditPostChange('date', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingPost(null)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdatePost}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Post Alert Dialog */}
      <AlertDialog open={postToDelete !== null} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O post será permanentemente removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (postToDelete !== null) {
                onDeletePost(postToDelete);
                setPostToDelete(null);
              }
            }}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostList;
