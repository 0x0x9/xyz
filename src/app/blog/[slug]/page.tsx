import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PostClient from "./client";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const getPost = (slug: string) => {
    return blogPosts.find(p => p.slug === slug);
}

const PostPage = ({ params }: { params: { slug: string } }) => {
    const post = getPost(params.slug);
    if (!post) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="flex-1">
                <PostClient post={post} />
            </main>
            <Footer />
        </>
    );
};

export default PostPage;
