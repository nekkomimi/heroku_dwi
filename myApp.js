const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const db = require('./config/database/database.js')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res)=>{
    res.send('TEST PORTAL')
});
db();

app.listen(3000);