import Image from "next/image";
import React from "react";
import styles from "./ListCard.module.scss";

export default function ListCard() {
  return (
    <div className={styles.listCard}>
      <div className={styles.cardCategory}>Elon Musk</div>
      <div className={styles.cardTitle}>
        <h3>
          Twitter’s solution for ruining verification is another check mark
        </h3>
        <span className={styles.cardMeta}>
          <span className={styles.cardAuthor}>Chris Welch</span>
          <span className={styles.cardTime}>31, Nov 2022</span>
        </span>
      </div>
      <div className={styles.cardThumb}>
        <Image
          width={100}
          height={100}
          src={"/featured.avif"}
          alt="post title"
        />
      </div>
    </div>
  );
}
