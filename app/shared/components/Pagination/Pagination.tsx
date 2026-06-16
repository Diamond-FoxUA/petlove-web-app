"use client";

import { useState, useEffect } from "react";
import css from "./Pagination.module.css";
import { generatePaginationRange } from "../../utils/pagination";
import Icon from "../Icon/Icon";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 767px)");
  
  const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
    setIsMobile(e.matches);
  };

  setTimeout(() => handleResize(mediaQuery), 0);

  mediaQuery.addEventListener("change", handleResize);
  return () => mediaQuery.removeEventListener("change", handleResize);
}, []);


  if (totalPages <= 1) return null;

  const paginationRange = generatePaginationRange(currentPage, totalPages, isMobile);

  const goToFirst = () => currentPage > 1 && onPageChange(1);
  const goToPrev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const goToNext = () => currentPage < totalPages && onPageChange(currentPage + 1);
  const goToLast = () => currentPage < totalPages && onPageChange(totalPages);

  return (
    <nav className={css.nav} aria-label="Pagination navigation">
      <ul className={css.navList}>
        
        <li className={css.navItem}>
          <button
            type="button"
            onClick={goToFirst}
            disabled={currentPage === 1}
            className={css.navBtn}
            aria-label="Go to first page"
          >
            <Icon
              iconName="icon-double-arrow"
              className={css.doubleArrowIconLeft}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={goToPrev}
            disabled={currentPage === 1}
            className={css.navBtn}
            aria-label="Go to previous page"
          >
            <Icon
              iconName="icon-arrow"
              className={css.arrowIconLeft}
              aria-hidden="true"
            />
          </button>
        </li>

        <>
          {paginationRange?.map((page, index) => {
            if (page === "...") {
              return (
                <li
                  key={`dots-${index}`}
                  className={css.rangeItem}
                  aria-hidden="true"
                >
                  <span className={css.indicator}>...</span>
                </li>
              );
            }

            const isCurrent = currentPage === page;

            return (
              <li
                key={page}
                className={`${css.rangeItem} ${isCurrent ? css.activeBtn : ""}`}
              >
                <button
                  type="button"
                  onClick={() => onPageChange(page as number)}
                  className={css.navBtn}
                  disabled={isCurrent}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </>

        <li className={css.navItem}>
          <button
            type="button"
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={css.navBtn}
            aria-label="Go to next page"
          >
            <Icon
              iconName="icon-arrow"
              className={css.arrowIconRight}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={goToLast}
            disabled={currentPage === totalPages}
            className={css.navBtn}
            aria-label="Go to last page"
          >
            <Icon
              iconName="icon-double-arrow"
              className={css.doubleArrowIconRight}
              aria-hidden="true"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
