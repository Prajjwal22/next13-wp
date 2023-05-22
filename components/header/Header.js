"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
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
import Search from "../search/Search";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client/core";


const query = gql` query PostLists {
  Navigation: menu(id: "dGVybToxMw==") {
    menuItems {
           nodes {
             key: id
             title: label
             uri
           }
         }
   }
}`

export default function Header({menu}) {
  const { data } = useSuspenseQuery(query);

const Navigation = data.Navigation.menuItems.nodes

console.log(Navigation)

  const [open, setOpen] = useState(false);
  
  const [isSearch, setIsSearch] = useState(false)


  const handleSearch = () => {
    setIsSearch(true)
  }

  useEffect(() => {
    document.body.classList.toggle("mobileNav-Open", open);
  }, [open]);

  return (
    <header className={styles.header}>
      {isSearch && <Search isSearch={isSearch} setIsSearch={setIsSearch}/>}
      <div className={styles.headerWrapper}>
        <div className={styles.brand}>
          <Link href="/"><Image src="https://api.howtoshout.com/wp-content/uploads/2017/09/Howtoshout-logo-e1504411427566.png.webp" alt="brand name" width={590} height={127} /></Link>
        </div>
        <div className={styles.navigation}>
          <div className={styles.navigatinMenu}>
            {Navigation.slice(1,6).map((item, i) => {
              return <Link key={i} href={item.uri}><span className={styles.navLink}>{item.title}</span></Link>
            })}
          </div>
        </div>
        <div onClick={()=>handleSearch()} className={styles.search}>
          <span className={styles.socialLink}>
            <FaSearch size={20}/>
          </span>
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
          {open && (
            <div className={styles.mobileNav}>
              <div className={styles.mobileMenu}>
              {Navigation.slice(1,6).map((item, i) => {
              return <Link key={i} href={item.uri}><span className={styles.navLink}>{item.title}</span></Link>
            })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
