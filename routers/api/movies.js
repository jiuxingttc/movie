const express = require("express");
const router = express.Router();
const passport = require('passport')
const Movie = require('../../models/movie')

//上传新的电影
router.post("/addmovie",passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role=='admin'){
        const movieFields = {};
        if(req.body.name) movieFields.name =  req.body.name;
        if(req.body.director) movieFields.director=  req.body.director;
        if(req.body.actor) movieFields.actor =  req.body.actor;
        if(req.body.type) movieFields.type =  req.body.type;
        if(req.body.time) movieFields.time =  req.body.time;
        if(req.body.point) movieFields.point =  req.body.point;

        new Movie(movieFields).save().then(movie=>{
            res.json(movie)
        })
    }else{
        res.status(303).json('权限不足') 
    }
})
// 获取所有信息
router.get('/allmovie',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Movie.find().then(movie=>{
        if (!movie) {
           return res.status(404).json('没有内容') 
        }
        res.json(movie)
    }).catch(err=>{
        res.status(404).json(err) 
    })
})
// 管理员获取所有信息
router.get('/allmovie0',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role=='admin'){
        Movie.find().then(movie=>{
            if (!movie) {
            return res.status(404).json('没有内容') 
            }
            res.json(movie)
        }).catch(err=>{
            res.status(404).json(err) 
        })
    }else{
        res.status(303).json('权限不足') 
    }
})
// 模糊查询电影
router.get('/querymovie/:name',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Movie.find({"name":{$regex:req.params.name}}).then(movie=>{
        if (!movie) {
           return res.status(404).json('没有内容') 
        }
        res.json(movie)
    }).catch(err=>{
        res.status(404).json(err) 
    })
})
// 电影分类
router.get('/query/:type',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Movie.find({"type":{$regex:req.params.type}}).then(movie=>{
        if (!movie) {
           return res.status(404).json('没有内容') 
        }
        res.json(movie)
    }).catch(err=>{
        res.status(404).json(err) 
    })
})
// 编辑
router.post("/editMovie/:name",passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role=='admin'){
        const movieFields = {};
        if(req.body.name) movieFields.name =  req.body.name;
        if(req.body.director) movieFields.director=  req.body.director;
        if(req.body.actor) movieFields.actor =  req.body.actor;
        if(req.body.type) movieFields.type =  req.body.type;
        if(req.body.time) movieFields.time =  req.body.time;
        if(req.body.point) movieFields.point =  req.body.point;
        Movie.findByIdAndUpdate(
            {name:req.params.name},
            {$set:movieFields},
            {new:true})
        .then(movie=>{
            res.json(movie)
        })
    }else{
        res.status(303).json('权限不足') 
    }
})
//删除
router.post('/deletemovie/:name',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role=='admin'){
        Movie.findOneAndRemove({name:req.params.name},function(err, doc){
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

module.exports = router;
