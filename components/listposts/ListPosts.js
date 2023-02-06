import React from "react";
import HorizontalCard from "../cards/horizontal/HorizontalCard";
import styles from "./ListPosts.module.scss";

export default function ListPosts() {
  return (
    <div className={styles.listPosts}>
      <h3 className="container">Popular of the Week!</h3>
      <div className={styles.listPostsWrapper}>
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
      </div>
    </div>
  );
}
