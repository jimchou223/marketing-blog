import React from "react";
import styles from "../styles/Belt.module.css";

const features = [
  { title: "市場訊息", content: "獲得日本市場最新最正確的行銷廣告產業市場資訊", src: "fas fa-search-dollar" },
  { title: "專業知識", content: "是行銷新手嗎？沒關係我們一步一步帶領你", src: "fas fa-book" },
  { title: "實務操作", content: "理論看膩了嗎？來看看實際的業界是怎麼做的吧", src: "fas fa-people-carry" },
];

const Belt = () => {
  return (
    <div className={styles.beltContainer}>
      {features.map((el, index) => {
        return (
          <div key={index} className={styles.cardContainer}>
            <div className={styles.cardImg}>
              <i className={el.src}></i>
            </div>
            <div className={styles.cardText}>
              <h4>{el.title}</h4>
              <p>{el.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Belt;
