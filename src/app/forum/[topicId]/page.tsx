
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TopicClient from "./client";
import { mockPosts } from "@/lib/forum-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return mockPosts.map((post) => ({
    topicId: post.id.toString(),
  }));
}

export default function TopicPage({ params }: { params: { topicId: string } }) {
  const topicId = parseInt(params.topicId, 10);
  const topic = mockPosts.find(p => p.id === topicId);

  if (!topic) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
          <TopicClient topic={topic} />
        </section>
      </main>
      <Footer />
    </>
  );
}
