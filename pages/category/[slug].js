import { gql } from "@apollo/client";
import React from "react";
import Head from "next/head";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { client } from "../../lib/apollo";
import ThreeColGrid from "../../components/sections/threecolgrid/ThreeColGrid";
import parse  from "html-react-parser"

export default function Single({ post, menu, footerMenu }) {
  const catName = post[0].categories.nodes[0].name;
  const yoastData = post[0].categories.nodes[0].seo.fullHead.replace(
    /api.howtoshout.com/g,
    "howtoshout.com"
  );
  const SEO = parse(yoastData);

  console.log(footerMenu)

  return (
    <div>
      <Head>
        {SEO}
        <link rel="icon" href="/favicon.ico" />
        <title>{catName + " Archives"}</title>
      </Head>
      <Header menu={menu} />
      <ThreeColGrid archiveName={catName} posts={post} />
      <Footer footerMenu={footerMenu} />
    </div>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query CategoriesSlug {
        categories(first: 100) {
          nodes {
            slug
            databaseId
          }
        }
      }
    `,
  });
  const paths = [];
  return {
    // paths: result.data.categories.
    // nodes.map(({ slug }) => {
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
      menu: result?.data?.Navigation.menuItems?.nodes,
      footerMenu: result?.data.menu.menuItems?.nodes,
    },
    revalidate: 10,
  };
}
