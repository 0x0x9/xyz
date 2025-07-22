
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import Link from 'next/link';
import { mockPosts } from '@/lib/forum-data';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const categories = ["Tout", "Matériel", "Logiciel", "Accessoire", "Collaborations", "Discussions"];

export default function ForumClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('Tout');
    const { toast } = useToast();

    const filteredPosts = mockPosts.filter(post => {
        const matchesCategory = category === 'Tout' || post.category === category;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleNewPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Sujet publié !",
            description: "Votre nouveau sujet est maintenant visible sur le forum.",
        });
        // In a real app, you would handle form submission here.
        // We can close the dialog by finding the close button.
        document.getElementById('close-new-post-dialog')?.click();
    };

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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="w-full md:w-auto">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Nouveau Sujet
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card sm:max-w-[625px]">
                        <form onSubmit={handleNewPost}>
                            <DialogHeader>
                                <DialogTitle>Créer un nouveau sujet</DialogTitle>
                                <DialogDescription>
                                    Partagez votre idée ou question avec la communauté.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">Titre</Label>
                                    <Input id="title" placeholder="Comment faire..." className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">Catégorie</Label>
                                    <Select required defaultValue="Discussions">
                                        <SelectTrigger id="category" className="col-span-3">
                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent className="glass-card">
                                            {categories.filter(c => c !== 'Tout').map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="content" className="text-right pt-2">Message</Label>
                                    <Textarea id="content" placeholder="Bonjour à tous..." className="col-span-3" rows={8} required />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button id="close-new-post-dialog" type="button" variant="ghost">Annuler</Button>
                                </DialogClose>
                                <Button type="submit">Publier le sujet</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {filteredPosts.map(post => (
                     <Link href={`/forum/${post.id}`} key={post.id} className="block">
                         <Card className="bg-card/95 hover:bg-card/25 dark:bg-card/80 dark:hover:bg-card/50 border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:backdrop-blur-xl transition-all duration-300 cursor-pointer">
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
                    </Link>
                ))}
            </div>
        </div>
    );
}
