import React, { useState, useEffect } from "react";
import Date from "./date";
import styles from "../styles/Blogs.module.css";
import { fromImageToUrl, API_URL } from "../utils/urls";
import Link from "next/link";
import Pagination from "../components/Pagination";
// import Pagination from "@material-ui/lab/Pagination";

const perPage = 2;

export default function Announce(props) {
  const [page, setPage] = useState(1);
  const blogTotal = props.allPostsData.length;
  const pageNum = blogTotal / perPage;

  let items = [];
  for (let i = (page - 1) * perPage; i < page * perPage; i++) {
    if (props.allPostsData[i]) {
      items.push(props.allPostsData[i]); // 1 => 0, 1  // 2 => 2, 3
    }
  }
  useEffect(() => {
    setPage(1);
  }, [props.allPostsData]);

  const goTop = () => {
    setPage(1);
  };
  const goLast = () => {
    setPage(pageNum);
  };
  const goPrev = () => {
    let newPage = page;
    if (newPage > 1) {
      newPage--;
    }
    setPage(newPage);
  };
  const goNext = () => {
    let newPage = page;
    if (newPage < pageNum) {
      newPage++;
    }
    setPage(newPage);
  };

  const setPageFromChild = (index) => {
    setPage(index);
  };

  return (
    <div className={styles.blogsContainer}>
      <h4 className="center">{props.title}</h4>
      <ul className={styles.blogsWrapper}>
        {items.map(({ id, date, title, content, slug, image, created_at, blog_category }) => (
          <li className={styles.blogCard} key={id}>
            <i className={`${styles.tag} ${blog_category.tag}`}></i>
            <Link href={`/blogs/${slug}`}>
              <a>
                <img src={fromImageToUrl(image)} />

                <div className={styles.textContainer}>
                  <small className="">
                    <p>
                      <Date dateString={created_at} />
                    </p>
                  </small>

                  <h4>{title}</h4>

                  <p>{content.substring(0, 30) + "..."}</p>

                  <p className={styles.hoverText}>Continue reading</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <Pagination currentPage={page} setPageFromChild={setPageFromChild} goNext={goNext} goLast={goLast} goPrev={goPrev} goTop={goTop} pageNum={Math.ceil(pageNum)} />
      </div>
    </div>
  );
}
