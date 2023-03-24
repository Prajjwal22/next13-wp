import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaEnvelope, FaFacebook, FaTwitter } from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";
import Button from "../../button/Button";
import {FiCommand} from "react-icons/fi"

const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          title
          slug
          modified
          featuredImage {
            node {
              sourceUrl(size: CSCO_MEDIUM)
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
    }
  }
`;

const BATCH_SIZE = 9;

export default function LoadMore({ archiveName }) {
  //   const catSlug = posts[0].categories.nodes[0].slug;

  //   console.log(posts);

  const router = useRouter();

  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: BATCH_SIZE, after: null },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <p>Sorry, an error has occurred. Please reload the page.</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.posts.edges.length) {
    return <p>No posts have been published.</p>;
  }

  const posts = data.posts.edges.map((edge) => edge.node);
  const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage);

  return (
    <div className={styles.threecolGrid}>
      <div className={styles.gridTitle}>
        <h3 className="container">
          {router.pathname === "/"
            ? "What's New?"
            : "Latest Posts From " + archiveName}
        </h3>
      </div>
      {router.pathname === "/" || router.pathname.includes("category") ? (
        ""
      ) : (
        <div className={styles.authorBox}>
          <div className={styles.authorWrapper}>
            <Image
              src={posts[0].author.node.avatar.url}
              width={100}
              height={100}
              alt={posts[0].author.node.name}
            />
            <div className={styles.authorInfo}>
              <p>{posts[0].author.node.description}</p>
              <span className={styles.authorSocial}>
                <span>
                  <FaFacebook size={20} />
                </span>
                <span>
                  <FaTwitter size={20} />
                </span>
                <span>
                  <FaEnvelope size={20} />
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className={styles.gridWrapper}>
        {router.pathname === "/"
          ? posts.map((post, i) => {
              return <VerticalCard key={i} post={post} />;
            })
          : posts.map((post, i) => {
              return (
                <>
                  <VerticalCard key={i} catSlug={catSlug} post={post} />
                </>
              );
            })}
      
      </div>
      {haveMorePosts ? (
          <form
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              fetchMore({
                variables: { after: data.posts.pageInfo.endCursor },
              });
            }}
          >
            <Button label={loading ? "Loading..." : "Load More"} icon={<FiCommand className={loading ? "loading-icon" : ""} size={20}/>} center type="primaryBtn"/>
          </form>
        ) : (
          <p>✅ All posts loaded.</p>
        )}
    </div>
  );
}
