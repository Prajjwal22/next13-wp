"use client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client/core";
import styles from "./SinglePost.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "../../lib/dateFormatter";
import {FiTwitter, FiFacebook,FiLink} from "react-icons/fi";
import Image from "next/image";

export default function Single({ params }) {
  const { slug } = params;
  const query = gql`
    query SinglePostBySlug($slug: String!) {
      postBy(slug: $slug) {
        author {
          node {
            avatar {
              url
            }
            name
            slug
          }
        }
        postId
        categories {
          nodes {
            name
            slug
            posts(first: 4) {
              nodes {
                title
                slug
                modified
                categories {
                  nodes {
                    name
                    slug
                  }
                }
                excerpt
                author {
                  node {
                    avatar {
                      url
                    }
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    sourceUrl(size: LARGE)
                  }
                }
              }
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            srcSet
          }
        }
        modified
        slug
        title
        content
        seo {
          fullHead
        }
      }
    }
  `;

  const { data } = useSuspenseQuery(query, {
    variables: {
      slug,
    },
  });

  const post = data.postBy
  const srcSet = post.featuredImage?.node?.srcSet || "/featured.png";
  const featuredImage = post.featuredImage?.node?.sourceUrl || "/featured.png";
  const postTitle = post.title;
  const authorName = post.author?.node?.name || "Editorial Staff";
  const avatar = post.author?.node?.avatar?.url || "/profile.png";
  const authorSlug = "/author/" + post.author?.node?.slug;
  const pubDate = post.modified;
  const category = post.categories.nodes[0].name;
  const postContent = post.content
  console.log("Fdsfdsf", data.postBy)

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
            background: `#1363DF`,
          }}
        />
      </div>
      <div className={styles.singleWrapper}>
        <div
          style={{ background: '#092856' }}
          className={styles.singleHeader}
        >
          <div className={styles.singleHeaderWrapper}>
            <div className={styles.postinfo}>
              <Link href={"/category/" + post.categories.nodes[0].slug}>
                <span
                  style={{ color: '#47B5FF' }}
                  className={styles.postCategory}
                >
                  {category}
                </span>
              </Link>
              <h1 className={styles.postTitle}>{postTitle}</h1>
            </div>
            <div className={styles.postMeta}>
              <div className={styles.postShare}>
                <span style={{ background: "#4F4F83" }}>
                  <Link
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=Hey, I found something amazing on the Internet, you'd like to check this out! https://howtoshout.com/${post.slug}`}
                  >
                    <FiTwitter color="#fff" size={20} />
                  </Link>
                </span>
                <span style={{ background: "#4F4F83" }}>
                  <Link
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://howtoshout.com/${post.slug}`}
                  >
                    <FiFacebook color="#fff" size={20} />
                  </Link>
                </span>
                <span style={{ background: "#4F4F83" }} onClick={()=>navigator?.clipboard.writeText(`https://howtoshout.com/${post.slug}`)}>
                    <FiLink color="#fff" size={20} />
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
              src={`${featuredImage}.webp`}
              srcSet={srcSet}
              alt={postTitle}
              width={600}
              height={450}
              priority
            />
          </div>
          <div className={styles.mainContent} dangerouslySetInnerHTML={{__html:postContent }}></div>
        </div>
      </div>
    </article>
  );
}
