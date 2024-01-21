'use client'

import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";
import { usePathname, } from "next/navigation";
import Image from "next/image";
import { FaEnvelope, FaFacebook, FaTwitter } from "react-icons/fa";
import Button from "../../button/Button";
import { FiCommand } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getPaginatedPosts, getPosts } from "@/lib/wordpress";

type LoadMoreProps = {
  archiveName?:string
}



const GET_POSTS = `
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        modified
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
        excerpt
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            avatar {
              url
            }
            name
            slug
          }
        }
      }
    }
  }
`;


export default function LoadMore({ archiveName }:LoadMoreProps) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Posts[]>([])
  const [batchInfo,setBatchInfo] = useState({hasNextPage:true,endCursor:""})

  const pathName = usePathname();

  useEffect(()=>{

    const fetchPosts = async()=>{
      setLoading(true)
      const data = await getPaginatedPosts(batchInfo.endCursor)
      const {pageInfo, nodes} = data
      setPosts(nodes)
      setBatchInfo(pageInfo)
      setLoading(false)
    }
    fetchPosts()
  },[])


  const handleLoadMore = async()=>{
    setLoading(true)
    const morePosts = await getPaginatedPosts(batchInfo.endCursor)
    const {pageInfo, nodes} = morePosts
    setPosts(prevPosts => [...prevPosts, ...nodes])
    setBatchInfo(pageInfo)
    setLoading(false)
  }

  console.log(batchInfo)
  console.log(posts)


  return (

    <div className={styles.threecolGrid}>
      <div className={styles.gridTitle}>
        <h3 className="container">
          {pathName === "/"
            ? "What's New?"
            : "Latest Posts From " + archiveName}
        </h3>
      </div>
      {pathName === "/" || pathName.includes("category") ? (
        ""
      ) : (
        <div className={styles.authorBox}>
          <div className={styles.authorWrapper}>
            <Image
              src={posts[0].author.node.avatar.url}
              width={100}
              height={100}
              alt={posts[0].author.node.name}
            />
            <div className={styles.authorInfo}>
              <p>{posts[0].author.node.description}</p>
              <span className={styles.authorSocial}>
                <span>
                  <FaFacebook size={20} />
                </span>
                <span>
                  <FaTwitter size={20} />
                </span>
                <span>
                  <FaEnvelope size={20} />
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className={styles.gridWrapper}>
        {pathName === "/"
          ? posts.map((post, i) => {
              return <VerticalCard key={i} post={post} />;
            })
          : posts.map((post, i) => {
              return (
                <>
                  <VerticalCard key={i} catSlug={"catSlug"} post={post} />
                </>
              );
            })}
      </div>

      {batchInfo.hasNextPage ? (
        <Button
          onClick={()=>handleLoadMore()}
          label={loading ? "Loading..." : "Load More"}
          icon={
            <FiCommand className={loading ? "loading-icon" : ""} size={20} />
          }
          center
          type="primaryBtn"
        />
      ) : (
        <p>✅ All posts loaded.</p>
      )}
    </div>
  );
}
