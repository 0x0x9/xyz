
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Post } from '@/lib/blog-data';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('Tout');

  const categories = ['Tout', ...new Set(posts.map(p => p.category))];
  const filteredPosts = activeCategory === 'Tout' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(cat => (
          <Button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            variant={activeCategory === cat ? 'default' : 'ghost'}
            className="rounded-full"
          >
            {cat}
          </Button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredPosts.map(post => (
          <motion.div layout key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="block group">
              <Card className="h-full flex flex-col glass-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:-translate-y-2">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={post.imageHint}
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-primary font-semibold">{post.category}</p>
                  <h2 className="text-xl font-bold mt-2 flex-grow group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mt-4">
                    {format(new Date(post.date), "d MMMM yyyy", { locale: fr })} &bull; {post.readingTime} min de lecture
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
