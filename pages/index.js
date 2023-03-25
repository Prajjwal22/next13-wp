import { gql } from "@apollo/client";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListPosts from "../components/listposts/ListPosts";
import FeatGrid from "../components/sections/featGrid/FeatGrid";
import LoadMore from "../components/sections/threecolgrid/LoadMore";
import ThreeColGrid from "../components/sections/threecolgrid/ThreeColGrid";
import InfiniteScrollList from "../components/sections/threecolgrid/ThreeColGridV2";
import LoadMoreList from "../components/sections/threecolgrid/ThreeColGridV2";
import { client } from "../lib/apollo";

export default function Home({ posts, menu, footerMenu }) {

  return (
    <>
      <Head>
        <title>HowToShout - Get Latest Tech Guides</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menu={menu} />
      <FeatGrid posts={posts} />
      <ListPosts posts={posts} />
      {/* <ThreeColGrid posts={posts} /> */}
      <LoadMore />
      <Footer footerMenu={footerMenu} />
    </>
  );
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query PostLists {
        posts(first:20) {
          nodes {
            title
            slug
            modified
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                avatar {
                  url
                }
                name
                slug
              }
            }
          }
        }
        Navigation: menu(id: "dGVybToxMw==") {
          menuItems {
                 nodes {
                   key: id
                   title: label
                   uri
                 }
               }
         }
        menu(id: "dGVybToz") {
          menuItems {
                 nodes {
                   key: id
                   title: label
                   uri
                 }
               }
         }
      }
    `,
  });

  return {
    props: {
      menu: result?.data?.Navigation.menuItems?.nodes,
      posts: result.data.posts.nodes,
      footerMenu: result?.data.menu.menuItems?.nodes,

    },
    revalidate: 10,
  };
}
