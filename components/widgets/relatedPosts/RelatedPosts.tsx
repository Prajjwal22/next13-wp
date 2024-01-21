
import VerticalCard from "../../cards/vertical/VerticalCard";
import styles from "./RelatedPosts.module.scss";

type RelatedProps = {
  relatedPosts: Posts[]
}

export default function RelatedPosts({relatedPosts}:RelatedProps) {

  return (
    <div className={styles.related}>
      <div className={styles.relatedWrapper}>
        <h3 className={styles.relatedTitle}>Related Posts</h3>
        <div className={styles.relatedContent}>
          {relatedPosts.map ((post,i)=> {
            return <VerticalCard post={post} key={i} />
          })}
        </div>
      </div>
    </div>
  );
}
