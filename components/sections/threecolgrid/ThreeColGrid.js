import React from "react";
import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";
import { useRouter } from "next/router";

export default function ThreeColGrid({ posts }) {
  const router = useRouter();
  console.log(router);
  console.log("dsds", posts);
  return (
    <div className={styles.threecolGrid}>
      <div className={styles.gridTitle}>
        <h3 className="container">What&apos;s New?</h3>
      </div>
      <div className={styles.gridWrapper}>
        {router.pathname === "/"
          ? posts.slice(9, 18).map((post, i) => {
              return <VerticalCard key={i} post={post} />;
            })
          : posts.map((post, i) => {
              return <VerticalCard key={i} post={post} />;
            })}
      </div>
    </div>
  );
}
