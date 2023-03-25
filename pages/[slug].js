import { gql } from "@apollo/client";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import RelatedPosts from "../components/widgets/relatedPosts/RelatedPosts";
import SinglePost from "../Layouts/singlepost/SinglePost";
import { client } from "../lib/apollo";
import parse  from "html-react-parser"

export default function Single({ post, menu, footerMenu }) {
  const postsByCategory = post.categories.nodes[0].posts.nodes.slice(0, 4);

  const relatedPosts = postsByCategory.filter(
    (relPost) => relPost.title !== post.title
  );

  const yoastData = post.seo.fullHead.replace(/api.howtoshout.com/g, "howtoshout.com") 

  const SEO = parse(yoastData)

  console.log()
  return (
    <div>
      <Head>
        {SEO}
        <link rel="icon" href="/favicon.ico" />
        <title>{post.title + " - HowToShout"}</title>
      </Head>
      <Header menu={menu} />
      <SinglePost post={post}>
        <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
      </SinglePost>
      <RelatedPosts relatedPosts={relatedPosts} />
      <Footer footerMenu={footerMenu} />
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
                    slug
                  }
                }
                featuredImage {
                  node {
                    sourceUrl(size: LARGE)
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
    variables: { slug },
  });

  return {
    props: {
      post: result?.data?.postBy,
      menu: result?.data?.Navigation.menuItems?.nodes,
      footerMenu: result?.data.menu.menuItems?.nodes,
    },
    revalidate: 10,
  };
}
