
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleSignIn: (email: string, pass: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, pass: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        toast({ description: "Connexion réussie ! Bienvenue." });
        router.push('/account');
    } catch (error: any) {
        let description = "Une erreur est survenue.";
        if (error.code === 'auth/invalid-credential') {
            description = "Email ou mot de passe incorrect.";
        }
        toast({ variant: 'destructive', title: "Erreur de connexion", description });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ description: "Vous avez été déconnecté." });
      router.push('/');
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Erreur de déconnexion", description: error.message });
    }
  };

  if (loading) {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
