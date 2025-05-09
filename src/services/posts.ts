import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  doc,
  getDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Post {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: Timestamp | Date;
}

const COLLECTION_NAME = 'posts';

export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>) => {
  try {
    console.log("Salvando post no Firestore:", post);
    const postWithTimestamp = {
      ...post,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), postWithTimestamp);
    console.log("Post salvo com sucesso, ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro detalhado ao criar post:', error);
    throw error;
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    console.log("Buscando todos os posts...");
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
    
    console.log(`${posts.length} posts encontrados`);
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};

export const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    throw error;
  }
};

export const updatePost = async (id: string, data: Partial<Omit<Post, 'id'>>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    throw error;
  }
};
