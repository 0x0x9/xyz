
'use client';

import { type Post } from '@/lib/blog-data';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function PostClient({ post }: { post: Post }) {
  return (
    <article className="container mx-auto px-4 md:px-6 py-28 md:py-36">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Retour au blog
        </Link>
        
        <header className="space-y-4">
          <p className="text-primary font-semibold">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.avatar} data-ai-hint={post.imageHint} />
                <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span>{post.author}</span>
            </div>
            <span>&bull;</span>
            <time dateTime={post.date}>{format(new Date(post.date), "d MMMM yyyy", { locale: fr })}</time>
            <span>&bull;</span>
            <span>{post.readingTime} min de lecture</span>
          </div>
        </header>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden my-12 glass-card">
          <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.imageHint} />
        </div>

        <div
          className="prose prose-lg dark:prose-invert text-foreground/90 max-w-none prose-h2:font-bold prose-h2:text-3xl prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-primary prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
