
import React from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useToast } from "@/components/ui/use-toast";
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin = () => {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const { toast } = useToast();

  const handleLogin = (username: string, password: string) => {
    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
        variant: "default"
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado com sucesso!",
      description: "Você foi desconectado do painel administrativo.",
      variant: "default"
    });
  };

  return isAuthenticated ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
};

export default Admin;
