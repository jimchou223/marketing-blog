import Head from "next/head";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

import styles from "../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email);
  };
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Log in here to make your purchase" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossOrigin="anonymous" />
      </Head>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className={styles.input} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" />
        <button className={styles.button} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
