import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDate } from "../../../lib/dateFormatter";
import styles from "./HorizontalCard.module.scss";

export default function HorizontalCard({ post }) {
  const featuredImage = post.featuredImage.node.sourceUrl;
  const postTitle = post.title;
  const authorName = post.author.node.name;
  const avatar = post.author.node.avatar.url;
  const pubDate = post.modified;
  const category = post.categories.nodes[0].name;
  const excerpt = post.excerpt
  const slug = post.slug

  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImage}>
        <Link href={slug}><Image src={featuredImage} width={400} height={300} alt={postTitle} /></Link>
        </div>
        <div className={styles.cardContent}>
        <Link href={"/category/" + post.categories.nodes[0].slug}> <span className={styles.cardCategory}>{category}</span></Link>
          <Link href={slug}><span className={styles.cardTitle}>{postTitle}</span></Link>
          <span
            className={styles.cardExcerpt}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></span>
          <div className={styles.cardMeta}>
            <div className={styles.cardAvatar}>
              <Image src={avatar} alt={authorName} width={50} height={50} />
            </div>
            <div className={styles.cardAuthorDate}>
              <span className={styles.cardAuthor}>{authorName}</span>
              <span className={styles.cardpubDate}>
                {formatDate(new Date(pubDate))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
