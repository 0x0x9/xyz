
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Post } from '@/lib/blog-data';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(posts.map(p => p.category))];

  const handleFilter = (category: string | null) => {
    setActiveCategory(category);
    if (category) {
      setFilteredPosts(posts.filter(p => p.category === category));
    } else {
      setFilteredPosts(posts);
    }
  };

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        <Badge
          onClick={() => handleFilter(null)}
          variant={!activeCategory ? 'default' : 'secondary'}
          className="cursor-pointer text-base px-4 py-1"
        >
          Tout
        </Badge>
        {categories.map(cat => (
          <Badge
            key={cat}
            onClick={() => handleFilter(cat)}
            variant={activeCategory === cat ? 'default' : 'secondary'}
            className="cursor-pointer text-base px-4 py-1"
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
            <Card className="h-full flex flex-col glass-card overflow-hidden transition-all duration-300 transform hover:-translate-y-2">
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
                <h2 className="text-xl font-bold mt-2 flex-grow">{post.title}</h2>
                <p className="text-sm text-muted-foreground mt-4">
                  {format(new Date(post.date), "d MMMM yyyy", { locale: fr })} &bull; {post.readingTime} min de lecture
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
