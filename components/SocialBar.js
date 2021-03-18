import Link from "next/link";
import React from "react";
import styles from "../styles/Socialbar.module.css";
const SocialBar = () => {
  return (
    <ul className={styles.socialBarContainer}>
      <Link href="/">
        <a>
          <li className={styles.instagram}>
            <i className="fab fa-instagram-square"></i>
            <span>Instagram</span>
          </li>
        </a>
      </Link>
      <Link href="/">
        <a>
          <li className={styles.facebook}>
            <i className="fab fa-facebook-square"></i>
            <span>Facebook</span>
          </li>
        </a>
      </Link>
      <Link href="/">
        <a>
          <li className={styles.youtube}>
            <i className="fab fa-youtube-square"></i>
            <span>Youtube</span>
          </li>
        </a>
      </Link>
    </ul>
  );
};

export default SocialBar;
