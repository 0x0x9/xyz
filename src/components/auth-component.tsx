
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile, type User, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleSignIn: (email: string, pass: string) => Promise<void>;
  handleSignUp: (name: string, email: string, pass: string) => Promise<void>;
  handlePasswordReset: (email: string) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  handleAppleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');


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

  const handleSignUp = async (name: string, email: string, pass: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName: name });
       setUser(auth.currentUser); // Refresh user state
      toast({ description: "Inscription réussie ! Bienvenue." });
      router.push('/account');
    } catch (error: any) {
        let description = "Une erreur est survenue.";
        if (error.code === 'auth/email-already-in-use') {
            description = "Cette adresse e-mail est déjà utilisée.";
        } else if (error.code === 'auth/weak-password') {
            description = "Le mot de passe doit contenir au moins 6 caractères.";
        }
        toast({ variant: 'destructive', title: "Erreur d'inscription", description });
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ description: "Un e-mail de réinitialisation a été envoyé." });
      router.push('/login');
    } catch (error: any) {
        let description = "Une erreur est survenue.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
            description = "Aucun utilisateur trouvé avec cette adresse e-mail.";
        }
        toast({ variant: 'destructive', title: "Erreur", description });
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({ description: 'Connexion avec Google réussie !' });
      router.push('/account');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Erreur de connexion', description: error.message });
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      toast({ description: 'Connexion avec Apple réussie !' });
      router.push('/account');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Erreur de connexion', description: error.message });
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
    <AuthContext.Provider value={{ user, loading, handleSignIn, handleSignUp, handlePasswordReset, handleGoogleSignIn, handleAppleSignIn, handleSignOut }}>
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
