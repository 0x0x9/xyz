
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Eye, PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockPosts = [
  {
    id: 1,
    title: "Comment optimiser le rendu 3D sur la Station X-1 ?",
    author: "Alexandre D.",
    avatar: "https://placehold.co/100x100.png",
    hint: "person portrait",
    category: "Matériel",
    replies: 12,
    views: 120,
    lastActivity: "il y a 2 heures",
  },
  {
    id: 2,
    title: "Partage : Mes premiers essais avec le plugin (X)flux",
    author: "Juliette L.",
    avatar: "https://placehold.co/100x100.png",
    hint: "person portrait",
    category: "Logiciel",
    replies: 5,
    views: 89,
    lastActivity: "il y a 5 heures",
  },
  {
    id: 3,
    title: "Recherche coloriste pour un projet d'animation",
    author: "Studio Anima",
    avatar: "https://placehold.co/100x100.png",
    hint: "abstract logo",
    category: "Collaborations",
    replies: 2,
    views: 45,
    lastActivity: "il y a 1 jour",
  },
  {
    id: 4,
    title: "Avis sur la tablette X-Pen pour l'illustration ?",
    author: "Clara M.",
    avatar: "https://placehold.co/100x100.png",
    hint: "person portrait",
    category: "Accessoire",
    replies: 23,
    views: 250,
    lastActivity: "il y a 2 jours",
  },
];

const categories = ["Tout", "Matériel", "Logiciel", "Accessoire", "Collaborations", "Discussions"];

export default function CommunityClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('Tout');

    const filteredPosts = mockPosts.filter(post => {
        const matchesCategory = category === 'Tout' || post.category === category;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Rechercher un sujet ou un auteur..." 
                        className="pl-9 bg-background/50" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full md:w-[180px] bg-background/50">
                        <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                        {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button size="lg" className="w-full md:w-auto">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Nouveau Sujet
                </Button>
            </div>

            <div className="space-y-4">
                {filteredPosts.map(post => (
                     <Card key={post.id} className="bg-card/95 hover:bg-card/25 dark:bg-card/80 dark:hover:bg-card/50 border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:backdrop-blur-xl transition-all duration-300 cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                            <Avatar className="h-12 w-12 hidden sm:flex">
                                <AvatarImage src={post.avatar} alt={post.author} data-ai-hint={post.hint} />
                                <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold text-lg">{post.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    Par <span className="font-medium text-accent">{post.author}</span> • Dernière activité {post.lastActivity}
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-6 text-muted-foreground text-sm">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{post.replies}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>{post.views}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
