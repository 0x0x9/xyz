
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MessageSquare, ThumbsUp, Reply } from 'lucide-react';
import Link from 'next/link';
import { type Topic, mockReplies } from '@/lib/forum-data';
import { Textarea } from '@/components/ui/textarea';

export default function TopicClient({ topic }: { topic: Topic }) {
  const replies = mockReplies[topic.id] || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/forum">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au forum
          </Link>
        </Button>
      </div>

      {/* Original Post */}
      <Card className="glass-card mb-8">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <Avatar className="h-12 w-12">
            <AvatarImage src={topic.avatar} alt={topic.author} data-ai-hint={topic.hint} />
            <AvatarFallback>{topic.author.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{topic.title}</h1>
            <p className="text-sm text-muted-foreground">
              Par <span className="font-medium text-accent">{topic.author}</span> • {topic.lastActivity}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert dark:prose-invert text-foreground/80 max-w-none prose-p:leading-relaxed">
            <p>Bonjour à tous,</p>
            <p>
              Je me demandais comment vous optimisiez vos rendus 3D sur la Station X-1. J'ai un projet assez lourd en ce moment et je cherche à gagner du temps de calcul sans trop perdre en qualité.
            </p>
            <p>
              Quels sont vos réglages préférés ? Utilisez-vous des plugins spécifiques ou des astuces particulières ? Merci d'avance pour vos partages d'expérience !
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button variant="outline"><ThumbsUp className="mr-2 h-4 w-4"/>J'aime</Button>
            <Button variant="secondary"><Reply className="mr-2 h-4 w-4"/>Répondre</Button>
        </CardFooter>
      </Card>

      {/* Replies */}
      <div className="space-y-6">
         <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {replies.length} Réponse{replies.length > 1 ? 's' : ''}
        </h2>
        {replies.map(reply => (
          <Card key={reply.id} className="glass-card">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={reply.avatar} alt={reply.author} data-ai-hint={reply.hint} />
                <AvatarFallback>{reply.author.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{reply.author}</p>
                <p className="text-xs text-muted-foreground">{reply.timestamp}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{reply.content}</p>
            </CardContent>
             <CardFooter className="flex justify-end">
                <Button variant="ghost" size="sm"><ThumbsUp className="mr-2 h-4 w-4"/>{reply.likes}</Button>
             </CardFooter>
          </Card>
        ))}
      </div>

       {/* Reply Box */}
       <Card className="glass-card mt-8">
          <CardHeader>
            <h3 className="text-lg font-semibold">Votre réponse</h3>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Écrivez votre réponse ici..." rows={5} className="bg-background/50"/>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Publier la réponse</Button>
          </CardFooter>
        </Card>

    </div>
  );
}
