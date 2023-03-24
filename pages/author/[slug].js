import { gql } from "@apollo/client";
import React from "react";
import Head from "next/head";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { client } from "../../lib/apollo";
import ThreeColGrid from "../../components/sections/threecolgrid/ThreeColGrid";

export default function Single({ post, menu,seo }) {

    console.log(post)

  const authorName = post[0]?.author?.node?.name || "Editorial Staff"
  
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{authorName + " Archives"}</title>
      </Head>
      <Header menu={menu} />
      <ThreeColGrid archiveName={authorName} posts={post} />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
    query AuthorSlug {
        users {
          nodes {
            slug
          }
        }
      }
    `,
  });
  const paths = []
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const result = await client.query({
    query: gql`
    query GetPostsByAuthor ($slug: String!){
        menuItems {
            nodes {
              key: id
              parentId
              title: label
              url
            }
          }
        posts(where: {authorName: $slug}) {
          nodes {
            modified
            title
            slug
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            author {
                node {
                  avatar {
                    url
                  }
                  name
                  description
                  slug
                }
              }
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
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
