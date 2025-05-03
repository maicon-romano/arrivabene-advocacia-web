
import { useState, useEffect } from 'react';
import * as CryptoJS from 'crypto-js';

interface AdminAuth {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  loginAttempts: number;
  isLocked: boolean;
  lockTimeRemaining: number;
}

// Security settings
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MINUTES = 15;
const SALT = "arrivabene_adv_salt";

// Admin credentials
const ADMIN_USERNAME = "adv.arrivabene@gmail.com";
const ADMIN_PASSWORD_HASH = "f27feef1101a1a1decb21fa9d1a9b0c39c767165e00ee6e8945c10eee8b0c304"; // EAdigital2025 + salt

export const useAdminAuth = (): AdminAuth => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });
  
  const [loginAttempts, setLoginAttempts] = useState<number>(() => {
    return parseInt(localStorage.getItem('adminLoginAttempts') || '0');
  });
  
  const [lockUntil, setLockUntil] = useState<number>(() => {
    return parseInt(localStorage.getItem('adminLockUntil') || '0');
  });
  
  const [lockTimeRemaining, setLockTimeRemaining] = useState<number>(0);
  
  // Check if the account is locked
  const isLocked = lockUntil > Date.now();
  
  // Effect to update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem('adminAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);
  
  // Effect to update localStorage when login attempts change
  useEffect(() => {
    localStorage.setItem('adminLoginAttempts', loginAttempts.toString());
  }, [loginAttempts]);
  
  // Effect to update localStorage when lock time changes
  useEffect(() => {
    localStorage.setItem('adminLockUntil', lockUntil.toString());
  }, [lockUntil]);
  
  // Effect to update remaining lock time
  useEffect(() => {
    if (!isLocked) {
      setLockTimeRemaining(0);
      return;
    }
    
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000 / 60);
      setLockTimeRemaining(remaining);
      
      if (Date.now() > lockUntil) {
        clearInterval(interval);
        setLockTimeRemaining(0);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [lockUntil, isLocked]);
  
  const hashPassword = (password: string): string => {
    return CryptoJS.SHA256(password + SALT).toString();
  };
  
  const login = (username: string, password: string): boolean => {
    // If account is locked, deny login
    if (isLocked) {
      return false;
    }
    
    // Check credentials - in a real app, you'd validate against a database or API
    const inputPasswordHash = hashPassword(password);
    
    if (username === ADMIN_USERNAME && inputPasswordHash === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      return true;
    }
    
    // Increment login attempts and check if we need to lock the account
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    
    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockTime = Date.now() + (LOCK_TIME_MINUTES * 60 * 1000);
      setLockUntil(lockTime);
    }
    
    return false;
  };

  const logout = (): void => {
    setIsAuthenticated(false);
  };

  return { 
    isAuthenticated, 
    login, 
    logout,
    loginAttempts,
    isLocked,
    lockTimeRemaining
  };
};
