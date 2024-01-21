import React from 'react'
import ListCard from '../../cards/listcard/ListCard'
import OverlayCard from '../../cards/overlay/OverlayCard'
import styles from './FeatGrid.module.scss'

type FeatProps = {
  posts: Posts[]
}

export default function FeatGrid({posts}:FeatProps) {
  return (
    <div className={styles.featGrid}>
        <div className={styles.gridWrapper}>
            <div className={styles.left}>
                <OverlayCard post={posts[0]}/>
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
