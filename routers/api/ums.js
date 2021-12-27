const express = require("express");
const router = express.Router();
const passport = require('passport')
const UM = require('../../models/um')

//用户评分
router.post("/score/:moviename",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const umFields = {};
    umFields.username = req.user.username;
    umFields.moviename = req.params.moviename;
    if(req.body.score) umFields.score = req.body.score;
    new UM(umFields).save().then(um=>{
        res.json(um)
    })
})
//用户评论
router.post("/comment/:moviename",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const umFields = {};
    umFields.username = req.user.username;
    umFields.moviename = req.params.moviename;
    if(req.body.comment) umFields.comment = req.body.comment;
    new UM(umFields).save().then(um=>{
        res.json(um)
    })
})

//获取用户对当前电影的评分
router.get("/getScore/:moviename",passport.authenticate('jwt',{session:false}),(req,res)=>{
    UM.findOne({moviename:req.params.moviename,username:req.user.username}).then(um=>{
        if (!um) {
           return res.status(404).json('没有内容') 
        }
        res.json(um)
    }).catch(err=>{
        res.status(404).json(err) 
    })
})
router.get("/getScore",passport.authenticate('jwt',{session:false}),(req,res)=>{
    UM.find({username:req.user.username}).then(um=>{
        if (!um) {
           return res.status(404).json('没有内容') 
        }
        res.json(um)
    }).catch(err=>{
        res.status(404).json(err) 
    })
})

module.exports = router;
