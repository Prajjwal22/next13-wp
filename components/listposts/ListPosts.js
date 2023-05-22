'use client'
import HorizontalCard from "../cards/horizontal/HorizontalCard";
import styles from "./ListPosts.module.scss";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client/core";


const query = gql` query PostLists {
  posts(first:20) {
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
}`

export default function ListPosts() {

  const data = useSuspenseQuery(query)
  const posts = data.data.posts.nodes

  return (
    <div className={styles.listPosts}>
      <h3 className="container">Popular of the Week!</h3>
      <div className={styles.listPostsWrapper}>
        {posts.slice(6,9).map((post, i)=> {
          return <HorizontalCard key={i} post={post} />
        })}
      </div>
    </div>
  );
}
