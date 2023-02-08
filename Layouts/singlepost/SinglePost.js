import Image from "next/image";
// import { usePalette } from "react-palette";

import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import styles from "./SinglePost.module.scss";
import { formatDate } from "../../lib/dateFormatter";

export default function SinglePost({ children, post }) {
  const featuredImage = post.featuredImage.node.sourceUrl;
  const postTitle = post.title;
  const authorName = post.author?.node?.name || "Editorial Staff";
  const avatar = post.author?.node?.avatar?.url || "/profile.png";
  const pubDate = post.modified;
  const category = post.categories.nodes[0].name;
  const content = post.content;

  // const { data } = usePalette(featuredImage);

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
            background: `#fff`,
          }}
        />
      </div>
      <div className={styles.singleWrapper}>
        <div
          style={{ background: "red" }}
          className={styles.singleHeader}
        >
          <div className={styles.singleHeaderWrapper}>
            <div className={styles.postinfo}>
              <span
                style={{ color: "white" }}
                className={styles.postCategory}
              >
               {category}
              </span>
              <h1 className={styles.postTitle}>
                {postTitle}
              </h1>
            </div>
            <div className={styles.postMeta}>
              <div className={styles.postShare}>
                <span style={{ background: "white"  }}>
                  <FaTwitter color="white" size={20} />
                </span>
                <span style={{ background: "white"  }}>
                  <FaFacebookF color="white" size={20} />
                </span>
                <span style={{ background: "white"  }}>
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
                  <span className={styles.authorName}>{authorName}</span>
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
              height={600}
            />
          </div>
          <div className={styles.mainContent}>{children}</div>
        </div>
      </div>
    </article>
  );
}
