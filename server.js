// 入口文件
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const passport = require('passport')
const app  = express();
const port = process.env.PORT || 60405;

app.use(bodyParser.urlencoded({extended:false}))  
app.use(bodyParser.json());

const users = require('./routers/api/users')
const movies = require('./routers/api/movies')
const ums = require('./routers/api/ums')

app.use('/api/users',users)
app.use('/api/movies',movies)
app.use('/api/ums',ums)

//初始化
app.use(passport.initialize())
require('./config/passport')(passport)

app.use(express.static(path.join(__dirname, './client/dist')))

// app.get('/',(req,res)=>{
//     res.send("hello express")
// })

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})