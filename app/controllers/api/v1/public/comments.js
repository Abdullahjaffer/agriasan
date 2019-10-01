const Comment = require('../../../../models/comments')
const User = require('../../../../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var _ = require('lodash');

module.exports =  function(router){
    router.get('/:postid/:page?',(req,res)=>{
        Comment.find({ parent : req.params.postid})
        .sort({likes: 'desc'})
        .skip( req.params.page ? (req.params.page - 1)*10 : 0 )
        .limit(10)
        .populate('userid', 'fullname profilepic createdAt')
        .then(obj=>{
                    res.json(obj)
                }).catch(err=>{
                    res.status(401).json({
                        error : err,
                        message : "error finding comments"
                    })
                })
    })
}   