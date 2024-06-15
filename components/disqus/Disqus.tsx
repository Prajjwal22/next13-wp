import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

type Props = {
  post: Posts;
};

const DisqusComponent = dynamic(
  () => import("disqus-react").then((mod) => mod.DiscussionEmbed),
  { ssr: false }
);

const LazyDisqusComponent = ({ post }: Props) => {
  const [isDisqusVisible, setIsDisqusVisible] = useState(false);

  const handleIntersection = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setIsDisqusVisible(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });
    const targetElement = document.getElementById("disqus-container");

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);



  const disqusShortname = "howtoshout-1";
  const disqusConfig = {
    url: `https://howtoshout.com/${post.slug}`,
    identifier: post.slug,
    title: post.title,
  };

  return (
    <div id="disqus-container">
      {isDisqusVisible && (
        <DisqusComponent shortname={disqusShortname} config={disqusConfig} />
      )}
    </div>
  );
};

export default LazyDisqusComponent;
