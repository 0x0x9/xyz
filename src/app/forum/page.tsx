import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ForumClient from "./client";

const ForumPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Forum de la Communauté
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Échangez, partagez vos créations et collaborez avec d'autres passionnés.
            </p>
          </div>
          <ForumClient />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ForumPage;
