
'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/components/auth-component";
import { useState } from "react";
import { Loader2, Sparkles, Cloud, Users, Check } from "lucide-react";
import { motion } from "framer-motion";
import OriaAnimation from "@/components/ui/oria-animation";
import { Separator } from "@/components/ui/separator";

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.545 8.558a9.42 9.42 0 0 1 .139 1.626c0 6.097-4.464 10.9-9.98 10.9-5.524 0-10.02-4.48-10.02-10.019 0-5.525 4.5-10.02 10.02-10.02 2.76 0 5.253 1.11 7.087 2.922l-2.656 2.656z" transform="translate(4.455 1.442)"/></svg>
)

const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path d="M12.42,20.35c-1.46,0-2.91-1-3.66-2.58a3,3,0,0,1-.46-2.58,10.66,10.66,0,0,1,3.22-6.11,5.65,5.65,0,0,1,4.55-2.26c.29,0,.59,0,1-.06a.71.71,0,0,1,.84.66,6.34,6.34,0,0,1-.58,3.9c-.83,2.21-2.66,4.6-5.88,4.92,0,0,0,0,0,0Zm2.5-16.17a4.1,4.1,0,0,1,2,3.32,4.45,4.45,0,0,1-3.32,4.24,3.73,3.73,0,0,1-3.52-2.3,4.25,4.25,0,0,1,2.8-5.06,1.18,1.18,0,0,1,1.17,0,1.18,1.18,0,0,1,.8-.2Z"/></svg>
)

const SignupPage = () => {
    const { handleSignUp, handleGoogleSignIn, handleAppleSignIn } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await handleSignUp(name, email, password);
        setLoading(false);
    };

    const features = [
        { icon: Sparkles, text: "Suite d'outils créatifs IA" },
        { icon: Cloud, text: "Stockage et synchronisation (X)cloud" },
        { icon: Users, text: "Espace de collaboration unique" },
    ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-24">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden glass-card shadow-2xl shadow-primary/10 border-white/20">
            {/* Left side - Feature highlight */}
            <div className="hidden md:flex flex-col bg-black/20 p-8 text-foreground justify-between">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Créez votre compte.</h2>
                    <p className="text-muted-foreground">Rejoignez une communauté de créatifs et accédez à des outils qui repoussent les limites de l'imagination.</p>
                </div>
                <div className="space-y-8">
                     <ul className="space-y-4">
                        {features.map((feature, i) => (
                            <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * i }}
                                className="flex items-center gap-3 text-sm"
                            >
                                <Check className="h-5 w-5 text-primary" />
                                <span>{feature.text}</span>
                            </motion.li>
                        ))}
                    </ul>
                    <OriaAnimation className="w-40 h-40 mx-auto" />
                </div>
            </div>

             {/* Right side - Signup Form */}
            <div className="p-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col justify-center h-full"
                >
                    <Card className="w-full max-w-sm bg-transparent border-none shadow-none">
                      <CardHeader className="text-center p-0">
                        <CardTitle className="text-3xl font-bold text-foreground">Inscription</CardTitle>
                        <CardDescription className="text-muted-foreground pt-2">
                          Rejoignez (X)yzz dès aujourd'hui.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-8 p-0">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Nom complet</Label>
                              <Input 
                                id="name" 
                                type="text" 
                                placeholder="Jean Dupont" 
                                required 
                                className="bg-background/50 border-input focus:bg-background/80" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder="email@exemple.com" 
                                required 
                                className="bg-background/50 border-input focus:bg-background/80" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="password">Mot de passe</Label>
                              <Input 
                                id="password" 
                                type="password" 
                                required 
                                className="bg-background/50 border-input focus:bg-background/80"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="6 caractères minimum"
                              />
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Créer mon compte
                            </Button>
                        </form>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-4 pt-6 p-0">
                         <div className="relative w-full flex items-center">
                            <Separator className="shrink" />
                            <span className="px-2 text-xs uppercase text-muted-foreground">OU</span>
                            <Separator className="shrink" />
                        </div>
                        <div className="w-full space-y-3">
                            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                                <GoogleIcon />
                                <span className="ml-2">S'inscrire avec Google</span>
                            </Button>
                             <Button onClick={handleAppleSignIn} variant="outline" className="w-full bg-black text-white hover:bg-neutral-800 hover:text-white">
                                <AppleIcon />
                                <span className="ml-2">S'inscrire avec Apple</span>
                            </Button>
                        </div>
                         <p className="text-center text-sm text-muted-foreground pt-4">
                            Déjà un compte?{' '}
                            <Link href="/login" className="font-semibold text-primary hover:underline">
                                Se connecter
                            </Link>
                        </p>
                      </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default SignupPage;
