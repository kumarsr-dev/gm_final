import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Container, Row, Col, Form, FormLabel, FormControl, Button} from 'react-bootstrap';
import Axios from 'axios';

export default function PayuResponse() {
  return <Response />;
}
 
function Response() {
  const [txnid, setTxnId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3200/getResponse').then(res=>{
      console.log(res)
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

 
