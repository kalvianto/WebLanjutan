const express = require('express')
const app = express()
const mysql = require('mysql')
var cors = require('cors')
const auth = require('./middlewares/auth.js')

var koneksi = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password:'Kalvianto_11',
    database:'TUGAS'
})

koneksi.connect(err=>{
    if (err){
        console.log(err)
    }
    else{
        console.log('Connected')
    }
})


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.get('/',auth,(req,res)=>{
    res.send(
        `<html>
            <body>
                <form action='/todo' method ='post'>
                    <input name='nama'/>
                    <button>Add</button>
                </form>
            </body>
        </html>`
    )
})

app.post('/todo',auth,(req,res)=>{
    const file = req.body.nama
    koneksi.query("Insert into PRODUK(nama) values(?)",file,(err,result)=>{
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})


app.get('/todo',auth,(req,res)=>{
    koneksi.query("Select * from PRODUK",(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})


app.delete('/todo/:id',auth,(req,res)=>{
    koneksi.query("Delete from produk where id=(?)",req.params.id,(err,result)=>{
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})


//tugas 04
app.post('/user',(req,res,next)=>{
    koneksi.query('SELECT COUNT(*) as jumlah_user FROM user',(err,result)=>{
        if (result[0].jumlah_user>0){
            auth(req,res,next)
        }
        else{
            next()
        }
    })
}, (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    koneksi.query('INSERT INTO user(username,password) VALUES (?,?)',[username,password],(err,result)=>{
        if (err){
            console.log(err)
        } 
        res.json({id: result.insertId,username: username})
    })

})

app.get('/user',auth,(req,res)=>{
    koneksi.query("Select * from user",(err,result)=>{
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})

app.delete('/user/:id',auth,(req,res,next)=>{
    koneksi.query('SELECT COUNT (*) as jumlah user FROM user',(err,result)=>{
        if (result[0].jumlah_user===1){
            res.send(401)
        }
        else{
            next()
        }
    })
},(req,res)=>{
    koneksi.query("DELETE FROM user where id=(?)",req.params.id,(err,result)=>{
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})

app.listen(3000,()=>{
    console.log('Server Connected')
})
