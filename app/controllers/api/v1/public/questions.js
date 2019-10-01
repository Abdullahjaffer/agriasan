const Question = require('../../../../models/questions')
const User = require('../../../../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var _ = require('lodash');
var cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dmqxw5kdc',
  api_key: '848222857133348',
  api_secret: 'Eh0LS1jPEcbU7vs9JB28WaDJVn4'
})

module.exports =  function(router){
    router.get('/post/:postid',(req,res)=>{
        Question.findOne({ _id : req.params.postid })
        .populate('userid','fullname profilepic createdAt')
        .then(obj=>{
                    res.json(obj)
                }).catch(err=>{
                    res.status(401).json({
                        error : err,
                        message : "error finding comments"
                    })
                })
    })
    router.get('/:page?',(req,res)=>{
        if(req.params.page)
        page = parseInt(req.params.page)
        else{
            page = 0;
        }
        Question.find({ })
        .sort({createdAt: 'desc'})
        .skip( page ? (page - 1)*10 : 0 )
        .limit(10)
        .populate('userid','fullname profilepic')
        .then(obj=>{
                    res.json(obj)
                }).catch(err=>{
                    res.status(401).json({
                        error : err,
                        message : "error finding comments"
                    })
                })
    })
    router.get('/search/:query/:page?',(req,res)=>{
        console.log("HEREHHERE")
        let searchString = req.params.query
        if(req.params.page)
        page = parseInt(req.params.page)
        else{
            page = 0;
        }
        Question.find({$text: {$search: searchString} })
        .sort({createdAt: 'desc'})
        .skip( page ? (page - 1)*10 : 0 )
        .limit(10)
        .populate('userid','fullname profilepic')
        .then(obj=>{
                    res.json(obj)
                }).catch(err=>{
                    res.status(401).json({
                        error : err,
                        message : "error finding comments"
                    })
                })
    })
    router.post('/checkreq',(req,res)=>{
        
    })
}   