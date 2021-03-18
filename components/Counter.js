import React from "react";
import styles from '../styles/Counter.module.css'

const Counter = (props) => {
  return (
    <div className={styles.modalPanel}>
      <button onClick={props.minusProductAmount} className={styles.modalMinus}>
        -
      </button>
      <input readOnly value={props.product? props.product.amount : props.amount} />
      <button onClick={props.addProductAmount} className={styles.modalPlus}>
        +
      </button>
    </div>
  );
};

export default Counter;
