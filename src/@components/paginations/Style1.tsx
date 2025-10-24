"use client";

import styles from './Style1.module.scss';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  total: number;
  limit: number;
  children: React.ReactNode;
};

const Style1 = ({children, total, limit}: Props) => {

  const router = useRouter();

  const searchParams = useSearchParams();

  const total_pages = Math.ceil(total / limit);

  const [at, setAt] = useState(Number(searchParams.get("page") )|| 1);

  const updateUrl = (page: number) => {
    router.replace(`?page=${page}&limit=${limit}`)
  };

  const direction = (direction: "forwards" | "backwards") => {
    if(direction === "forwards"){
      if(total_pages === at) return;
      const nextPage = at + 1;
      setAt(nextPage);
      updateUrl(nextPage);
    };
    if(direction === "backwards"){
      if(at === 1) return;
      const prevPage = at - 1;
      setAt(prevPage);
      updateUrl(prevPage);
    };
  };

  // Determine if last button should show
  const showLastButton = total_pages > 5;

  // Sliding window length depends on showing LAST button
  const slidingLength = showLastButton ? 4 : 5;

  // Calculate start of sliding window; always keep window sliding without exceeding bounds
  const start = Math.min(
    Math.max(at - 1, 1),
    Math.max(total_pages - slidingLength, 1)
  );

  return ( total_pages >= 1 ?
    <div className={styles.container}>

      {children}

      <div className={styles.pages}>

        <button className={styles.number} onClick={() => direction("backwards")}> Back </button>

        {/* Show the FIRST page button if window starts beyond 1 */}
        {start > 1 && (
          <button 
            className={styles.number} 
            onClick={() => {
              setAt(1);
              updateUrl(1);
            }}
          >
            1
          </button>
        )}

        {/* Slide window of page numbers */}
        {Array.from({ length: slidingLength }).map((_, i) => {
          const pageNumber = start + i;
          if (pageNumber > total_pages - (showLastButton ? 1 : 0)) return null; // exclude last page if LAST button exists
          return (
            <button 
              key={pageNumber} 
              onClick={() => {
                setAt(pageNumber);
                updateUrl(pageNumber);
              }}
              className={`${styles.number} ${pageNumber === at ? styles.selected : ""}`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Show the LAST page button if applicable */}
        {showLastButton && (
          <button
            className={`${styles.number} ${total_pages === at ? styles.selected : ""}`}
            onClick={() => {
              setAt(total_pages);
              updateUrl(total_pages);
            }}
          >
            LAST {total_pages}
          </button>
        )}

        <button className={styles.number} onClick={() => direction("forwards")}> Next </button>
      </div>

    </div>
  : <div></div>);
};

export default Style1;

