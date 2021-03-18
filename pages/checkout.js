import React, { useState, useContext } from "react";
import { Form, Col, Button } from "react-bootstrap";
import styles from "../styles/Checkout.module.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import AuthContext from "../context/AuthContext";
import { fromImageToUrl, API_URL } from "../utils/urls";

const checkout = ({ cart }) => {
  const {user} = useContext(AuthContext)
  let total = 0;
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const stepOneSubmit = (e) => {
    e.preventDefault();
    let newStep = step;
    newStep++;
    setStep(newStep);
  };

  const stepTwoSubmit = (e) => {
    e.preventDefault();
    let newStep = step;
    newStep++;
    setStep(newStep);

    // create order and order item
    // postFetch(`${API_URL}/orders`, user.email, cart)
    // .then((result) => {
    //   return result
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
    
  }
  const nameHandler = (e) => {
    let type = e.target.id;
    if (type === "name") {
      let oldstate = name;
      oldstate = e.target.value;
      setName(oldstate);
    } else if (type === "email") {
      let oldstate = email;
      oldstate = e.target.value;
      setEmail(oldstate);
    } else if (type === "tel") {
      let oldstate = tel;
      oldstate = e.target.value;
      setTel(oldstate);
    } else if (type === "address") {
      let oldstate = address;
      oldstate = e.target.value;
      setAddress(oldstate);
    } else if (type === "zip") {
      let oldstate = zip;
      oldstate = e.target.value;
      setZip(oldstate);
    } else if (type === "city") {
      let oldstate = city;
      oldstate = e.target.value;
      setCity(oldstate);
    }
  };
  return (
    <>
      <div className={styles.progressBarContainer}>
        <ProgressBar percent={(step - 1) * 34}>
          <Step>
            {({ accomplished, index }) => (
              <div className={styles.stepWrapper}>
                <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>{index + 1}</div>
                <span>資料填寫</span>
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div className={styles.stepWrapper}>
                <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>{index + 1}</div>
                <span>確認內容</span>
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div className={styles.stepWrapper}>
                <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>{index + 1}</div>
                <span>付款</span>
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div className={styles.stepWrapper}>
                <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>{index + 1}</div>
                <span>購買完成</span>
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
      <div className={step === 1 ? `${styles.checkoutWrapper}` : "hidden"}>
        <Form onChange={nameHandler} onSubmit={stepOneSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>姓名</Form.Label>
              <Form.Control placeholder="您的姓名" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="您的Email" />
            </Form.Group>

            <Form.Group as={Col} controlId="tel">
              <Form.Label>聯絡電話</Form.Label>
              <Form.Control type="tel" placeholder="您的電話" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="zip">
              <Form.Label>郵遞區號</Form.Label>
              <Form.Control placeholder="" />
            </Form.Group>
            <Form.Group as={Col} controlId="city">
              <Form.Label>縣市</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="address">
              <Form.Label>地址</Form.Label>
              <Form.Control placeholder="地址" />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            送出
          </Button>
        </Form>
      </div>
      <div className={step === 2 ? `${styles.productsListContainer}` : "hidden"}>
        <div className="widthController">
          <h4>訂單內容確認</h4>
          <ul>
            {cart.map((el, index) => {
              total += el.price * el.amount;
              return (
                <li key={index}>
                  {el.name} ${el.price} x {el.amount} = ${el.price * el.amount}
                </li>
              );
            })}
          </ul>
          <h5 className="right">合計：${total}</h5>
          <div>
            <h4>寄送資訊確認</h4>
            <div>
              <p>姓名：{name}</p>
              <p>Email：{email}</p>
              <p>電話：{tel}</p>
              <p>
                地址：{zip} {city} {address}
              </p>
            </div>
          </div>
        </div>
        <Button onClick={stepTwoSubmit} variant="primary">
          送出
        </Button>
      </div>

      <div className={step === 3 ? `${styles.paymentWrapper}` : "hidden"}>
        我是付款模擬頁面
        <Button onClick={stepOneSubmit} variant="primary">
          付款完成
        </Button>
      </div>

      <div className={step === 4 ? `${styles.finalPage}` : "hidden"}>
        恭喜你，您的訂單已經完成。稍後會將詳細資料Email到您的信箱，感謝您的購買
      </div>
    </>
  );
};

async function postFetch(url, user, rawData) {
  const data = {
    user: user,
    items: rawData
  }
  return await fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // 輸出成 json
}

export default checkout;
