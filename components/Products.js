import React, { useState, useEffect } from "react";
import styles from "../styles/Products.module.css";
import Link from "next/link";
import { fromImageToUrl } from "../utils/urls";

const categories = [
  { title: "全部商品", slug: "all" },
  { title: "小編精選", slug: "select" },
  { title: "人氣產品", slug: "popular" },
];

const Products = (props) => {
  const [productsFound, setProductsFound] = useState([]);

  const [currentProduct, setCurrentProduct] = useState("all");
  const clickHandler = (slug) => {
    setCurrentProduct(slug);
  };

  useEffect(() => {
    let productsFound;
    if (currentProduct === "select") {
      productsFound = props.products.filter((el) => el.select);
    } else if (currentProduct === "popular") {
      productsFound = props.products.filter((el) => el.popular);
    } else {
      productsFound = props.products;
    }
    return setProductsFound(productsFound);
  }, [currentProduct]);

  return (
    <div className={styles.productsContainer}>
      <h4 className="center">文章列表</h4>

      <div className="widthController">
        <ul className={styles.productFilter}>
          {categories.map((category, index) => {
            return (
              <li className={category.slug === currentProduct? `${styles.productFilterActivated}` : null} key={category.slug} onClick={() => clickHandler(category.slug)}>
                <button>{category.title}</button>
              </li>
            );
          })}
        </ul>
        <div className={styles.productsWrapper}>
          {productsFound.map((product, index) => (
            <div key={index} className={styles.product}>
              <Link href={`/products/${product.slug}`}>
                <a>
                  <div className={styles.productImg}>
                    <div className={styles.productTag}>
                      {product.select ? <span className={styles.select}>小編精選</span> : null}
                      {product.popular ? <span className={styles.popular}>人氣產品</span> : null}
                    </div>

                    <img src={fromImageToUrl(product.image)} />
                  </div>
                  <div className={styles.product__Col}>{product.title}</div>
                  <div>
                    <div className={styles.priceWrapper}>
                      <div className={product.discount ? `${styles.normalPrice} ${styles.withDiscount}` : `${styles.normalPrice}`}>${product.price}</div>
                      <h3 className={styles.discount}>{product.discount ? `$${product.discount}` : null}</h3>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
