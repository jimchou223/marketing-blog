import React from "react";
import styles from "../styles/Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.bannerWrapper}>
      <div className={`${styles.flex} widthController`}>
        <h1>行銷部落格</h1>
        <h2>一個在日本工作的無聊女子，想要跟大家一起看見世界<br/>也被世界看見</h2>
        
      </div>
    </div>
  );
};

export default Banner;
