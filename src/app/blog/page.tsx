import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import BlogClient from "./client";
import { blogPosts } from "@/lib/blog-data";

export const metadata = {
  title: '(X)press - Le Blog de (X)yzz.ai',
  description: 'Plongez au coeur de l\'écosystème créatif avec nos articles, tutoriels et analyses.',
};

const BlogPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
           <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              (X)press
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Plongez au coeur de l'écosystème créatif. Tutoriels, analyses et inspiration pour repousser vos limites.
            </p>
          </div>
          <BlogClient posts={blogPosts} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default BlogPage;
