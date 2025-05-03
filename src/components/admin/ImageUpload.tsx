
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Trash2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImageUploadProps {
  onImageChange: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUpload = ({ onImageChange, currentImage }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Apenas imagens são permitidas (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 2MB');
      return;
    }

    setIsUploading(true);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageChange(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange('');
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="cover-image">Imagem de Capa</Label>
            
            <Alert className="bg-blue-50 border-blue-200 text-blue-800 mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Para melhor visualização, recomendamos imagens com proporção 16:9 (1280x720px).
                Tamanho máximo: 2MB.
              </AlertDescription>
            </Alert>
            
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('cover-image')?.click()}
                disabled={isUploading}
                className="w-full"
              >
                <Upload size={16} className="mr-2" />
                {isUploading ? 'Carregando...' : previewUrl ? 'Trocar Imagem' : 'Carregar Imagem'}
              </Button>
              {previewUrl && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                >
                  <Trash2 size={16} className="mr-2" />
                  Remover
                </Button>
              )}
              <input
                type="file"
                id="cover-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {previewUrl && (
            <div className="mt-4">
              <Label>Preview</Label>
              <div className="mt-2 relative h-48 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview da imagem"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
