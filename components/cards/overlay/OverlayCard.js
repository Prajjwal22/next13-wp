import Image from "next/image";
import React from "react";
import { FaClock, FaTimes, FaTimesCircle, FaUser } from "react-icons/fa";
import styles from "./OverlayCard.module.scss";

export default function OverlayCard() {
  return (
    <div className={styles.overlayCard}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImage}>
          <Image
            src="/featured.png"
            width="800"
            height="500"
            alt="featured image"
          />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>
              The Best Ways to Boost the Performance of Your PC
            </h3>
            <div className={styles.cardMeta}>
              <span className={styles.cardAuthor}><FaUser/> Alicia Vikander</span>
              <span className={styles.cardDate}><FaClock/>June 23, 2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
