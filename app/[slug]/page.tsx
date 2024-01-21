import PostPage from "@/components/templates/PostPage";
import SinglePost from "@/components/templates/SinglePost";
import RelatedPosts from "@/components/widgets/relatedPosts/RelatedPosts";
import { getAllParams, getPostBySlug } from "@/lib/wordpress";
import React from "react";

type SingleProps = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};
export default  function SinglePostPage({
  params: { slug },
  children,
}: SingleProps) {
 


  return (
   <PostPage slug={slug}>{children}</PostPage>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await getAllParams();

  return posts.map((post: Posts) => ({
    slug: post.slug,
  }));
}
