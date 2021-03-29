import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Example = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [content, setContent] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      email: email,
      name: name,
      phone: phone,
      problem: problem,
      content: content
    }
    console.log(data)
    // fetch data to send email auto
  }
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="mb-4">
        <Label for="exampleEmail">Email<span>*</span></Label>
        <Input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="您的Email" />
      </FormGroup>
      <FormGroup className="mb-4">
        <Label for="name">姓名<span>*</span></Label>
        <Input required value={name} onChange={(e) => setName(e.target.value)} type="string" name="name" id="name" placeholder="您的姓名" />
      </FormGroup>
      <FormGroup className="mb-4">
        <Label for="name">聯絡電話<span>*</span></Label>
        <Input required value={phone} onChange={(e) => setPhone(e.target.value)} type="string" name="phone" id="phone" placeholder="您的電話" />
      </FormGroup>

      <FormGroup tag="fieldset" className="mb-4">
        <Label>我想詢問的項目<span>*</span></Label>
        <FormGroup check>
          <Label check>
            <Input onChange={() => setProblem("商業合作")} type="radio" name="radio1" className="mb-2" /> 商業合作
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input onChange={() => setProblem("企業內訓")} type="radio" name="radio1" className="mb-2" /> 企業內訓
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input onChange={() => setProblem("專欄文章")} type="radio" name="radio1" className="mb-2" /> 專欄文章
          </Label>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" className="mb-2" /> 其他
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup className="mb-4">
        <Label for="exampleText">問題描述<span>*</span></Label>
        <Input required value={content} onChange={(e) => setContent(e.target.value)} type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup className="mb-4" check>
        <Label check>
          <Input required type="checkbox" /> 我同意網站的隱私政策<span>*</span>
        </Label>
      </FormGroup>

      <FormGroup className="mb-4">
        <small><span>*</span>欄位為必填項目</small>
      </FormGroup>

      <FormGroup className="mb-4">
        <Button>送出</Button>
      </FormGroup>
    </Form>
  );
};

export default Example;
