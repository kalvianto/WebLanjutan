const mysql = require('mysql')
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
module.exports = function(req,res,next){
    const username = req.headers.username
    const password = req.headers.password

    koneksi.query('SELECT * FROM user WHERE username=? AND password=?',[username,password],(err,rows)=>{
        if (rows.length>0){
            next()
        }
        else{
            res.send(401)
        }
    })
}