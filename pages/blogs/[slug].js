import Date from "../../components/date";
import { fromImageToUrl, API_URL } from "../../utils/urls";
import styles from "../../styles/Blog.module.css";
import { useRouter } from "next/router";
import marked from "marked";
import Head from "next/head";
import { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

import { FacebookShareButton, FacebookIcon, LinkedinIcon, TwitterIcon, LinkedinShareButton, TwitterShareButton, FacebookShareCount } from "react-share";
// import { FacebookShareButton, FacebookIcon } from "next-share";

const Blog = ({ blog, blogs }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();
  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const blogContent = marked(blog.content);

  return (
    <div className={styles.blogContainer}>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <article className={styles.articleContainer}>
        <h1 className={styles.blogTitle}>{blog.title}</h1>
        <div className={styles.blogDate}>
          <Date dateString={blog.created_at} />
        </div>
        <div className={styles.authorWrapper}>
          <small>Posted by </small>
          <img src={blog.author.image} />
          <small>{blog.author.name}</small>
        </div>

        <div className={styles.buttonsWrapper}>
          <div className={styles.shareButtons}>
            <p>Share on</p>
            <FacebookShareButton url={`https://inspiring-meninsky-421c5f.netlify.app/blogs/${blog.slug}`}>
              <FacebookIcon size={32} />
            </FacebookShareButton>

            <FacebookShareCount url={`https://inspiring-meninsky-421c5f.netlify.app/blogs/${blog.slug}`}>{(shareCount) => <span className="myShareCountWrapper">{shareCount}</span>}</FacebookShareCount>

            <LinkedinShareButton>
              <LinkedinIcon size={32} />
            </LinkedinShareButton>

            <TwitterShareButton>
              <TwitterIcon size={32} />
            </TwitterShareButton>
          </div>
        </div>

        <div className={styles.tocContainer}>
          <div className={styles.tocHeader}>
            <h5>目錄</h5>
            <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
              <i className="fas fa-sliders-h"></i>
            </Button>
          </div>

          <Collapse isOpen={isOpen}>
            <ul className={styles.tocWrapper}>
              {blog.toc.split(",").map((el) => {
                return (
                  <li key={el}>
                    <a href={`#${el}`}>
                      <i className="fas fa-leaf"></i>
                      {el}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Collapse>
        </div>

        <div dangerouslySetInnerHTML={{ __html: blogContent }} />
        <div className={styles.goback}>
          <a href="#" onClick={goBack}>
            回文章列表
          </a>
        </div>
      </article>
      <div className={styles.sideBar}>
        <h5>最新文章</h5>
        <ul>
          {blogs.map((el, index) => {
            return (
              <li className={styles.sideBarList} key={index}>
                <a href={`/blogs/${el.slug}`}>
                  <img src={el.image} />
                  <p>
                    {el.title}{" "}
                    <small>
                      <Date dateString={el.created_at} />
                    </small>
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const blogs_res = await fetch(`${API_URL}/blogs/`);
  const blogs = await blogs_res.json();

  const blog_res = await fetch(`${API_URL}/blogs/?slug=${slug}`);
  const found = await blog_res.json();
  return {
    props: {
      blogs,
      blog: found[0], // the return of api is an array
    },
  };
}

export async function getStaticPaths() {
  // to retrieve all possible path
  const blogs_res = await fetch(`${API_URL}/blogs/`);
  const blogs = await blogs_res.json();

  // return them to
  return {
    paths: blogs.map((blog) => ({
      params: { slug: String(blog.slug) },
    })),

    fallback: false,
  };
}

export default Blog;
