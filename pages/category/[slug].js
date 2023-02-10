import { gql } from "@apollo/client";
import Head from "next/head";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { client } from "../../lib/apollo";
import ThreeColGrid from "../../components/sections/threecolgrid/ThreeColGrid";

export default function Single({ post, menu,seo }) {
  console.log(seo);
  console.log(menu);
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menu={menu} />
      <ThreeColGrid posts={post} />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query GetCategories {
        categories(first: 100) {
          nodes {
            slug
          }
        }
      }
    `,
  });
  return {
    paths: result.data.categories.nodes.map(({ slug }) => {
      return {
        params: { slug },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  console.log(slug);
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
                avatar {
                  url
                }
              }
            }
            categories {
              nodes {
                name
                seo {
                  fullHead
                }
              }
            }
            featuredImage {
              node {
                sourceUrl(size: CNVS_THUMBNAIL)
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
      post: result.data.posts.nodes,
      menu: result.data.menuItems.nodes,
      seo: result.data
    },
    revalidate: 10,
  };
}
