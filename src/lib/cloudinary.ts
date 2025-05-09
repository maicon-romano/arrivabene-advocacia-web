
interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  asset_id: string;
  format: string;
  url: string;
  [key: string]: any;
}

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  console.log("Preparando upload para Cloudinary...");
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'blog_uploads');
  
  try {
    console.log("Enviando imagem para Cloudinary...");
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/drfagqqn4/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      console.error("Resposta não-OK do Cloudinary:", response.status, response.statusText);
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }
    
    const data: CloudinaryUploadResponse = await response.json();
    console.log("Upload bem-sucedido para Cloudinary:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('Erro detalhado no upload para Cloudinary:', error);
    throw new Error('Falha ao fazer upload da imagem. Por favor, tente novamente.');
  }
};
