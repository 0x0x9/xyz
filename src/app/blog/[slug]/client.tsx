
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
          className="prose prose-lg dark:prose-invert text-foreground/80 max-w-none 
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mb-6 prose-h2:mt-16 prose-h2:border-b prose-h2:pb-4
            prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mb-4 prose-h3:mt-12
            prose-p:leading-relaxed prose-p:my-6
            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-primary prose-blockquote:font-normal prose-blockquote:text-muted-foreground prose-blockquote:text-lg prose-blockquote:py-2
            prose-ul:my-6 prose-li:my-2 prose-li:marker:text-primary
            prose-strong:text-foreground
            prose-code:bg-muted prose-code:text-foreground prose-code:font-medium prose-code:px-2 prose-code:py-1 prose-code:rounded-md"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
