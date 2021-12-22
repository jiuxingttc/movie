const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../../models/user')
const keys = require('./../../config/key')
const passport = require('passport')

//注册
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

// 登录接口
router.post('/login',(req,res)=>{
    const {username,password} = req.body;
    // 查询数据库
    User.findOne({username}).then(user=>{
        if (!user) {
            return res.status(404).json({username:"用户不存在"})
        }
        // 密码匹配
        bcrypt.compare(password,user.password).then(isMatch=>{
            if (isMatch) {
                // 加密规则 加密名字 过期时间 回调
                const rule = {id:user._id,role:user.role}
                jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                    if (err) {
                        throw err
                    }
                    res.json({
                        success:true,
                        token:'Bearer '+token
                    })
                })
            }else{
              return  res.status(400).json({msg:'密码错误'})
            }
        })
    })
})

//jwt验证token
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        role:req.user.role,
        username:req.user.username
    })
})

// get请求 /api/users/test
router.get('/test',(req,res)=>{
    res.json({
        msg:"test msg"
    })
})

module.exports = router;
