const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const port = 3200;

let key = '';
let salt = '';
let txnid = '';
let amount = '';
let status = '';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Welcome!!!');
});

app.post('/hash', (req, res) => {
    key = req.body.key;
    salt = req.body.salt;
    txnid = req.body.txnid;
    amount = req.body.amount;
    let prodinfo = req.body.productinfo;
    let fname = req.body.firstname;
    let email = req.body.email;
    let hashStr = key + "|" + txnid + "|" + amount + "|" + prodinfo + "|" + fname + "|" + email +  "|||||||||||" + salt;
    let hash = calcHash(hashStr);
    res.send({"hash": hash});
});

function calcHash(hashStr) {
    let cryp = crypto.createHash('sha512');
    cryp.update(hashStr);
    let hash = cryp.digest('hex');
    return hash;
}

app.post('/response', (req, res) => {
    txnid = req.body.txnid;
    amount = req.body.amount;
    let prodinfo = req.body.productinfo;
    let fname = req.body.firstname;
    let email = req.body.email;
    status = req.body.status;
    let hashStr = salt + "|" + status + "|||||||||||" + email + "|" + fname + "|" + prodinfo + "|" + amount + "|" + txnid + "|" + key;
    if(req.body.additionalCharges) {
        let addChrges = req.body.additionalCharges;
        hashStr = addChrges + "|" + hashStr;
    }
    let hash = calcHash(hashStr);
    if(hash == req.body.hash) {
        console.log('Success');
        res.redirect('http://localhost:3000/response');
    } else {
        console.log('Failure');
    }
});

app.get('/getResponse', (req, res) => {
    res.send({'status': status, 'txnid': txnid, 'amount': amount});
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});