import React, { useState, useEffect } from "react";
import { fromImageToUrl, API_URL } from "../utils/urls";
import styles from "../styles/BlogsSection.module.css";
import Blogs from "../components/blogs";
import { Button } from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import Subbanner from "../components/Subbanner";
import Belt from "../components/Belt";

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
    blogs
      .filter((el) => el.blog_category.name === "專業知識")
      .map((blog, index) => {
        let arr = blog.hash.split(",");

        arr.map((el, index) => {
          if (!hashArray.includes(el)) {
            hashArray.push(el);
          }
        });
      });

    let removeDuplicate = (hashArray) => hashArray.filter((v, i) => hashArray.indexOf(v) === i);

    setHash(removeDuplicate(hashArray));

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

  searchResult = blogs.filter((el) => el.blog_category.name === "專業知識");
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
        <title>海上絲路4.0工作室｜實務操作</title>
      </Head>
      {/* <div className={styles.headWrapper}>
        <h2 className="center">文章列表</h2>
      </div> */}
      {/* <Subbanner/> */}

      <div className={styles.blogsWrapper}>
        <div className={styles.articlesContainer}>
          <div className={styles.opening}>
            <h1>文章列表-專業知識</h1>
            <p>吳董還欠我一段專業知識的屁話，吳董還欠我一段屁話，吳董還欠我一段屁話吳董還欠我一段屁話，吳董還欠我一段屁話，吳董還欠我一段屁話吳董還欠我一段屁話，吳董還欠我一段屁話，吳董還欠我一段屁話，放在這裡</p>
          </div>
          <div className={styles.tagsWrapper}>
            <div className={styles.tagHeader}>
              <i className="fas fa-tags"></i>
              <p>搜尋標籤</p>
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
          <Blogs allPostsData={searchResult} />
        </div>
        <div className={styles.sideBarContainer}>
          <div className={styles.searchConsole}>
            我想要找...
            <form>
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <Button color="secondary" onClick={searchHandler}>
                搜尋
              </Button>
            </form>
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
            <h5>熱門文章</h5>
            <ul>
              {sortedBlogs.map((el, index) => {
                return (
                  <li>
                    <Link href={`/blogs/${el.slug}`}>{el.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={`${styles.listWrapper} ${styles.youMayLike}`}>
            <h5>你可能喜歡</h5>
            <ul>
              {randomBlogs.map((el, index) => {
                return (
                  <li>
                    <Link href={`/blogs/${blogs[el].slug}`}>{blogs[el].title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Belt />
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

  // const categories = new Set();
  // blogs.map((el) => {
  //   categories.add(el.category);
  //   return true
  // });

  // return the products as props
  return {
    props: {
      blogs,
      categories,
    },
  };
}
