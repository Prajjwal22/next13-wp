import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaEnvelope, FaFacebook, FaTwitter } from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";
import Button from "../../button/Button";
import { FiCommand } from "react-icons/fi";
import { useState } from "react";

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
  }
`;

const POSTS_PER_PAGE = 9;

export default function LoadMore({ archiveName }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { data, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      first: POSTS_PER_PAGE,
    },
    onFetchMore: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onCompleted: () => {
      setLoading(false);
    },
  });

  const handleLoadMore = () => {
    setLoading(true);

    fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        return {
          posts: {
            pageInfo: fetchMoreResult.posts.pageInfo,
            nodes: [...prevResult.posts.nodes, ...fetchMoreResult.posts.nodes],
            __typename: prevResult.posts.__typename,
          },
        };
      },
    });
  };


  if (error) {
    return <p>Sorry, an error has occurred. Please reload the page.</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.posts.nodes.length) {
    return <p>No posts have been published.</p>;
  }

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { nodes, pageInfo } = data.posts;

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
          ? nodes.map((post, i) => {
              return <VerticalCard key={i} post={post} />;
            })
          : nodes.map((post, i) => {
              return (
                <>
                  <VerticalCard key={i} catSlug={catSlug} post={post} />
                </>
              );
            })}
      </div>

      {pageInfo.hasNextPage ? (
        <Button
          onClick={handleLoadMore}
          label={loading ? "Loading..." : "Load More"}
          icon={
            <FiCommand className={loading ? "loading-icon" : ""} size={20} />
          }
          center
          type="primaryBtn"
        />
      ) : (
        <p>✅ All posts loaded.</p>
      )}
    </div>
  );
}
