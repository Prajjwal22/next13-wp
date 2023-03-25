import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import styles from "./ThreeColGrid.module.scss";

const POSTS_PER_PAGE = 9;

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
`;

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      first: POSTS_PER_PAGE,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { nodes, pageInfo } = data.posts;

  const handleLoadMore = () => {
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

  return (
    <div className={styles.home}>
      <div className={styles.posts}>
        {nodes.map((post) => (
          <div key={post.slug} className={styles.post}>
            <h2 className={styles.title}>
              <Link href={"/" + post.slug}>{post.title}</Link>
            </h2>
            <div
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            ></div>
          </div>
        ))}
        {pageInfo.hasNextPage && (
          <button className={styles.loadMore} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
