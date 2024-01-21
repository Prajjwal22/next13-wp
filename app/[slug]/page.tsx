import SinglePost from "@/components/templates/SinglePost";
import RelatedPosts from "@/components/widgets/relatedPosts/RelatedPosts";
import { getAllParams, getPostBySlug } from "@/lib/wordpress";
import React from "react";

type props = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};
export default async function SingleArticle({
  params: { slug },
  children,
}: props) {
  const post = await getPostBySlug(slug);
  const postsByCategory = post.categories.nodes[0].posts.nodes.slice(0, 4);

  const relatedPosts = postsByCategory.filter(
    (relPost: Posts) => relPost.title !== post.title
  );
  return (
    <>
      <SinglePost post={post}>{children}</SinglePost>
      <RelatedPosts relatedPosts={relatedPosts} />
    </>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await getAllParams();

  return posts.map((post: Posts) => ({
    slug: post.slug,
  }));
}
