import React from 'react'
import ListCard from '../../cards/listcard/ListCard'
import OverlayCard from '../../cards/overlay/OverlayCard'
import styles from './FeatGrid.module.scss'

export default function FeatGrid({posts}) {
  return (
    <div className={styles.featGrid}>
        <div className={styles.gridWrapper}>
            <div className={styles.left}>
                <OverlayCard posts={posts}/>
            </div>
            <div className={styles.right}>
              {posts.slice(1,6).map((post,i) => {
                return <ListCard key={i} post = {post}/>
              })}
                
            </div>
        </div>
    </div>
  )
}
