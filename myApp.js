const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res)=>{
    res.send('TEST PORTAL')
});

app.listen(3000);