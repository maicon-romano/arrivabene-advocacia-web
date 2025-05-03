
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Lock, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminLoginProps {
  onLogin: (username: string, password: string) => void;
  isLocked: boolean;
  loginAttempts: number;
  lockTimeRemaining: number;
}

const AdminLogin = ({ onLogin, isLocked, loginAttempts, lockTimeRemaining }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    onLogin(username, password);
    setError('Credenciais inválidas');
  };

  const maxAttempts = 5;
  const remainingAttempts = maxAttempts - loginAttempts;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px] mb-4">
        <CardHeader>
          <CardTitle className="text-center">Admin - Login</CardTitle>
        </CardHeader>
        <CardContent>
          {isLocked ? (
            <Alert variant="destructive" className="mb-6">
              <Lock className="h-4 w-4" />
              <AlertTitle>Acesso bloqueado</AlertTitle>
              <AlertDescription>
                Muitas tentativas inválidas. Tente novamente em {lockTimeRemaining} minuto{lockTimeRemaining !== 1 ? 's' : ''}.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Email</Label>
                  <Input 
                    id="username" 
                    placeholder="Digite seu email"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="Digite sua senha" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                
                {loginAttempts > 0 && (
                  <div className="text-sm text-amber-600">
                    {remainingAttempts === 1 ? (
                      <p>Cuidado! Você tem apenas 1 tentativa restante antes do bloqueio.</p>
                    ) : (
                      <p>Tentativas restantes: {remainingAttempts}/{maxAttempts}</p>
                    )}
                  </div>
                )}
              </div>
              <Button className="w-full mt-6" type="submit" disabled={isLocked}>Login</Button>
            </form>
          )}
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
