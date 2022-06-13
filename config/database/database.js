const mysql = require('mysql');

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ariel',
    password: '123',
    database: 'portal_data'
})
connection.connect(function(err){
    if (err) throw err;
    console.log("Connected")
})