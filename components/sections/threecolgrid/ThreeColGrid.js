import React, { useState, useEffect } from "react";
import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";
import { useRouter } from "next/router";

export default function ThreeColGrid({ posts }) {

  const [catName, setCatName] = useState('')

  useEffect(() => {
    setCatName(window.location.pathname.split("/").pop())
  }, [])
  
  const router = useRouter();
  return (
    <div className={styles.threecolGrid}>
      <div className={styles.gridTitle}>
        <h3 className="container">{router.pathname==="/" ? "What's New?" : "Latest Posts From " + catName }</h3>
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
