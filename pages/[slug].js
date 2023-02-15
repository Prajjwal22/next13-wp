import { gql } from "@apollo/client";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import RelatedPosts from "../components/widgets/relatedPosts/RelatedPosts";
import SinglePost from "../Layouts/singlepost/SinglePost";
import { client } from "../lib/apollo";
import parse  from "html-react-parser"

export default function Single({ post, menu }) {
  const postsByCategory = post.categories.nodes[0].posts.nodes.slice(0, 4);

  const relatedPosts = postsByCategory.filter(
    (relPost) => relPost.title !== post.title
  );

  console.log(relatedPosts)

  const SEO = parse( post.seo.fullHead)
  return (
    <div>
      <Head>
        {SEO}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menu={menu} />
      <SinglePost post={post}>
        <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
      </SinglePost>
      <RelatedPosts relatedPosts={relatedPosts} />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query GetPosts {
        posts(first: 1000) {
          nodes {
            slug
          }
        }
      }
    `,
  });
  const paths = []
  return {
    // paths: result?.data?.posts?.nodes.map(({ slug }) => {
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
      query SinglePostBySlug($slug: String!) {
        postBy(slug: $slug) {
          author {
            node {
              avatar {
                url
              }
              name
              slug
            }
          }
          postId
          categories {
            nodes {
              name
              slug
              posts(first: 4) {
                nodes {
                  title
                  slug
                  modified
                  categories {
                    nodes {
                      name
                      slug
                    }
                  }
                  excerpt
                  author {
                    node {
                      avatar {
                        url
                      }
                      name
                    }
                  }
                  featuredImage {
                    node {
                      sourceUrl(size: CNVS_THUMBNAIL)
                    }
                  }
                }
              }
            }
          }
          featuredImage {
            node {
              sourceUrl(size: CSCO_LARGE)
            }
          }
          modified
          slug
          title
          content
          seo {
            fullHead
          }
        }
        menuItems {
          nodes {
            key: id
            parentId
            title: label
            url
          }
        }
      }
    `,
    variables: { slug },
  });

  return {
    props: {
      post: result?.data?.postBy,
      menu: result?.data?.menuItems?.nodes,
    },
    revalidate: 10,
  };
}
