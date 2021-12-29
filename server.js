const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const passport = require('passport')
const app  = express();
// const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}))  
app.use(bodyParser.json());
const users = require('./routers/api/users')
const movies = require('./routers/api/movies')
const ums = require('./routers/api/ums')
// const User = require('./models/user')

app.use('/api/users',users)
app.use('/api/movies',movies)
app.use('/api/ums',ums)

app.use(express.static(path.join(__dirname, './client/dist')))
//初始化
app.use(passport.initialize())
require('./config/passport')(passport)

// app.get('/',(req,res)=>{
//     res.send("hello express")
// })

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})