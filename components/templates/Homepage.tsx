import React from "react";
import Header from "@/components/header/Header";
import { getMenu, getPosts } from "@/lib/wordpress";
import FeatGrid from "@/components/sections/featGrid/FeatGrid";
import ListPosts from "@/components/listposts/ListPosts";
import LoadMore from "@/components/sections/threecolgrid/LoadMore";
import Footer from "@/components/footer/Footer";

export default async function Homepage() {
  const posts = await getPosts();

  return (
    <main>
      <FeatGrid posts={posts} />
      <ListPosts posts={posts} />
      <LoadMore />
    </main>
  );
}
