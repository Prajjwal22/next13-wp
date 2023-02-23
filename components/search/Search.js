import { gql, useLazyQuery, useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getStaticProps } from "../../pages";
import styles from "./Search.module.scss";

export default function Search({ setIsSearch }) {
  const [query, setQuery] = useState("");

  

  const SEARCH_RESULTS = gql`
    query GetPostsBySearch($query: String!) {
      posts(first: 10, where: { search: $query }) {
        nodes {
          title
          excerpt
          slug
        }
      }
    }
  `;
  console.log(query);
  const [executeSearch, { data,loading }] = useLazyQuery(SEARCH_RESULTS);



  const handleChange = (e) => {
    setQuery(e.target.value);
    executeSearch({
      variables: { query },
    });
  };
  console.log(query);
  console.log(data);

  return (
    <div className={styles.search}>
      <div className={styles.searchModal}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchControls}>
            <label for="docsearch-input">
              <FaSearch />
            </label>
            <input
              id="docsearch-input"
              type="search"
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
            { loading ? <span>Loading...</span> :   !data ? <span>No recent searches</span>  : data?.posts?.nodes.length === 0 ?  <span>No results found</span> : (data?.posts?.nodes)?.map ((results, i)=> {
              return <div className={styles.result}>
                <span className={styles.resultText}>
                <Link href={"/" + results.slug}>{results.title}</Link>
                </span>
                </div>
            })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
