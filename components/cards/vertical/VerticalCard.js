import Image from "next/image";
import React from "react";
import styles from "./VerticalCard.module.scss";

export default function VerticalCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImage}>
          <Image
            src="/featured.avif"
            width={400}
            height={300}
            alt="Post Title"
          />
        </div>
        <div className={styles.cardContent}>
          <span className={styles.cardCategory}>Technology</span>
          <span className={styles.cardTitle}>
            Score Of DGPT Gran Prix 2023 Has Been Already Shared
          </span>
          <span className={styles.cardExcerpt}>
            Back in 2021, Gucci broght the Ninetendo GameBoy Advance for
            enhancing the Gaming Field to catch the audience of E-Sport
            market...
          </span>
          <div className={styles.cardMeta}>
            <div className={styles.cardAvatar}>
              <Image src="/profile.png" alt="author" width={50} height={50} />
            </div>
            <div className={styles.cardAuthorDate}>
              <span className={styles.cardAuthor}>Alicia Vikander</span>
              <span className={styles.cardpubDate}>Jun 31, 2022</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
