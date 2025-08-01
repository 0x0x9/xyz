
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ description: "Vous avez été déconnecté." });
      router.push('/');
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Erreur de déconnexion", description: error.message });
    }
  };

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


  return { user, loading, handleSignOut, handleSignIn };
};
