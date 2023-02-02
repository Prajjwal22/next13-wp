import React from 'react'
import Card from '../../cards/Card'
import styles from './singleFeat.module.scss'

export default function () {
  return (
    <div className={styles.singleFeat}>
        <div className={styles.singleFeatWrapper}>
            <Card/>
        </div>
    </div>
  )
}
