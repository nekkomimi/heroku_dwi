const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const { resolve } = require('path');
const { rejects } = require('assert');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ariel',
    password: '123',
    database: 'portal_data'
})

connection.connect(function(err){
    if (err) throw err;
    console.log('Database Connected');
});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());
// app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'))
});

app.get('/getArticle', (req, res)=>{
    connection.query(
        'SELECT * FROM article',
        (error, results)=>{
            let result = new Promise((resolve, rejects)=>{
                if (results){
                    resolve(res.send(results));
                }else{
                    rejects(Error('Tidak ada database'));
                }
            })
            result.then((s)=>{
                console.log('Berhasil')
            }).catch((err)=>{
                console.log(err);
            })
        }
    )
});

app.get('/getArticle/:id', (req, res)=>{
    connection.query(
        'SELECT * FROM article WHERE id = ?',
        [req.params.id],
        (error, results)=>{
            res.send(results)
        }
    )
});

app.post('/inputArticle', (req, res)=>{
    connection.query(
        'INSERT INTO article(pengarang, judul, isi, tanggal) VALUES (?,?,?,?)',
        [req.body.pengarang, req.body.judul, req.body.isi, req.body.tanggal, req.body.gambar],
        (error, results)=>{
            connection.query(
                'SELECT * FROM article',
                (error, results)=>{
                    console.log(results)
                }
            )
        }
    )
});

app.patch('/update/:id', (req, res)=>{
    connection.query(
        'UPDATE article SET (judul, isi) WHERE id = ?',
        [req.params.id],
        (error, results)=>{
            res.send(results)
        }
    )
})

app.get('/delete', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/delete.html'))
})

app.delete('/delete/:id', (req, res)=>{
    connection.query(
        'DELETE FROM article WHERE id = ?',
        [req.params.id],
        (error, results)=>{
            connection.query(
                'SELECT * FROM article',
                (error, results)=>{
                    connection.query(
                        'SELECT * FROM article',
                        (error, results)=>{
                            console.log(results)
                        }
                    )
                }
            )
        }
    )
})

app.listen(3000);

//CREATE TABLE article(id INT (20) AUTO_INCREMENT, pengarang VARCHAR(30), judul VARCHAR(255), isi VARCHAR(255), tanggal DATE, CONSTRAINT PK_article PRIMARY KEY (id));
//INSERT INTO article(id, pengarang, judul, isi, tanggal) VALUES (1, 'Ariel', 'Test Database', 'Cuma nyoba gak ada isinya', '2022-06-14');