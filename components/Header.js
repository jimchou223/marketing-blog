import { useContext } from "react";
import Link from "next/link";
import Image from 'next/image'
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";


const Header = (props) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const goBack = (event) => {
    event.preventDefault();
    router.back();
  };
  return (
    <div className={styles.nav}>
      <div className={styles.title}>
        <Link href="/">
          <a>
            <Image alt="logo" width="80" height="60" src="/logo.png"></Image><h1>海上絲路4.0</h1>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
