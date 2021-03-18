import React from "react";
import Image from "next/image";
import styles from "../styles/Concept.module.css";

const concept = () => {
  return (
    <div className="widthController">
      <div className={styles.conceptContainer}>
        <div className={styles.ceoImageContainer}>
          <Image alt="logo" width="400" height="300" src="/banner02.jpg"></Image>
        </div>

        <div className={styles.ceoIntroContainer}>
          <p>sadfkj kshf kh ksjlhf jshfluiweh iu hiuehr iuqwheriowq wquiehri biwub iuwerh iwiueq</p>
        </div>
      </div>
    </div>
  );
};

export default concept;
