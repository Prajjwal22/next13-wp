import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./ThreeColGrid.module.scss";
import { useRouter } from "next/router";

export default function ThreeColGrid({ posts,catName }) {


const catSlug =posts[0].categories.nodes[0].slug
  
  const router = useRouter();
  return (
    <div className={styles.threecolGrid}>
      <div className={styles.gridTitle}>
        <h3 className="container">{router.pathname==="/" ? "What's New?" : "Latest Posts From " + catName }</h3>
      </div>
      <div className={styles.gridWrapper}>
        {router.pathname === "/"
          ? posts.slice(9, 18).map((post, i) => {
              return <VerticalCard key={i} post={post} />;
            })
          : posts.map((post, i) => {
              return <VerticalCard key={i} catSlug={catSlug} post={post} />;
            })}
      </div>
    </div>
  );
}
