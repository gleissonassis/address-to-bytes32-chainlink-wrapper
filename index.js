const express = require('express');
const axios = require('axios').default;

const app = express() // the main app
const admin = express() // the sub app

const port = process.env.PORT || 3005;

const endpoint = 'https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=';

app.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    const response = await axios.get(`${endpoint}${req.query.tx}`);
    
    const from = response.data.result.from.replace('0x', '');
    
    const addressToBytes32 = '0x' + from.padStart(64, '0');
    const addressToInt = parseInt(response.data.result.from);

    res.send({ addressToBytes32,  addressToInt });
});

app.listen(port, function () {
    console.log('Ready');
});