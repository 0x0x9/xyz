
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FeaturesClient from "./client";

export const metadata = {
  title: 'Fonctionnalités - (X)yzz.ai',
  description: "Découvrez en détail l'écosystème (X)yzz : (X)OS, la Station X-1 et notre suite d'outils créatifs IA.",
};

const FeaturesPage = () => {
  return (
    <>
      <Header />
      <main>
        <FeaturesClient />
      </main>
      <Footer />
    </>
  );
}

export default FeaturesPage;
