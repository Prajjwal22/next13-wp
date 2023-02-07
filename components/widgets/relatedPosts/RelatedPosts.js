import React from "react";
import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./RelatedPosts.module.scss";

export default function RelatedPosts({relatedPosts}) {

  console.log(relatedPosts)

  return (
    <div className={styles.related}>
      <div className={styles.relatedWrapper}>
        <h3 className={styles.relatedTitle}>Related Posts</h3>
        <div className={styles.relatedContent}>
          {relatedPosts.map ((post,i)=> {
            return <VerticalCard post={post} key={i} />
          })}
        </div>
      </div>
    </div>
  );
}
