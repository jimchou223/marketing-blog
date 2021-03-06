import React, { useState, useEffect } from "react";
import { fromImageToUrl, API_URL } from "../utils/urls";
import styles from "../styles/BlogsSection.module.css";
import Blogs from "../components/blogs";
import { Button } from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import Banner from '../components/Banner'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const blogs = ({ blogs, categories }) => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentHash, setCurrentHash] = useState(null);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [randomBlogs, setRandomBlogs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searched, setSearched] = useState(false);

  const [hash, setHash] = useState([]);

  useEffect(() => {
    let hashArray = [];
    blogs.forEach((blog, index) => {
      let arr = blog.hash.split(",");
      arr.map((el, index) => {
        if (!hashArray.includes(el)) {
          hashArray.push(el);
        }
      });
    });
    setHash(hashArray);

    let sortedBlogs = [...blogs];
    sortedBlogs.sort(function(a, b) {
      return b.views - a.views;
    });
    setSortedBlogs(sortedBlogs);

    let randomBlogs = [];
    let length = blogs.length;

    while (randomBlogs.length < 2) {
      let index = getRandomInt(0, length);
      if (!randomBlogs.includes(index)) {
        randomBlogs.push(index);
      }
    }
    setRandomBlogs(randomBlogs);
  }, []);

  let searchResult = [...blogs];
  //   function searchBlogs(input) {
  //     searchResult = input.filter((el) => el.content.search(keyword) > 0);
  //   }

  const searchHandler = () => {
    if (keyword !== "") {
      setSearched(true);
    }
  };
  if (currentCategory) {
    searchResult = searchResult.filter((el) => el.blog_category.name === currentCategory.name);
  }
  if (searched) {
    searchResult = searchResult.filter((el) => el.content.search(keyword) > 0);
  }
  if (currentHash) {
    searchResult = searchResult.filter((el) => el.hash.search(currentHash) > -1);
  }
  // console.log(searchResult);
  return (
    <div className={styles.blogsContainer}>
      <Head>
        <title>????????????4.0????????????????????????</title>
      </Head>
      {/* <div className={styles.headWrapper}>
        <h2 className="center">????????????</h2>
      </div> */}
      {/* <Subbanner/> */}
      <Banner/>

      <div className={styles.blogsWrapper}>
        <div className={styles.articlesContainer}>
          <div className={styles.opening}>
            <h1>???????????????????????????????????????</h1>
            <p>????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
          </div>
          <div className={styles.tagsWrapper}>
            <div className={styles.tagHeader}>
              <i className="fas fa-tags"></i>
              <p>????????????</p>
            </div>

            {currentCategory && (
              <button onClick={() => setCurrentCategory(null)} className={`${styles.tagWrapper} ${currentCategory.tag}-bg`}>
                <i className="far fa-window-close"></i>
                {currentCategory.name}
              </button>
            )}
            {searched && (
              <button
                onClick={() => {
                  setKeyword("");
                  setSearched(false);
                }}
                className={styles.tagWrapper}
              >
                <i className="far fa-window-close"></i>
                {keyword}
              </button>
            )}
            {currentHash && (
              <button
                onClick={() => {
                  setCurrentHash(null);
                  setSearched(false);
                }}
                className={styles.tagWrapper}
              >
                <i className="far fa-window-close"></i>
                {currentHash}
              </button>
            )}
          </div>
          <Blogs allPostsData={currentCategory || searched || currentHash ? searchResult : blogs} />
        </div>
        <div className={styles.sideBarContainer}>
          <div className={styles.searchConsole}>
            ????????????...
            <form className={styles.formWrapper}>
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <Button color="secondary" onClick={searchHandler}>
                ??????
              </Button>
            </form>
          </div>

          <div className={styles.listWrapper}>
            <h5>????????????</h5>
            <ul>
              {categories.map((el, index) => {
                return (
                  <li key={index} onClick={() => setCurrentCategory(el)}>
                    <i className={`fas fa-tag ${el.tag}-point`}></i> {el.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.listWrapper}>
            <h5>Hash tag</h5>
            <ul>
              {hash.map((el, index) => {
                return (
                  <li key={index} onClick={() => setCurrentHash(el)}>
                    <i className="fab fa-slack-hash"></i>
                    {el}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={`${styles.listWrapper} ${styles.trending}`}>
            <h5>????????????</h5>
            <ul>
              {sortedBlogs.map((el, index) => {
                return (
                  <li key={index}>
                    <Link href={`/blogs/${el.slug}`}>{el.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={`${styles.listWrapper} ${styles.youMayLike}`}>
            <h5>???????????????</h5>
            <ul>
              {randomBlogs.map((el, index) => {
                return (
                  <li key={index}>
                    <Link href={`/blogs/${blogs[el].slug}`}>{blogs[el].title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default blogs;

export async function getStaticProps() {
  // fetch the product

  const blog_res = await fetch(`${API_URL}/blogs?_sort=view`);
  const blogs = await blog_res.json();

  const categories_res = await fetch(`${API_URL}/blog-categories/`);
  const categories = await categories_res.json();
  return {
    props: {
      blogs,
      categories,
    },
  };
}
