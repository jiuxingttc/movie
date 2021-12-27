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
// 获取单个信息
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Movie.findOne({_id:req.params.id}).then(movie=>{
        if (!movie) {
           return res.status(404).json('没有内容') 
        }
        res.json(movie)
    }).catch(err=>{
        res.status(404).json(err) 
    })
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
// 模糊查询电影
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
router.post("/edit/id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const movieFields = {};
    if(req.body.name) movieFields.name =  req.body.name;
    if(req.body.director) movieFields.director=  req.body.director;
    if(req.body.actor) movieFields.actor =  req.body.actor;
    if(req.body.type) movieFields.type =  req.body.type;
    if(req.body.time) movieFields.time =  req.body.time;
    if(req.body.point) movieFields.point =  req.body.point;

    Movie.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:movieFields},
        {new:true})
    .then(movie=>{
        res.json(movie)
    })
})
//删除
router.delete('/deletemovie',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Movie.findOneAndRemove({_id:req.params.id}).then(movie=>{
        movie.save().then(movie=>res.json(movie))
    }).catch(err=>res.status(404).json('删除失败'))
})

module.exports = router;
