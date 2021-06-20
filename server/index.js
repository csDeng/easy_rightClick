const express = require('express')
const router = require('./router')
const list = require('./db')

const app = express()
// console.log(list)
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app
    .use(allowCrossDomain)
    .engine('html',require('express-art-template'))
    .use(express.urlencoded({extended:false}))
    .use(express.json())
    .use(router)

app.get('/App',(req,res)=>{
    res.json({list})
    res.end()
})




app.use( (err,req,res,next)=>{
        res.status(500)
        res.send('error')
})
app.listen(8080,()=>{
    console.log('Server is running at : http://127.0.0.1:8080')
})