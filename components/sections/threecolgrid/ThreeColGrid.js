import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaEnvelope, FaFacebook, FaTwitter } from "react-icons/fa";

export default function ThreeColGrid({ posts, archiveName }) {
  const catSlug = posts[0].categories.nodes[0].slug;

  console.log(posts);

  const router = useRouter();
  return (
    <div className={styles.threecolGrid}>
      <div className={styles.gridTitle}>
        <h3 className="container">
          {router.pathname === "/"
            ? "What's New?"
            : "Latest Posts From " + archiveName}
        </h3>
      </div>
      {router.pathname === "/" || router.pathname.includes("category") ? (
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
                <span><FaFacebook size={20}/></span>
                <span><FaTwitter size={20}/></span>
                <span><FaEnvelope size={20}/></span>

              </span>
            </div>
          </div>
        </div>
      )}
      <div className={styles.gridWrapper}>
        {router.pathname === "/"
          ? posts.slice(9, 18).map((post, i) => {
              return <VerticalCard key={i} post={post} />;
            })
          : posts.map((post, i) => {
              return (
                <>
                  <VerticalCard key={i} catSlug={catSlug} post={post} />
                </>
              );
            })}
      </div>
    </div>
  );
}
