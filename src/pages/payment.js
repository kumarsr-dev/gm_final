import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Container, Row, Col, Form, FormLabel, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

function Payments() {
  return (<Payment />  );
}

function Payment() {
  const [baseURL] = useState('https://sandboxsecure.payu.in/_payment');
  const [title] = useState('React Js Redirect Checkout');
  const [key, setKey] = useState('QylhKRVd');
  const [salt] = useState('seVTUgzrgE');
  const [txnid, setTxnId] = useState('txn' + Math.round(Math.random(1000, 5000) * 10000));
  const [amount, setAmount] = useState('');
  const [firstname, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productinfo, setProductInfo] = useState('');
  const [surl] = useState('http://localhost:3200/response');
  const [furl] = useState('http://localhost:3200/response');
  const [serviceProvider] = useState('payu_paisa');
  const [hash, setHash] = useState('');

  const calcHash = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if(name === 'key') {
      setKey(value);
    }
    if(name === 'txnid') {
      setTxnId(value);
    }
    if(name === 'amount') {
      setAmount(value);
    }
    if(name === 'firstname') {
      setFirstName(value);
    }
    if(name === 'email') {
      setEmail(value);
    }
    if(name === 'phone') {
      setPhone(value);
    }
    if(name === 'productinfo') {
      setProductInfo(value);
    }
  }

  useEffect(() => {
    Axios.post('http://localhost:3200/hash', {key, txnid, amount, productinfo, firstname, email, salt}).then(res=>{
      setHash(res.data.hash);
    });
  }, [key, txnid, amount, productinfo, firstname, email, salt]);

  return(
    <Container>
      <Form action={baseURL} method="post">
        <Row>
          <Col sm><h4>{title}</h4></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><Form.Label>Key</Form.Label></Col>
          <Col sm><Form.Control type="text" name="key" value={key} onChange={calcHash}></Form.Control></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>Txn Id</FormLabel></Col>
          <Col sm><FormControl type="" name="txnid" value={txnid} onChange={calcHash}></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>Amount</FormLabel></Col>
          <Col sm><FormControl type="text" name="amount" value={amount} onChange={calcHash}></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>First name</FormLabel></Col>
          <Col sm><FormControl type="text" name="firstname" value={firstname} onChange={calcHash}></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>Email</FormLabel></Col>
          <Col sm><FormControl type="text" name="email" value={email} onChange={calcHash}></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>Phone</FormLabel></Col>
          <Col sm><FormControl type="text" name="phone" value={phone} onChange={calcHash}></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>Product Info</FormLabel></Col>
          <Col sm><FormControl type="text" name="productinfo" value={productinfo} onChange={calcHash}></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>SURL</FormLabel></Col>
          <Col sm><FormControl type="text" name="surl" value={surl} readOnly></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>FURL</FormLabel></Col>
          <Col sm><FormControl type="text" name="furl" value={furl} readOnly></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>Service Provider</FormLabel></Col>
          <Col sm><FormControl type="text" name="service_provider" value={serviceProvider} readOnly></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><FormLabel>Hash</FormLabel></Col>
          <Col sm><FormControl type="text" name="hash" value={hash} readOnly></FormControl></Col>
        </Row>
        <Row className="pt-sm-2">
          <Col sm><Button type="submit">Pay</Button></Col>
        </Row>
      </Form>
    </Container>
  );
}

function Response() {
  const [txnid, setTxnId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3200/getResponse').then(res=>{
      setTxnId(res.data.txnid);
      setAmount(res.data.amount);
      setStatus(res.data.status);
    });
  }, [txnid, amount, status]);

  return(
    <Container>
      <Row>
        <Col>TxnId</Col>
        <Col>{txnid}</Col>
      </Row>
      <Row>
        <Col>Amount</Col>
        <Col>{amount}</Col>
      </Row>
      <Row>
        <Col>Status</Col>
        <Col>{status}</Col>
      </Row>
    </Container>
  );
}

export default Payments;
