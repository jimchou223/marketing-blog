import React from "react";
import Question from "../components/Question";
import ContactUs from "../components/ContactUs";
import styles from "../styles/Questions.module.css";

export default function questions() {
  return (
    <div>
      <Question />

      <div className={styles.formWrapper}>
        <ContactUs />
      </div>
    </div>
  );
}
