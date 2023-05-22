import React from "react";
import FeatGrid from "../components/sections/featGrid/FeatGrid";
import ListPosts from "../components/listposts/ListPosts";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <FeatGrid />
      <ListPosts />
      <Footer />
    </div>
  );
}
