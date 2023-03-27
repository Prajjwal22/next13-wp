import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import styles from "./SinglePost.module.scss";
import { formatDate } from "../../lib/dateFormatter";
import { usePalette } from "../../lib/usePalette";
import Link from "next/link";

export default function SinglePost({ children, post }) {
  const featuredImage = post.featuredImage?.node?.sourceUrl || "/featured.png";
  const postTitle = post.title;
  const authorName = post.author?.node?.name || "Editorial Staff";
  const avatar = post.author?.node?.avatar?.url || "/profile.png";
  const authorSlug = "/author/" + post.author?.node?.slug;
  const pubDate = post.modified;
  const category = post.categories.nodes[0].name;

  const { data } = usePalette(
    "/_next/image/?url=" + featuredImage + "&w=828&q=75"
  );

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;

      setScroll(scroll);
    };

    window.addEventListener("scroll", progressBarHandler);

    return () => window.removeEventListener("scroll", progressBarHandler);
  });

  return (
    <article className={styles.single}>
      <div id="progressBarContainer">
        <div
          id="progressBar"
          style={{
            transform: `scale(${scroll}, 1)`,
            opacity: `${scroll}`,
            background: `${data.darkVibrant}`,
          }}
        />
      </div>
      <div className={styles.singleWrapper}>
        <div
          style={{ background: data.darkVibrant }}
          className={styles.singleHeader}
        >
          <div className={styles.singleHeaderWrapper}>
            <div className={styles.postinfo}>
              <Link href={"/category/" + post.categories.nodes[0].slug}>
                <span
                  style={{ color: data.lightVibrant }}
                  className={styles.postCategory}
                >
                  {category}
                </span>
              </Link>
              <h1 className={styles.postTitle}>{postTitle}</h1>
            </div>
            <div className={styles.postMeta}>
              <div className={styles.postShare}>
                <span style={{ background: data.muted }}>
                  <Link
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=Hey, I found something amazing on the Internet, you'd like to check this out! https://howtoshout.com/${post.slug}`}
                  >
                    <FaTwitter color="white" size={20} />
                  </Link>
                </span>
                <span style={{ background: data.muted }}>
                  <Link
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://howtoshout.com/${post.slug}`}
                  >
                    <FaFacebookF color="white" size={20} />
                  </Link>
                </span>
                <span style={{ background: data.muted }}>
                  <Link
                    target="_blank"
                    href={`mailto:?body=Hey, I found something amazing on the Internet, you'd like to check this out! https://howtoshout.com/${post.slug}`}
                  >
                    <FaEnvelope color="white" size={20} />
                  </Link>
                </span>
              </div>
              <div className={styles.authorDate}>
                <div className={styles.authorAvatar}>
                  <Image src={avatar} alt={authorName} height={60} width={60} />
                </div>
                <div className={styles.authorMeta}>
                  <Link href={authorSlug}>
                    <span className={styles.authorName}>{authorName}</span>
                  </Link>
                  <span className={styles.pubDate}>
                    {formatDate(new Date(pubDate))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.singleContent}>
          <div className={styles.featImage}>
            <Image
              src={featuredImage}
              alt={postTitle}
              width={800}
              height={700}
              priority
            />
          </div>
          <div className={styles.mainContent}>{children}</div>
        </div>
      </div>
    </article>
  );
}
