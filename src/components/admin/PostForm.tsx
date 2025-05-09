
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { uploadImageToCloudinary } from '../../lib/cloudinary';
import { createPost } from '../../services/posts';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { Editor } from '@tinymce/tinymce-react';

interface PostFormProps {
  onPostCreated?: () => void;
}

const PostForm = ({ onPostCreated }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Apenas imagens são permitidas (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 2MB');
      return;
    }

    setImage(file);
    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !image || !currentUser) {
      setError('Por favor, preencha todos os campos e selecione uma imagem');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      console.log("Iniciando upload da imagem para o Cloudinary...");
      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(image);
      console.log("Imagem enviada com sucesso:", imageUrl);
      
      console.log("Salvando post no Firestore...");
      // Create post in Firestore
      await createPost({
        title,
        content,
        imageUrl,
        author: currentUser.email || 'Unknown',
      });
      console.log("Post salvo com sucesso!");
      
      // Reset form
      setTitle('');
      setContent('');
      setImage(null);
      setPreview(null);
      
      // Notify parent component that a post was created
      if (onPostCreated) {
        onPostCreated();
      } else {
        toast({
          title: "Postagem criada com sucesso!",
          description: "Sua publicação já está disponível no blog.",
        });
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Ocorreu um erro ao criar a postagem. Tente novamente.');
      toast({
        title: "Erro ao criar postagem",
        description: "Verifique os detalhes e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Nova Postagem</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="post-title">Título</Label>
            <Input 
              id="post-title" 
              placeholder="Digite o título da postagem" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="post-content">Conteúdo</Label>
            <Editor
              id="post-content"
              value={content}
              onEditorChange={(content) => setContent(content)}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'emoticons'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'link image media | removeformat | emoticons | code',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                image_advtab: true
              }}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="post-image">Imagem de Banner</Label>
            <Alert className="bg-blue-50 border-blue-200 text-blue-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Esta imagem será usada como banner do post no blog. Para melhor visualização, 
                recomendamos imagens com proporção 16:9. Tamanho máximo: 2MB.
              </AlertDescription>
            </Alert>
            
            <Input 
              id="post-image" 
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
            />
          </div>
          
          {preview && (
            <div className="mt-4">
              <Label>Preview do Banner</Label>
              <div className="mt-2 relative h-48 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={preview}
                  alt="Preview da imagem do banner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-2" />
                  Criar Postagem
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
