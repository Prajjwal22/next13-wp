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
import Link from "next/link";

export default function Header({menu}) {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobileNav-Open", open);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.brand}>
          <Link href="/"><Image src="/logo.png" alt="brand name" width={250} height={60} /></Link>
        </div>
        <div className={styles.navigation}>
          <div className={styles.navigatinMenu}>
            {menu.slice(1,6).map((item, i) => {
              return <Link key={i} href={item.url}><span className={styles.navLink}>{item.title}</span></Link>
            })}
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
              {menu.slice(1,6).map((item, i) => {
              return <Link key={i} href={item.url}><span className={styles.navLink}>{item.title}</span></Link>
            })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
