import PostPage from "@/components/templates/PostPage";
import { getAllParams } from "@/lib/wordpress";
import React from "react";
import type { Metadata } from 'next'

export default function SinglePostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <PostPage slug={slug}/>
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await getAllParams();

  return posts.map((post: Posts) => ({
    slug: post.slug,
  }));
}


export const metadata: Metadata = {
  title: "PostPage",
  description: '...',
}