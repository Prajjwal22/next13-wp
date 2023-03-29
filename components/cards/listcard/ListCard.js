import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDate } from "../../../lib/dateFormatter";
import styles from "./ListCard.module.scss";

export default function ListCard({ post }) {
  
  const featuredImage = post.featuredImage.node.sourceUrl;
  const base64URL = post.featuredImage.node.dataUrl;
  const postTitle = post.title;
  const authorName = post.author.node.name;
  const authorSlug =  "/author/" + post.author.node.slug;
  const pubDate = post.modified;
  const category = post.categories.nodes[0].name;
  const slug = post.slug;
  

  return (
    <div className={styles.listCard}>
      <Link href={"/category/"+post.categories.nodes[0].slug}><div className={styles.cardCategory}>{category}</div></Link>
      <div className={styles.cardTitle}>
        <Link href={slug}>
          <h3 dangerouslySetInnerHTML={{ __html: postTitle }}></h3>
        </Link>
        <span className={styles.cardMeta}>
          <Link href={authorSlug}><span className={styles.cardAuthor}>{authorName}</span></Link>
          <span className={styles.cardTime}>
            {formatDate(new Date(pubDate))}
          </span>
        </span>
      </div>
      <div className={styles.cardThumb}>
        <Image width={100} height={100} src={featuredImage}    placeholder="blur"
            blurDataURL={`"${base64URL}"`} alt="post title" />
      </div>
    </div>
  );
}
