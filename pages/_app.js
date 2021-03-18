import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import CartModal from "../components/CartModal";
import LoginModal from "../components/LoginModal";
import Head from "next/head";
import Navs from "../components/Navs";

import navConfig from "../config/navconfig";

import { AuthProvider } from "../context/AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";
import SocialBar from "../components/SocialBar";
import cookie from "js-cookie";

import AuthContext from "../context/AuthContext";

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(defaultValue);

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

async function getCookieCart() {
  const cartCookie = () => {
    let result = JSON.parse(cookie.get("cart"));
    return result;
  };
  return await cartCookie;
}

function MyApp({ Component, pageProps }) {
  const [cartModal, setCartModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  // load from local storage
  const [cart, setCart] = useStickyState([], "cart");

  // toggle modal
  const toggleCartModal = () => {
    let newState = cartModal;
    setCartModal(!newState);
  };

  const toggleLoginModal = () => {
    let newState = loginModal;
    setLoginModal(!newState);
  };

  const [positionY, setPositionY] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY > 0 ? setPositionY(true) : setPositionY(false);
    });
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  // const [cart, setCart] = useStickyState(null, "cart");

  // useEffect(() => {
  //   setCart(localCart);
  // }, [localCart]);
  const addProduct = (newItem) => {
    let newCart = cart;
    newCart.push(newItem);
    setCart(newCart);
  };
  const removeProduct = (index) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };
  const addProductAmount = (index) => {
    let newArray = [...cart];
    let editedItem = newArray.splice(index, 1)[0];
    editedItem.amount++;
    newArray.splice(index, 0, editedItem);
    setCart(newArray);
  };
  const minusProductAmount = (index) => {
    let newArray = [...cart];
    let editedItem = newArray.splice(index, 1)[0];
    if (editedItem.amount > 1) {
      editedItem.amount--;
      newArray.splice(index, 0, editedItem);
      setCart(newArray);
    }
  };

  const addToCart = (name, amount, price, image) => {
    let newArray = [...cart];
    // check no copy product in the cart
    if (!cart.find((product) => product.name === name)) {
      newArray.push({ name: name, amount: amount, price: price, image: image });
      setCart(newArray);
    }
  };
  // add coupon
  // add facebook or google login

  return (
    <AuthProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossOrigin="anonymous" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>
      </Head>
      <content>
        <div onClick={toggleCartModal} className={cartModal ? `${styles.modalCover}` : `${styles.modalCover} ${styles.hidden}`}></div>
        <div onClick={toggleLoginModal} className={loginModal ? `${styles.modalCover}` : `${styles.modalCover} ${styles.hidden}`}></div>

        <div className={cartModal ? `${styles.modalWrapper} ${styles.display}` : `${styles.modalWrapper} ${styles.hidden}`}>
          <CartModal addProductAmount={addProductAmount} minusProductAmount={minusProductAmount} removeProduct={removeProduct} buttonClickToggle={toggleCartModal} openCart={cartModal} cartItem={cart === null ? [] : cart}></CartModal>
        </div>
        <div className={loginModal ? `${styles.modalWrapper} ${styles.display}` : `${styles.modalWrapper} ${styles.hidden}`}>
          <LoginModal openLogin={loginModal} buttonClickToggle={toggleLoginModal}></LoginModal>
        </div>
        <Header cartItem={cart} toggleCartModal={toggleCartModal} toggleLoginModal={toggleLoginModal} />
        <Navs config={navConfig} />
        {/* <div className={styles.socialBarContainer}>
          <SocialBar />
        </div> */}
        <Component {...pageProps} cart={cart} toggleCartModal={toggleCartModal} screenToggle={toggleCartModal} modalController={cartModal} addToCart={addToCart} />
        <div onClick={scrollToTop} className={positionY ? `${styles.backToTop}` : ` ${styles.none}`}>
          <i className="fas fa-arrow-circle-up"></i>
        </div>
        <Footer />
      </content>
    </AuthProvider>
  );
}

export async function getinitialprops() {
  // fetch the product
  let cartCookie = getCookieCart();

  console.log(cartCookie);
  // return the products as props
  return {
    props: {},
  };
}

export default MyApp;
