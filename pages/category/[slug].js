import { gql } from "@apollo/client";
import React from "react";
import Head from "next/head";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { client } from "../../lib/apollo";
import ThreeColGrid from "../../components/sections/threecolgrid/ThreeColGrid";

export default function Single({ post, menu,seo }) {


  const catName = post[0].categories.nodes[0].name
  
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{catName + " Archives"}</title>
      </Head>
      <Header menu={menu} />
      <ThreeColGrid archiveName={catName} posts={post} />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
    query CategoriesSlug {
      categories(first: 100, where: {hideEmpty: true, exclude: ["1"]}) {
        nodes {
          slug
          categoryId
        }
      }
    }
    `,
  });
  const paths = []
  return {
    // paths: result.data.categories.nodes.map(({ slug }) => {
    //   return {
    //     params: { slug },
    //   };
    // }),
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const result = await client.query({
    query: gql`
      query PostsByCategory($slug: String!) {
        menuItems {
          nodes {
            key: id
            parentId
            title: label
            url
          }
        }
        posts(where: { categoryName: $slug }) {
          nodes {
            title
            author {
              node {
                name
                slug
                avatar {
                  url
                }
              }
            }
            categories {
              nodes {
                name
                slug
                seo {
                  fullHead
                }
              }
            }
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            excerpt
            modified
            slug
          }
        }
      }
    `,
    variables: { slug },
  });

  return {
    props: {
      post: result?.data?.posts?.nodes,
      menu: result?.data?.menuItems?.nodes,
      seo: result?.data
    },
    revalidate: 10,
  };
}
