import Head from "next/head";
import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import styles from "../../styles/Product.module.css";
import ProductCarousel from "../../components/ProductCarousel";
import Counter from "../../components/Counter";

import { useState, useEffect } from "react";

const Product = ({ product, addToCart }) => {
  const [amount, setAmount] = useState(1);
  const [messageModal, setMessageModal] = useState(false)

  const addProductAmount = (index) => {
    let newAmount = amount;
    newAmount++;
    setAmount(newAmount);
  };
  const minusProductAmount = (index) => {
    let newAmount = amount;
    if (newAmount > 1) {
      newAmount--;
      setAmount(newAmount);
    }
  };

  const [positionY, setPositionY] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY > 0 ? setPositionY(true) : setPositionY(false);
    });
  });
  return (
    <div className={styles.productContainer}>
      <div className="widthController">
        <div className={styles.productWrapper}>
          <Head>
            {product.meta_title && <title>{product.meta_title}</title>}
            {product.meta_description && <meta name="description" content={product.meta_description} />}
          </Head>

          <div className={styles.carouselWrapper}>
            <ProductCarousel items={product.images} />
          </div>
          <div className={styles.detailWrapper}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.content}</p>
            <div className={styles.shoppingController}>
              <Counter amount={amount} minusProductAmount={minusProductAmount} addProductAmount={addProductAmount} />
              <button
                className={styles.addToCart}
                onClick={() => {
                  setAmount(1);
                  addToCart(product.title, amount, product.discount ? product.discount : product.price, fromImageToUrl(product.image));
                }}
              >
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={positionY ? `${styles.productFooter}` : `${styles.productFooter} ${styles.hidden}`}>
        <div className={styles.productFooterContainer}>
          <img src={fromImageToUrl(product.image)} />
          <p>{product.title}</p>

          <p>${product.price}</p>
          <div className={styles.shoppingController}>
            <Counter amount={amount} minusProductAmount={minusProductAmount} addProductAmount={addProductAmount} />
            <button
              className={styles.addToCart}
              onClick={() => {
                setAmount(1);
                addToCart(product.title, amount, product.discount ? product.discount : product.price, fromImageToUrl(product.image));
              }}
            >
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0], // the return of api is an array
    },
  };
}

export async function getStaticPaths() {
  // to retrieve all possible path
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();

  // return them to
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: false, // to show 404 if the param is not match
  };
}

export default Product;
