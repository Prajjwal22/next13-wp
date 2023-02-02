import React from "react";
import Card from "../../cards/Card";
import styles from "./RelatedPosts.module.scss";

export default function RelatedPosts() {
  return (
    <div className={styles.related}>
      <div className={styles.relatedWrapper}>
        <h3 className={styles.relatedTitle}>Related Posts</h3>
        <div className={styles.relatedContent}>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}
