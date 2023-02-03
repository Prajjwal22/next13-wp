import React from 'react'
import ListCard from '../../cards/listcard/ListCard'
import OverlayCard from '../../cards/overlay/OverlayCard'
import styles from './FeatGrid.module.scss'

export default function FeatGrid() {
  return (
    <div className={styles.featGrid}>
        <div className={styles.gridWrapper}>
            <div className={styles.left}>
                <OverlayCard/>
            </div>
            <div className={styles.right}>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
            </div>
        </div>
    </div>
  )
}
