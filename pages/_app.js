import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Navs from "../components/Navs";

import navConfig from "../config/navconfig";

import { AuthProvider } from "../context/AuthContext";




function MyApp({ Component, pageProps }) {
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


  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossOrigin="anonymous" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>
      </Head>
      <content>
        <Header  />
        <Navs config={navConfig} />
        {/* <div className={styles.socialBarContainer}>
          <SocialBar />
        </div> */}
        <Component {...pageProps} />
        <div onClick={scrollToTop} className={positionY ? `${styles.backToTop}` : ` ${styles.none}`}>
          <i className="fas fa-arrow-circle-up"></i>
        </div>
        <Footer />
      </content>
    </>
  );
}


export default MyApp;
