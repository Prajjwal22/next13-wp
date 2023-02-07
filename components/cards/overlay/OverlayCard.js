import Image from "next/image";
import React from "react";
import { FaClock, FaTimes, FaTimesCircle, FaUser } from "react-icons/fa";
import { formatDate } from "../../../lib/dateFormatter";
import styles from "./OverlayCard.module.scss";

export default function OverlayCard({ posts }) {
  const featuredImage = posts[0].featuredImage.node.sourceUrl;
  const postTitle = posts[0].title;
  const authorName = posts[0].author.node.name;
  const pubDate = posts[0].modified;

  return (
    <div className={styles.overlayCard}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImage}>
          <Image
            src={featuredImage}
            width="800"
            height="500"
            alt="featured image"
          />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{postTitle}</h3>
            <div className={styles.cardMeta}>
              <span className={styles.cardAuthor}>
                <FaUser /> {authorName}
              </span>
              <span className={styles.cardDate}>
                <FaClock />
                {formatDate(new Date(pubDate))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
