const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hi there');
});


app.listen('4000', (req, res) => {
    console.log('Listening on 4000');
})