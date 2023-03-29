import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock, FaTimes, FaTimesCircle, FaUser } from "react-icons/fa";
import { formatDate } from "../../../lib/dateFormatter";
import styles from "./OverlayCard.module.scss";

export default function OverlayCard({ posts }) {
  const featuredImage = posts[0].featuredImage.node.sourceUrl;
  const base64URL = posts[0].featuredImage.node.dataUrl;
  const postTitle = posts[0].title;
  const authorName = posts[0].author.node.name;
  const authorSlug = "/author/" + posts[0].author.node.slug;
  const pubDate = posts[0].modified;
  const slug = posts[0].slug;

  return (
    <div className={styles.overlayCard}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImage}>
          <Image
            src={featuredImage}
            width="800"
            height="500"
            alt="featured image"
            placeholder="blur"
            blurDataURL={`"${base64URL}"`}
          />

          <div className={styles.overlayGradient}></div>
          <div className={styles.cardContent}>
          <Link href={"/" + slug}><h3 className={styles.cardTitle}>{postTitle}</h3></Link>
            <div className={styles.cardMeta}>
             <Link href={authorSlug}> <span className={styles.cardAuthor}>
                <FaUser /> {authorName}
              </span></Link>
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
