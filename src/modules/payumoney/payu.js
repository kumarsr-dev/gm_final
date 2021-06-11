import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Container, Row, Col, Form, FormLabel, FormControl, Button} from 'react-bootstrap';
import Axios from 'axios';

export default function Payu() {
  return <Payment />;
}

function Payment(props) {
  console.log(props.amount)
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
      <FormLabel>Amount</FormLabel>
      <FormControl type="text" name="amount" value={amount} onChange={calcHash}></FormControl>
      <FormLabel>First name</FormLabel>
      <FormControl type="text" name="firstname" value={firstname} onChange={calcHash}></FormControl>
      <FormLabel>Email</FormLabel>
      <FormControl type="text" name="email" value={email} onChange={calcHash}></FormControl>
      <FormLabel>Phone</FormLabel>
      <FormControl type="text" name="phone" value={phone} onChange={calcHash}></FormControl>
      <FormLabel>Product Info</FormLabel>
      <FormControl type="text" name="productinfo" value={productinfo} onChange={calcHash}></FormControl>
      <Button type="submit">Pay</Button>  
 
      </Form>
    </Container>
  );
}
 