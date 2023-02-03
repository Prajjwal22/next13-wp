import React from "react";
import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./RelatedPosts.module.scss";

export default function RelatedPosts() {
  return (
    <div className={styles.related}>
      <div className={styles.relatedWrapper}>
        <h3 className={styles.relatedTitle}>Related Posts</h3>
        <div className={styles.relatedContent}>
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
        </div>
      </div>
    </div>
  );
}
