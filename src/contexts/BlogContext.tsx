
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define post type
export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
};

// Blog context type
type BlogContextType = {
  posts: BlogPost[];
  categories: string[];
  searchTerm: string;
  activeCategory: string;
  setSearchTerm: (term: string) => void;
  setActiveCategory: (category: string) => void;
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  deletePost: (id: number) => void;
  updatePost: (id: number, post: Partial<BlogPost>) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
};

// Create context
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Sample initial posts
const initialPosts = [
  {
    id: 1,
    title: "Novas regulamentações empresariais: O que seu negócio precisa saber",
    excerpt: "Conheça as mudanças recentes na legislação empresarial e como elas podem afetar o seu negócio e suas operações cotidianas.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
    date: "15 Abr 2025",
    readTime: "5 min de leitura",
    category: "Empresarial"
  },
  {
    id: 2,
    title: "A importância dos contratos bem elaborados para pequenos negócios",
    excerpt: "Entenda como contratos claros e objetivos podem proteger seu empreendimento e evitar problemas futuros com clientes e fornecedores.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
    date: "03 Abr 2025",
    readTime: "4 min de leitura",
    category: "Contratos"
  },
  {
    id: 3,
    title: "Direitos trabalhistas: O que empregadores precisam estar atentos",
    excerpt: "Um guia completo sobre as principais responsabilidades trabalhistas que todo empresário deve conhecer para evitar problemas legais.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
    date: "28 Mar 2025",
    readTime: "6 min de leitura",
    category: "Trabalhista"
  },
  {
    id: 4,
    title: "Como proteger seu patrimônio pessoal em negócios empresariais",
    excerpt: "Aprenda estratégias legais para separar seu patrimônio pessoal do empresarial e proteger seus bens em caso de processos.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
    date: "15 Mar 2025",
    readTime: "5 min de leitura",
    category: "Patrimonial"
  },
  {
    id: 5,
    title: "LGPD e pequenas empresas: Como se adequar à legislação",
    excerpt: "Um guia prático sobre as exigências da Lei Geral de Proteção de Dados para pequenos e médios negócios brasileiros.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
    date: "05 Mar 2025",
    readTime: "7 min de leitura",
    category: "LGPD"
  },
  {
    id: 6,
    title: "Recuperação judicial para pequenas empresas: Quando é indicado",
    excerpt: "Entenda quando e como a recuperação judicial pode ser uma alternativa para empresas em dificuldades financeiras.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
    date: "20 Fev 2025",
    readTime: "6 min de leitura",
    category: "Empresarial"
  }
];

// Provider component
export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get posts from localStorage or use initial posts
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  // Get categories from localStorage or extract from posts
  const [categories, setCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem('blogCategories');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    } else {
      const extractedCategories = Array.from(
        new Set(initialPosts.map(post => post.category))
      );
      return ['Todos', ...extractedCategories];
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Save posts to localStorage when they change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  // Save categories to localStorage when they change
  useEffect(() => {
    localStorage.setItem('blogCategories', JSON.stringify(categories));
  }, [categories]);

  // Add a new post
  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const newPost = { ...post, id: newId };
    setPosts([...posts, newPost]);
    
    // Add category if it's new
    if (!categories.includes(post.category) && post.category !== 'Todos') {
      setCategories([...categories, post.category]);
    }
  };

  // Delete a post
  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Update a post
  const updatePost = (id: number, updatedData: Partial<BlogPost>) => {
    setPosts(posts.map(post => post.id === id ? { ...post, ...updatedData } : post));
  };

  // Add a category
  const addCategory = (category: string) => {
    if (!categories.includes(category) && category !== 'Todos') {
      setCategories([...categories, category]);
    }
  };

  // Delete a category
  const deleteCategory = (category: string) => {
    if (category !== 'Todos') {
      // Update posts with this category to have a default category
      setPosts(posts.map(post => 
        post.category === category ? { ...post, category: 'Outros' } : post
      ));
      setCategories(categories.filter(c => c !== category));
    }
  };

  const value = {
    posts,
    categories,
    searchTerm,
    activeCategory,
    setSearchTerm,
    setActiveCategory,
    addPost,
    deletePost,
    updatePost,
    addCategory,
    deleteCategory
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// Custom hook to use blog context
export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
