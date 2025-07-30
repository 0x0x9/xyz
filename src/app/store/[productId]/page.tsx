
import { notFound } from 'next/navigation';
import { products, type Product } from '@/lib/products';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProductClient from './client';

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id.toString(),
  }));
}

function getProduct(id: string): Product | undefined {
  return products.find(p => p.id.toString() === id);
}

const ProductPage = async ({ params: { productId } }: { params: { productId: string } }) => {
  const product = getProduct(productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProductClient product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}

export default ProductPage;
