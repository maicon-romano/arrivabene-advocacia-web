
import React from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useToast } from "@/components/ui/use-toast";
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin = () => {
  const { isAuthenticated, login, logout, loginAttempts, isLocked, lockTimeRemaining } = useAdminAuth();
  const { toast } = useToast();

  const handleLogin = (username: string, password: string) => {
    if (isLocked) {
      toast({
        title: "Acesso bloqueado",
        description: `Muitas tentativas inválidas. Tente novamente em ${lockTimeRemaining} minuto(s).`,
        variant: "destructive"
      });
      return;
    }
    
    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
        variant: "default"
      });
    } else if (!isLocked) {
      const remainingAttempts = 5 - loginAttempts;
      if (remainingAttempts <= 0) {
        toast({
          title: "Acesso bloqueado",
          description: `Muitas tentativas inválidas. Tente novamente em ${lockTimeRemaining} minutos.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Credenciais inválidas",
          description: `Tentativas restantes: ${remainingAttempts}/5`,
          variant: "destructive"
        });
      }
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
    <AdminLogin 
      onLogin={handleLogin} 
      isLocked={isLocked}
      loginAttempts={loginAttempts}
      lockTimeRemaining={lockTimeRemaining}
    />
  );
};

export default Admin;
