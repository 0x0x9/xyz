import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import CareersClient from "./client";

export const metadata = {
  title: 'Carrières - (X)yzz.ai',
  description: 'Rejoignez une équipe de passionnés qui révolutionnent le monde de la création.',
};

const CareersPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36 space-y-24">
          <CareersClient />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CareersPage;
