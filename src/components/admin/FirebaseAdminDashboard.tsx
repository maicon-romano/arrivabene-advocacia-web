import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LogOut, AlertCircle, Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../contexts/AuthContext";
import PostForm from "./PostForm";
import {
  getAllPosts,
  Post,
  deletePost,
  updatePost,
} from "../../services/posts";
import { uploadImageToCloudinary } from "../../lib/cloudinary";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FirebaseAdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");

  // Para edição de posts
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmDeletePostId, setConfirmDeletePostId] = useState<string | null>(
    null
  );

  // Configurações para o React Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Falha ao carregar as postagens.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado com sucesso!",
        description: "Você foi desconectado do painel administrativo.",
      });
      navigate("/admin/login");
    } catch (err) {
      console.error("Error logging out:", err);
      toast({
        title: "Erro ao desconectar",
        description: "Ocorreu um erro ao tentar fazer logout.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      toast({
        title: "Postagem excluída!",
        description: "A postagem foi removida com sucesso.",
      });
      setConfirmDeletePostId(null);
    } catch (err) {
      console.error("Error deleting post:", err);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao tentar excluir a postagem.",
        variant: "destructive",
      });
    }
  };

  const handleOpenEditDialog = (post: Post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setPreviewUrl(post.imageUrl);
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Formato inválido",
        description: "Apenas imagens são permitidas (JPG, PNG, GIF, WEBP)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "A imagem deve ter no máximo 2MB",
        variant: "destructive",
      });
      return;
    }

    setEditImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEdit = async () => {
    if (!editingPost || !editTitle || !editContent) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o título e o conteúdo da postagem",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsEditSubmitting(true);

      let imageUrl = editingPost.imageUrl;

      // If a new image was selected, upload it
      if (editImage) {
        imageUrl = await uploadImageToCloudinary(editImage);
      }

      // Update post in Firestore
      await updatePost(editingPost.id!, {
        title: editTitle,
        content: editContent,
        imageUrl,
      });

      // Update local state
      const updatedPosts = posts.map((post) => {
        if (post.id === editingPost.id) {
          return {
            ...post,
            title: editTitle,
            content: editContent,
            imageUrl,
          };
        }
        return post;
      });

      setPosts(updatedPosts);

      toast({
        title: "Postagem atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });

      // Reset state and close dialog
      setEditingPost(null);
      setEditTitle("");
      setEditContent("");
      setEditImage(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Error updating post:", err);
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao tentar atualizar a postagem.",
        variant: "destructive",
      });
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const handlePostCreated = () => {
    // Switch to manage posts tab
    setActiveTab("manage");
    // Refresh posts list
    fetchPosts();

    toast({
      title: "Postagem criada!",
      description: "Sua nova postagem foi publicada com sucesso.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-lora">
            Painel Administrativo
          </h1>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="create">Criar Postagem</TabsTrigger>
          <TabsTrigger value="manage">Gerenciar Postagens</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <div className="max-w-3xl mx-auto">
            <PostForm onPostCreated={handlePostCreated} />
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
              {posts.map((post) => (
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
                        <h3 className="font-medium text-lg mb-2 font-lora">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {post.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 100)}
                          ...
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {post.createdAt instanceof Date
                              ? post.createdAt.toLocaleDateString()
                              : new Date(
                                  post.createdAt.toDate()
                                ).toLocaleDateString()}
                          </span>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenEditDialog(post)}
                            >
                              <Pencil size={16} className="mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setConfirmDeletePostId(post.id)}
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

      {/* Edit Post Dialog com scrollable content */}
      <Dialog
        open={editingPost !== null}
        onOpenChange={(open) => !open && setEditingPost(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-lora">Editar Postagem</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-grow pr-2">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  disabled={isEditSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Imagem de Banner</Label>
                <Alert className="bg-blue-50 border-blue-200 text-blue-800 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    O tamanho ideal para o banner é 1280x720 pixels (aspecto 16:9).
                    Imagens com proporções diferentes podem não ser exibidas corretamente.
                    Tamanho máximo: 2MB.
                  </AlertDescription>
                </Alert>
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  disabled={isEditSubmitting}
                />
                {previewUrl && (
                  <div className="mt-2 relative border rounded-md overflow-hidden h-40">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Conteúdo</Label>
                <div className="min-h-[320px]">
                  <ReactQuill
                    theme="snow"
                    value={editContent}
                    onChange={setEditContent}
                    modules={modules}
                    formats={formats}
                    className="h-64"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setEditingPost(null)}
              disabled={isEditSubmitting}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={isEditSubmitting}>
              {isEditSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={confirmDeletePostId !== null}
        onOpenChange={(open) => !open && setConfirmDeletePostId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A postagem será permanentemente
              removida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmDeletePostId) {
                  handleDeletePost(confirmDeletePostId);
                }
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FirebaseAdminDashboard;
