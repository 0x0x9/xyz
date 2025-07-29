import HomePageClient from '@/components/homepage-client';
import { Suspense } from 'react';

const Home = () => {
  return (
    <Suspense>
      <HomePageClient />
    </Suspense>
  );
};

export default Home;
