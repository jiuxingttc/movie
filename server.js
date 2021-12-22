const express = require('express');
const bodyParser = require('body-parser')
const app  = express();
// const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}))  
app.use(bodyParser.json());
const users = require('./routers/api/users')
// const User = require('./models/user')

app.use('/api/users',users)


app.get('/',(req,res)=>{
    res.send("hello express")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})