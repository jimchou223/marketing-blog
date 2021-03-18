import React, { useEffect } from "react";
import styles from "../styles/CartModal.module.css";
import Counter from "./Counter";


const Modal = (props) => {
  let total = 0;
  props.cartItem.map((product) => {
    total += product.amount * product.price;
    return true
  });
  return (
    <div className={props.openCart ? `${styles.modalBody} ${styles.modalOpen}` : `${styles.modalBody} ${styles.modalClose}`}>
      <div className={styles.modalHead}>
        <h3>購物車清單</h3>
        <a onClick={props.buttonClickToggle}>關閉</a>
      </div>
      {props.cartItem.map((product, index) => {
        return (
          <div key={index} className={styles.modalItem}>
            <i onClick={() => props.removeProduct(index)} className="fas fa-trash-alt"></i>
            <div className={styles.modalUpper}>
              <img className={styles.cartImage} src={product.image} />
              <h3>{product.name}</h3>
            </div>

            <div className={styles.modalLower}>
              <p>單價： ${product.price}</p>
              <Counter product={product} minusProductAmount={() => props.minusProductAmount(index)}  addProductAmount={() => props.addProductAmount(index)} />
              {/* <div className={styles.modalPanel}>
                <button onClick={() => props.minusProductAmount(index)} className={styles.modalMinus}>
                  -
                </button>
                <input readOnly value={product.amount} />
                <button onClick={() => props.addProductAmount(index)} className={styles.modalPlus}>
                  +
                </button>
              </div> */}
            </div>
          </div>
        );
      })}

      <div className={styles.modalTotalPanel}>
        <h3>小記:</h3>
        <h3>${total}</h3>
        <a href="/checkout">結帳去</a>
      </div>
    </div>
  );
};

export default Modal;
