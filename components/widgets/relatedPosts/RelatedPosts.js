import React from "react";
import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./RelatedPosts.module.scss";

export default function RelatedPosts({post}) {
  return (
    <div className={styles.related}>
      <div className={styles.relatedWrapper}>
        <h3 className={styles.relatedTitle}>Related Posts</h3>
        <div className={styles.relatedContent}>
          {/* <VerticalCard post={post} /> */}
        </div>
      </div>
    </div>
  );
}
