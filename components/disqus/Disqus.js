import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DisqusComponent = dynamic(() => import('disqus-react').then((mod) => mod.DiscussionEmbed), { ssr: false });

const LazyDisqusComponent = ({post}) => {
  const [isDisqusVisible, setIsDisqusVisible] = useState(false);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsDisqusVisible(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0 });

    observer.observe(document.getElementById('disqus-container'));

    return () => {
      observer.disconnect();
    };
  }, []);

  const disqusShortname = "howtoshout-1"
  const disqusConfig = {
    url: `https://howtoshout.com/${post.slug}`,
    identifier: post.postId,
    title: post.title
  }

  return (
    <div id="disqus-container">
      {isDisqusVisible && <DisqusComponent shortname={disqusShortname}
    config={disqusConfig} />}
    </div>
  );
};

export default LazyDisqusComponent;
