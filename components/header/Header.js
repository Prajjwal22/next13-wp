import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

export default function Header() {
  const navigationMenu = [
    { "Home": "#" },
    { "Creative Studio": "#" },
    { "Design": "#" },
    { "About us": "#" },
    { "Blog": "#" },
  ];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobileNav-Open", open);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.brand}>
          <Image src="/logo.png" alt="brand name" width={250} height={60} />
        </div>
        <div className={styles.navigation}>
          <div className={styles.navigatinMenu}>
            <span className={styles.navLink}>Home</span>
            <span className={styles.navLink}>Creative Studio</span>
            <span className={styles.navLink}>Blog</span>
            <span className={styles.navLink}>About us</span>
          </div>
        </div>
        <div className={styles.socials}>
          <div className={styles.socialHandles}>
            <span className={styles.socialLink}>
              <FaFacebook size={20} />
            </span>
            <span className={styles.socialLink}>
              <FaTwitter size={20} />
            </span>
            <span className={styles.socialLink}>
              <FaInstagram size={20} />
            </span>
          </div>
        </div>
        <div className={styles.mobile}>
          <span>
            {open ? (
              <FaTimes
                size={20}
                onClick={() => {
                  setOpen(false);
                }}
              />
            ) : (
              <FaBars
                size={20}
                onClick={() => {
                  setOpen(true);
                }}
              />
            )}
          </span>
          <span>
            <FaSearch size={20} />
          </span>
          {open && (
            <div className={styles.mobileNav}>
              <div className={styles.mobileMenu}>
                <span className={styles.navLink}>Home</span>
                <span className={styles.navLink}>Creative Studio</span>
                <span className={styles.navLink}>Blog</span>
                <span className={styles.navLink}>About us</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
