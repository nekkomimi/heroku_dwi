const db = require('./database.js')

db.connection.query(
    'SELECT * FROM user',
    (error, results)=>{
        console.log(results);
    }
)