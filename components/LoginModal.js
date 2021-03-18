import React, { useEffect, useContext, useState } from "react";
import styles from "../styles/LoginModal.module.css";
import { Form, Button, Col } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import { Spinner } from "reactstrap";

const Modal = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { user, loginUser, logoutUser } = useContext(AuthContext);

  const toggleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(loginEmail);
    toggleLogin();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logoutUser();
    toggleLogin();
  };

  const welcomeTxt = user ? "會員專區" : "會員登入";
  return (
    <div className={props.openLogin ? `${styles.modalBody} ${styles.modalOpen}` : `${styles.modalBody} ${styles.modalClose}`}>
      <div className={styles.modalHead}>
        <h3>{welcomeTxt}</h3>
        <a onClick={props.buttonClickToggle}>關閉</a>
      </div>

      <div className={user && !loading ? "show" : "hidden"}>
        <p>會員：{user ? user.email : null}</p>
        <a onClick={handleLogout} className={styles.logoutButton}>
          會員登出
        </a>
      </div>

      <div className={loading? `${styles.spinnerWrapper}` : 'hidden'}>
        <Spinner color="success" />
      </div>

      <div className={!user && !loading ? "show" : "hidden"}>
        <div className={styles.loginInfo}>
          <Form>
            <Form.Group controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="loginPassword">
              <Form.Label>密碼</Form.Label>
              <Form.Control value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="記住我" />
            </Form.Group>
            <Button onClick={handleLogin} variant="primary" type="submit">
              登入
            </Button>
          </Form>
        </div>

        <div className={styles.otherLogin}>
          <h3>其他登入方式</h3>
          <Button block="true" variant="primary">
            Facebook
          </Button>
          <br />
          <Button block="true" variant="success">
            Google
          </Button>
        </div>

        <div className={styles.register}>
          <p>沒有帳號?</p>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>密碼</Form.Label>
              <Form.Control placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label>生日(YYYYMMDD)</Form.Label>
              <Form.Control placeholder="例：19900223" />
            </Form.Group>
            <Button variant="primary" type="submit">
              註冊
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
