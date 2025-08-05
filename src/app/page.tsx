import dynamic from 'next/dynamic';

const HomePageClient = dynamic(() => import('@/components/homepage-client'), {
  ssr: false, 
});

const Home = () => {
  return (
      <HomePageClient />
  );
};

export default Home;
