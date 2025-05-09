
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Home, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      await login(email, password);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
      navigate('/admin');
    } catch (err: any) {
      setError('Falha no login. Verifique suas credenciais.');
      toast({
        title: "Erro ao fazer login",
        description: err.message || "Credenciais inválidas",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px] mb-4">
        <CardHeader>
          <CardTitle className="text-center">Admin - Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="Digite seu email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
            
            <Button 
              className="w-full mt-6" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Link to="/">
        <Button variant="outline" className="flex items-center gap-2">
          <Home size={16} />
          Voltar para o site
        </Button>
      </Link>
    </div>
  );
};

export default AdminLogin;
