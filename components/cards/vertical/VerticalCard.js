import Image from "next/image";
import React from "react";
import { formatDate } from "../../../lib/dateFormatter";
import styles from "./VerticalCard.module.scss";

export default function VerticalCard({post}) {

  console.log(post)

  const featuredImage = post.featuredImage.node.sourceUrl;
  const postTitle = post.title;
  const authorName = post.author?.node?.name || "Editorial Staff";
  const avatar = post.author?.node?.avatar?.url || "/profile.png";
  const pubDate = post.modified;
  const category = post.categories.nodes[0].name;
  const excerpt = post.excerpt
  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImage}>
          <Image
            src={featuredImage}
            width={400}
            height={300}
            alt={postTitle}
          />
        </div>
        <div className={styles.cardContent}>
          <span className={styles.cardCategory}>{category}</span>
          <span className={styles.cardTitle}>
            {postTitle}
          </span>
          <span className={styles.cardExcerpt} dangerouslySetInnerHTML={{__html: excerpt}}>
          </span>
          <div className={styles.cardMeta}>
            <div className={styles.cardAvatar}>
              <Image src={avatar} alt={authorName} width={50} height={50} />
            </div>
            <div className={styles.cardAuthorDate}>
              <span className={styles.cardAuthor}>{authorName}</span>
              <span className={styles.cardpubDate}>{formatDate(new Date(pubDate))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
