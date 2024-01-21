
import HorizontalCard from "../cards/horizontal/HorizontalCard";
import styles from "./ListPosts.module.scss";


type ListProps = {
  posts: Posts[]
}

export default function ListPosts({posts}:ListProps) {
  return (
    <div className={styles.listPosts}>
      <h3 className="container">Popular of the Week!</h3>
      <div className={styles.listPostsWrapper}>
        {posts.slice(6,9).map((post, i)=> {
          return <HorizontalCard key={i} post={post} />
        })}
      </div>
    </div>
  );
}
