import React from "react";
import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";

export default function ThreeColGrid({posts}) {
  return (
    <div className={styles.threecolGrid}>
      <div className={styles.gridTitle}>
        <h3 className="container">What&apos;s New?</h3>
      </div>
      <div className={styles.gridWrapper}>
        {posts.slice(9,18).map((post,i)=>{
          return <VerticalCard key={i} post={post}/>
        })}
      </div>
    </div>
  );
}
