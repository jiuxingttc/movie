const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('/home/osuser/00project/movie/models/user.js')
router.post('/register',(req,res)=>{
   console.log(req.body);
   //查询数据库中是否有邮箱
   User.findOne({username:req.body.username}).then(user =>{
       if (user) {
           return res.status(400).json({username:"该用户名已经被注册"})
       }else{
           const newUser = new User({
               username:req.body.username,
               password:req.body.password,
               sex:req.body.sex,
               hobby:req.body.hobby,
               role:req.body.role
           })
           // 加密密码
           bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                   if(err) throw err;
                   newUser.password = hash;
                   newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err));
               })
           })
       }
   })
})

// get请求 /api/users/test
router.get('/test',(req,res)=>{
    res.json({
        msg:"test msg"
    })
})

module.exports = router;
