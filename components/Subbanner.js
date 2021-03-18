import React from "react";
import styles from "../styles/Subbanner.module.css";

const SubBanner = () => {
  return (
    <div className={styles.subbannerWrapper}>
      <div className={styles.widthController}>
        <div className={styles.subbannerLeft}>
          <h1>
            讓遠方的氛圍，
            <br />
            流浪到生活之中。
          </h1>
        </div>

        <div className={styles.subbannerRight}>
          <p>「就算無法流浪到遠方，生活也仍要保有對旅行的美好想像。」</p>
          <p>Tramper，是由喜愛流浪旅行的靈魂組成的品牌。</p>
          <p>我們在旅行的路上尋找有靈魂、有故事的產品，希望藉由這些產品的溫度，持續創造不同社群的連結，讓來自這世界各個角落的人能更認識彼此。</p>
        </div>
      </div>
    </div>
  );
};

export default SubBanner;
