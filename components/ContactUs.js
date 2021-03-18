import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Example = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="您的Email" />
      </FormGroup>
      <FormGroup>
        <Label for="name">姓名</Label>
        <Input type="string" name="name" id="name" placeholder="您的姓名" />
      </FormGroup>
      <FormGroup>
        <Label for="name">聯絡電話</Label>
        <Input type="string" name="name" id="name" placeholder="您的電話" />
      </FormGroup>

      <FormGroup tag="fieldset">
        <Label>我想詢問的項目</Label>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> 商業合作
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> 企業內訓
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> 專欄文章
          </Label>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> 其他
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">問題描述</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" /> 我同意網站的隱私政策
        </Label>
      </FormGroup>
      <FormGroup>
        <Button>送出</Button>
      </FormGroup>
    </Form>
  );
};

export default Example;
