
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
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...post,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
  } catch (error) {
    console.error('Error getting posts:', error);
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
    console.error('Error getting post:', error);
    throw error;
  }
};

export const updatePost = async (id: string, data: Partial<Omit<Post, 'id'>>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
