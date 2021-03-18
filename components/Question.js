import React, { useState } from "react";
import styles from "../styles/Question.module.css";

const questions = [
  { question: "你們是誰？", answer: "我們是一群喜愛流浪旅行的靈魂組成的。我們喜歡在旅行的路上尋找有靈魂、有故事的產品，更希望藉由這些產品的溫度，創造不同社群的連結，讓來自這世界各個角落的人能更認識彼此。" },
  { question: "在哪裡可以看到實體商品", answer: "若您想體驗產品觸感，歡迎私訊 Tramper粉專 預約到工作室看地毯本人喔！▎工作室地點：台北市吉林路 402 號 2 樓 （ 請事先預約 ）" },
  { question: "你們商品都在哪裡做的？", answer: "目前的商品均來自印度與喀什米爾，未來 Tramper 也會持續拓展其它國家的特色商品，敬請期待！" },
  { question: "我下單後大概多久會收到？", answer: "我們一般將會在收到您訂單後，在 3 個工作天內寄出。歡迎直接私訊我們詢問出貨進度！國定假日、六日不出貨。" },
  { question: "什麼是布靡卡計畫？", answer: "Tramper 布靡卡計畫 在印度偏鄉的村莊與當地紡織工作坊，以高於市場 25% 的基本薪資及每季穩定的訂單量，與希望改善生活條件的當地婦女合作。不僅讓喜愛異國風的台灣朋友能收藏道地的印度手工藝品，也讓她們用自己的好手藝爭取更好的生活品質。" },
];

const Question = () => {
  const [activate, setActivate] = useState([]);

  const clickHandler = (index) => {
    let newArr = [...activate];

    if (newArr.includes(index)) {
      let result = newArr.filter((el) => el !== index);
      setActivate(result);
    } else {
      newArr.push(index);
      setActivate(newArr);
    }
  };
  return (
    <div className={styles.questionsContainer}>
      <h4 className="center">常見問題</h4>
      <div className="widthController">
        <dl className={styles.boxWrapper}>
          {questions.map((question, index) => {
            let clicked = activate.includes(index);
            return (
              <div key={index}>
                <dt onClick={() => clickHandler(index)}>
                  <span className={clicked ? `${styles.down}` : `${styles.up}`}>
                    <i className="fas fa-chevron-down"></i>
                  </span>

                  {question.question}
                </dt>
                <dd className={clicked ? `${styles.show}` : `${styles.hidden}`}>{question.answer}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export default Question;
