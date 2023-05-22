'use client'

import React from 'react'
import ListCard from '../../cards/listcard/ListCard'
import OverlayCard from '../../cards/overlay/OverlayCard'
import styles from './FeatGrid.module.scss'
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

export default function FeatGrid() {

  const data = useSuspenseQuery(query)
  console.log(data.data.posts.nodes)
  const posts = data.data.posts.nodes
  return (
    <div className={styles.featGrid}>
        <div className={styles.gridWrapper}>
            <div className={styles.left}>
                <OverlayCard posts={posts}/>
            </div>
            <div className={styles.right}>
              {posts.slice(1,5).map((post,i) => {
                return <ListCard key={i} post = {post}/>
              })}
                
            </div>
        </div>
    </div>
  )
}
