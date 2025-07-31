
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Search, PlusCircle, ExternalLink, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { collaborationPosts } from '@/lib/collaborations-data';

export default function CollaborationsClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('Tout');
    const categories = ['Tout', 'Recherche de projet', 'Offre de service', 'Portfolio'];

    const filteredPosts = collaborationPosts.filter(post => {
        const matchesCategory = category === 'Tout' || post.type === category;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            || post.author.toLowerCase().includes(searchTerm.toLowerCase())
            || post.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Rechercher par compétence, nom, projet..." 
                        className="pl-9 bg-background/50" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full md:w-[220px] bg-background/50">
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
                    Publier une annonce
                </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {filteredPosts.map(post => (
                     <Card key={post.id} className="glass-card flex flex-col group">
                         <CardHeader className="flex-row items-center gap-4">
                             <Avatar className="w-14 h-14">
                                 <AvatarImage src={post.avatar} alt={post.author} data-ai-hint={post.imageHint} />
                                 <AvatarFallback>{post.author.substring(0,2)}</AvatarFallback>
                             </Avatar>
                             <div>
                                 <CardTitle>{post.author}</CardTitle>
                                 <CardDescription>{post.title}</CardDescription>
                             </div>
                         </CardHeader>
                         <CardContent className="flex-grow">
                             <p className="text-sm text-muted-foreground mb-4">{post.description}</p>
                             <div className="flex flex-wrap gap-2">
                                 {post.skills.map(skill => (
                                     <Badge key={skill} variant="secondary">{skill}</Badge>
                                 ))}
                             </div>
                         </CardContent>
                         <CardFooter className="mt-auto">
                            {post.type === 'Offre de service' && (
                                <Button variant="outline" className="w-full">
                                    Contacter <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                             {post.type === 'Recherche de projet' && (
                                <Button className="w-full">
                                    Voir l'offre <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                             {post.type === 'Portfolio' && (
                                <Button variant="secondary" className="w-full">
                                    Voir le portfolio <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                         </CardFooter>
                     </Card>
                 ))}
                 {/* AI Generated Post Card */}
                 <Card className="glass-card flex flex-col group border-primary/50 ring-2 ring-primary/20">
                         <CardHeader className="flex-row items-center gap-4">
                             <Avatar className="w-14 h-14 bg-primary/10 border-2 border-primary/30">
                                 <Bot className="w-8 h-8 text-primary m-auto" />
                             </Avatar>
                             <div>
                                 <CardTitle>Oria</CardTitle>
                                 <CardDescription>Suggestion IA</CardDescription>
                             </div>
                         </CardHeader>
                         <CardContent className="flex-grow">
                             <p className="text-sm text-muted-foreground mb-4">Basé sur votre activité récente, nous avons identifié une opportunité de projet pour vous.</p>
                             <div className="flex flex-wrap gap-2">
                                <Badge variant="default">Développement Web</Badge>
                                <Badge variant="secondary">React</Badge>
                                <Badge variant="secondary">TailwindCSS</Badge>
                             </div>
                         </CardContent>
                         <CardFooter className="mt-auto">
                            <Button className="w-full">
                                Découvrir le projet
                                <Sparkles className="ml-2 h-4 w-4" />
                            </Button>
                         </CardFooter>
                     </Card>
            </div>
        </div>
    );
}

