const Video = require('../../../../models/videos')
const User = require('../../../../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var _ = require('lodash');



module.exports =  function(router){
    router.get('/post/:postid',(req,res)=>{
        Video.find({ _id : req.params.postid })
        .sort({likes: 'desc'})
        .skip( req.params.page ? (req.params.page - 1)*10 : 0 )
        .limit(10)
        .populate('userid','fullname profilepic')
        .then(obj=>{
                    res.json(obj)
                }).catch(err=>{
                    res.status(401).json({
                        error : err,
                        message : "error finding videos"
                    })
                })
    })
    router.get('/:page?',(req,res)=>{
        Video.find({ })
        .sort({createdAt: 'desc'})
        .skip( req.params.page ? (req.params.page - 1)*10 : 0 )
        .limit(10)
        .populate('userid','fullname profilepic')
        .then(obj=>{
                    res.json(obj)
                }).catch(err=>{
                    res.status(401).json({
                        error : err,
                        message : "error finding videos"
                    })
                })
    })
}   