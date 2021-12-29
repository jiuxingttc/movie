const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../../models/user')
const keys = require('./../../config/key')
const passport = require('passport')

//注册
router.post('/register',(req,res)=>{
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
                const rule = {id:user._id,username:user.username,sex:user.sex,hobby:user.hobby,role:user.role}
                jwt.sign(rule,keys.secretOrKey,{expiresIn:36000},(err,token)=>{
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
// 获取所有信息
router.get('/alluser',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role=='admin'){
        User.find().then(user=>{
            if (!user) {
               return res.status(404).json('没有内容') 
            }
            res.json(user)
        }).catch(err=>{
            res.status(404).json(err) 
        })
    }else{
        res.status(303).json('权限不足') 
    }
    
})
// 修改用户信息
router.post('/edituser/:username',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role=='admin'){
        const userFields = {};
        if(req.body.username) userFields.username =  req.body.username;
        if(req.body.sex) userFields.sex =  req.body.sex;
        if(req.body.hobby) userFields.hobby =  req.body.hobby;
        if(req.body.role) userFields.role =  req.body.role;
        User.findOneAndUpdate(
            {username:req.params.username},
            {$set:userFields},
            {new:true})
        .then(user=>{
            res.json(user)
        })
    }else{
        res.status(303).json('权限不足') 
    }
})
//删除
router.post('/deleteuser/:username',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role=='admin'){
        User.findOneAndRemove({username:req.params.username},function(err, doc){
            if(err){return};
            res.json({
                code: 0,
                msg: "删除成功！"
            })
        })
    }else{
        res.status(303).json('权限不足') 
    }
})

//jwt验证token
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        username:req.user.username,
        role:req.user.role,
    })
})

// get请求 users/test
router.get('/test',(req,res)=>{
    res.json({
        msg:"test msg"
    })
})

module.exports = router;
