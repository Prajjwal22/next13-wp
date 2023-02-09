import { gql } from "@apollo/client";
import { renderToStaticMarkup } from 'react-dom/server';
import Head from "next/head";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import RelatedPosts from "../../components/widgets/relatedPosts/RelatedPosts";
import SinglePost from "../../Layouts/singlepost/SinglePost";
import { client } from "../../lib/apollo";
import ThreeColGrid from "../../components/sections/threecolgrid/ThreeColGrid";

export default function Single({ post, menu }) {
  console.log(post)
  console.log(menu)

  // const postsByslug = post.categories.nodes[0].posts.nodes.slice(0, 4);

  // const relatedPosts = postsByslug.filter(
  //   (relPost) => relPost.title !== post.title
  // );

  // const SEO = post.seo.fullHead;


  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menu={menu} />
      <ThreeColGrid posts = {post}/>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query GetCategories {
        categories(first:100) {
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
  console.log(slug)
  const result = await client.query({
    query: gql`
    query PostsByCategory($slug: String!)  {
      menuItems {
        nodes {
          key: id
          parentId
          title: label
          url
        }
      }
      posts(where: {categoryName: $slug}) {
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
    },
    revalidate: 10,
  };
}
