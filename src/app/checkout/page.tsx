
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import CheckoutClient from "./client";
import { Suspense } from 'react';

function CheckoutPageSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            <div className="lg:col-span-7 space-y-8">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-80 w-full" />
            </div>
             <div className="lg:col-span-5">
                 <Skeleton className="h-96 w-full" />
             </div>
        </div>
    )
}

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Finaliser ma commande
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Vérifiez votre commande et finalisez votre achat en toute sécurité.
            </p>
          </div>
          <Suspense fallback={<CheckoutPageSkeleton/>}>
            <CheckoutClient />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default CheckoutPage;
