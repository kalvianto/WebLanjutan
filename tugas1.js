const express = require('express')
const app = express()
const mysql = require('mysql')
var cors = require('cors')

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

app.get('/',(req,res)=>{
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
app.post('/todo',(req,res)=>{
    const file = req.body.nama
    koneksi.query("Insert into PRODUK(nama) values(?)",file,(err,result)=>{
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})

app.get('/todo',(req,res)=>{
    koneksi.query("Select * from PRODUK",(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

app.delete('/todo/:id',(req,res)=>{
    koneksi.query("Delete from produk where id=(?)",req.params.id,(err,result)=>{
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})

app.listen(3000,()=>{
    console.log('Server Connected')
})
