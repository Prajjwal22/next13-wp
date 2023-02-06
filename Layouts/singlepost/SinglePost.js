import Image from "next/image";
import { usePalette } from "react-palette";

import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaFacebookF,
  FaGooglePlus,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import styles from "./SinglePost.module.scss";

export default function SinglePost({ children }) {
  const { data } = usePalette("/featured.avif");

  const [scroll, setScroll] = useState(0);

  useEffect(() => {

    let progressBarHandler = () => {
        
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight}`;

        setScroll(scroll);
    }

    window.addEventListener("scroll", progressBarHandler);

    return () => window.removeEventListener("scroll", progressBarHandler);
});


  return (
    <article className={styles.single}>
       <div id="progressBarContainer">
                <div id="progressBar" style={{transform: `scale(${scroll}, 1)`, opacity: `${scroll}`, background:`${data.darkVibrant}`}}/>
            </div>
      <div className={styles.singleWrapper}>
        <div
          style={{ background: data.darkVibrant }}
          className={styles.singleHeader}
        >
          <div className={styles.singleHeaderWrapper}>
            <div className={styles.postinfo}>
              <span
                style={{ color: data.lightVibrant }}
                className={styles.postCategory}
              >
                Technology
              </span>
              <h1 className={styles.postTitle}>
                An Extraordinary WebGL Environment Has Been Released By Great
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
                    src="/profile.png"
                    alt="author avatar"
                    width={60}
                    height={60}
                  />
                </div>
                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>Anna Anderson</span>
                  <span className={styles.pubDate}>Jun 24, 2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.singleContent}>
          <div className={styles.featImage}>
            <Image
              src="/featured.avif"
              alt="Feature Image"
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
