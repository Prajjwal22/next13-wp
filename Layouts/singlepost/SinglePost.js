import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import styles from "./SinglePost.module.scss";
import { formatDate } from "../../lib/dateFormatter";
import { usePalette } from "../../lib/usePalette";
import Link from "next/link";

export default function SinglePost({ children, post }) {
  const featuredImage = post.featuredImage?.node?.sourceUrl || "/featured.png";
  const postTitle = post.title;
  const authorName = post.author?.node?.name || "Editorial Staff";
  const avatar = post.author?.node?.avatar?.url || "/profile.png";
  const authorSlug = "/author/" + post.author?.node?.slug
  const pubDate = post.modified;
  const category = post.categories.nodes[0].name


  const { data } = usePalette("/_next/image/?url=" + featuredImage + "&w=828&q=75");

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
              <Link href={"/category/" + post.categories.nodes[0].slug}><span
                style={{ color: data.lightVibrant }}
                className={styles.postCategory}
              >
               {category}
              </span></Link>
              <h1 className={styles.postTitle}>
                {postTitle}
              </h1>
            </div>
            <div className={styles.postMeta}>
              <div className={styles.postShare}>
                <span style={{ background: data.muted }}>
                  <FaTwitter color="white" size={20} />
                </span>
                <span style={{ background: data.muted }}>
                  <FaFacebookF color="white" size={20} />
                </span>
                <span style={{ background: data.muted }}>
                  <FaLinkedinIn color="white" size={20} />
                </span>
              </div>
              <div className={styles.authorDate}>
                <div className={styles.authorAvatar}>
                  <Image
                    src={avatar}
                    alt={authorName}
                    height={60}
                    width={60}
                  />
                </div>
                <div className={styles.authorMeta}>
                  <Link href={authorSlug}><span className={styles.authorName}>{authorName}</span></Link>
                  <span className={styles.pubDate}>{formatDate(new Date(pubDate))}</span>
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
