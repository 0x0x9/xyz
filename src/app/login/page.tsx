
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

const LoginPage = () => {
    const { handleSignIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await handleSignIn(email, password);
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
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden glass-card shadow-2xl shadow-primary/10 border-white/20">
            {/* Left side - Feature highlight */}
            <div className="hidden md:flex flex-col bg-black/20 p-8 text-foreground justify-between">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Bienvenue dans votre espace créatif.</h2>
                    <p className="text-muted-foreground">Connectez-vous pour libérer tout le potentiel de l'écosystème (X)yzz.ai.</p>
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

             {/* Right side - Login Form */}
            <div className="p-8">
                <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onSubmit={onSubmit}
                    className="flex flex-col justify-center h-full"
                >
                    <Card className="w-full max-w-sm bg-transparent border-none shadow-none">
                      <CardHeader className="text-center p-0">
                        <CardTitle className="text-3xl font-bold text-foreground">Connexion</CardTitle>
                        <CardDescription className="text-muted-foreground pt-2">
                          Accédez à votre compte (X)yzz.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-8 p-0">
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
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Link href="#" className="text-sm text-primary hover:underline">
                              Mot de passe oublié?
                            </Link>
                          </div>
                          <Input 
                            id="password" 
                            type="password" 
                            required 
                            className="bg-background/50 border-input focus:bg-background/80"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-4 pt-8 p-0">
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Se connecter
                        </Button>
                         <p className="text-center text-sm text-muted-foreground">
                            Pas encore de compte?{' '}
                            <Link href="/subscribe" className="font-semibold text-primary hover:underline">
                                S'inscrire
                            </Link>
                        </p>
                      </CardFooter>
                    </Card>
                </motion.form>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default LoginPage;
