import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Search.module.scss";
import { getSearchResults } from "@/lib/wordpress";

type Props = {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

type searchResults = {
  searchPosts: {
    nodes: Posts[];
  };
};

export default function Search({ setIsSearch }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Posts[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const getResults = async (query: string) => {
    let results = await getSearchResults(query);
    setData(results.searchPosts.nodes);
    setLoading(false);
  };

  const debouncedGetResults = useCallback(
    (query: string) => {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        getResults(query);
      }, 1000);
      setTimer(newTimer);
    },
    [timer]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedGetResults(newQuery);
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape") setIsSearch(false);
      }}
      className={styles.search}
    >
      <div className={styles.searchModal}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchControls}>
            <label htmlFor="docsearch-input">
              <FaSearch />
            </label>
            <input
              id="docsearch-input"
              type="search"
              autoFocus
              className={styles.searchInput}
              placeholder="Search..."
              onChange={(e) => handleChange(e)}
            />
            <button
              onClick={() => setIsSearch(false)}
              className={styles.searchClose}
            >
              ESC
            </button>
          </div>
          <div className={styles.searchResults}>
            {loading ? (
              <span>Loading...</span>
            ) : !data ? (
              <span>No recent searches</span>
            ) : data.length === 0 ? (
              <span>No results found</span>
            ) : (
              data.map((results: Posts, i: number) => {
                return (
                  <div key={i} className={styles.result}>
                    <span className={styles.resultText}>
                      <Link
                        onClick={() => setIsSearch(false)}
                        href={"/" + results.slug}
                      >
                        {results.title}
                      </Link>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
