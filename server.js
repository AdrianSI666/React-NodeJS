const express = require('express')
const pool = require('./db_connection')
const cors = require('cors')
 
const app = express()
app.use(express.json())
app.use(cors())
 
app.get('/recipes', (req, res) => {
 
    pool.getConnection((err, connection) => {
        if (err) throw err
 
        connection.query('SELECT * from przepisy', (err, rows) => {
            connection.release()
 
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
 
})
 
app.get('/recipes/:id/', (req, res) => {
 
    const { id } = req.params
 
    pool.getConnection((err, connection) => {
        if (err) throw err
 
        connection.query('select * from przepisy where id=?', [id], (err, rows) => {
            connection.release()
 
            if (!err) {
                res.json({
                    data: rows[0]
                })
            } else {
                console.log(err)
            }
        })
    })
})
 
app.post('/recipes', (req, res) => {
 
    const { nazwa, skladniki, przepis } = req.body
 
    pool.getConnection((err, connection) => {
        if (err) throw err
 
        connection.query('insert into przepisy (nazwa, skladniki, przepis) values (?, ?, ?)', [nazwa, skladniki, przepis], (err, rows) => {
            connection.release()
 
            if (!err) {
                res.send({ ...req.body, id: rows.insertId })
            } else {
                console.log(err)
            }
        })
    })
 
})
 
app.put('/recipes/:id', (req, res) => {
 
    const { id } = req.params
    const tmp = req.body
 
    pool.getConnection((err, connection) => {
        if (err) throw err
 
        connection.query('update przepisy set ? where id=?', [tmp, id], (err, rows) => { })
        connection.query('select * from przepisy where id=?', [id], (err, rows) => {
            connection.release()
 
            if (!err) {
                res.json({
                    data: rows[0]
                })
            } else {
                console.log(err)
            }
        })
    })
})
 
app.delete('/recipes/:id', (req, res) => {
 
    const { id } = req.params
 
    pool.getConnection((err, connection) => {
        if (err) throw err
 
        connection.query('delete from przepisy where id=?', [id], (err, rows) => {
            connection.release()
 
            if (!err) {
                res.send("usunięto rekord")
            } else {
                console.log(err)
            }
        })
    })
 
})
 
app.listen(4000, () => console.log('serwer działa'))