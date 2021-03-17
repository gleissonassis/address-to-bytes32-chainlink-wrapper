const express = require('express');
const axios = require('axios').default;

const app = express();

const port = process.env.PORT || 3000;

const endpoint = 'https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=';

app.get('/', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
    
        const response = await axios.get(`${endpoint}${req.query.tx}`);
        const from = response.data.result.from;
        const isOwner = from.toLowerCase() === req.query.address.toLowerCase();

        res.send({ isOwner});
    } catch (e) {
        res.send({ isOwner: false, e });
    }
});

app.listen(port, function () {
    console.log('Ready');
});