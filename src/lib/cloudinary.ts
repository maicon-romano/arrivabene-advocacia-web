
interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  asset_id: string;
  format: string;
  url: string;
  [key: string]: any;
}

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'blog_uploads');
  
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/drfagqqn4/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }
    
    const data: CloudinaryUploadResponse = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};
