import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";

export default function Footer({footerMenu}) {
  return (
    <div className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.newsLetterBox}>
          <div className={styles.newLetter}>
            <div className={styles.details}>
              <p>Ready to get started? </p>
              <p>Talk to us today!</p>
            </div>
            <div className={styles.actions}>
              <button className="ctaBtn primaryBtn">Get Started</button>
            </div>
          </div>
        </div>
        <div className={styles.footerContent}>
          <div className={styles.brand}>
            <Image src="https://api.howtoshout.com/wp-content/uploads/2017/09/Howtoshout-logo-e1504411427566.png.webp" alt="footer logo" width={250} height={70} />
          </div>
          <div className={styles.footerNav}>
            {footerMenu.map((navLink) => {
              return  <span key={navLink.key} className={styles.navLink}><Link href={navLink.uri}>{navLink.title}</Link></span>
            })}
          </div>
          <div className={styles.footerNav}>
            <span className={styles.navLink}>Home</span>
            <span className={styles.navLink}>Privacy</span>
            <span className={styles.navLink}>Company</span>
            <span className={styles.navLink}>Contact</span>
          </div>
          <div className={styles.footerNav}>
            <span className={styles.navLink}>Get Started</span>
            <span className={styles.navLink}>About</span>
            <span className={styles.navLink}>Company</span>
            <span className={styles.navLink}>Products</span>
          </div>
        </div>
        <div className={styles.copyRight}>
          <span className={styles.copyRightText}>
            HowToShout. All Rights Reserved
          </span>
          <span className={styles.copyRightText}>
            Made ❤️ by Bunny Ji.
          </span>
        </div>
      </div>
    </div>
  );
}
