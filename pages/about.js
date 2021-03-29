import React from "react";
import { fromImageToUrl, API_URL } from "../utils/urls";
import styles from "../styles/About.module.css";
const about = (props) => {
  const author_1 = props.authors[0];
  const author_2 = props.authors[1];
  return (
    <div className="widthController">
      <div className={styles.authorWrapper}>
        <div className={styles.textWrapper}>
          <h3>{author_1.name}</h3>
          <p>{author_1.intro}</p>
        </div>
        <img src={author_1.image} />
      </div>

      <div className={styles.authorWrapper}>
        <img src={author_2.image} />
        <div className={styles.textWrapper}>
          <h3>{author_2.name}</h3>
          <p>{author_2.intro}</p>
        </div>
      </div>
    </div>
  );
};

export default about;

export async function getStaticProps() {
  // fetch the product

  const authors_res = await fetch(`${API_URL}/authors`);
  const authors = await authors_res.json();

  return {
    props: {
      authors,
    },
  };
}
