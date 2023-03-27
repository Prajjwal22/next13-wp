import { gql, useLazyQuery, useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getStaticProps } from "../../pages";
import styles from "./Search.module.scss";

export default function Search({ setIsSearch }) {
  const [query, setQuery] = useState("");

  const SEARCH_RESULTS = gql`
    query GetPostsBySearch($query: String!, $after: String) {
      searchPosts: posts(first: 10, after: $after, where: { search: $query }) {
        nodes {
          title
          excerpt
          slug
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;

  console.log(query);
  const [executeSearch, { data, loading }] = useLazyQuery(SEARCH_RESULTS);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery !== query) {
      executeSearch({
        variables: { query: newQuery },
      });
    }
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
            <label for="docsearch-input">
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
            ) : data?.searchPosts?.nodes.length === 0 ? (
              <span>No results found</span>
            ) : (
              data?.searchPosts?.nodes?.map((results, i) => {
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
