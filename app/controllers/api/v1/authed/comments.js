const Comment = require('../../../../models/comments')
const User = require('../../../../models/users')
const mongoose = require('mongoose')

module.exports =  function(router){
      router.post('/:postid',(req,res)=>{
      var comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userid : req.userData._id,
        parent : req.params.postid,
        text: {
            english : req.body.text.english,
            urdu : req.body.text.urdu
          }
      })
      comment.save().then((data)=>{
        returnobj = data.toObject();
        User.findOneAndUpdate({_id: req.userData._id},
             { $push:{ comments : data._id}},
             {new: true}, (err, doc) => {
            if (err) {
                // console.log("Something wrong when updating data!");
                res.status(401).json(err)
            }
            res.status(200).json({
                message : "success"
            })
        });
      }).catch((err)=>{
          console.log(err)
          res.status(401).json({
            message: err
        });
      })
    })
    router.delete('/:postid',  (req,res)=>{
        Comment.remove({ _id : req.params.postid , userid : req.userData._id },(err, doc)=>{
            if(err || !doc){
                res.send(200, 'false');
            }
            else{
                res.send(doc)
            }
        })
    });

    
    router.put('/:postid',(req,res)=>{
        if(req.body.text.english && req.body.text.english ){
            Comment.findOneAndUpdate({ _id : req.params.postid , userid : req.userData._id},
                {$set:{
                    text: {
                        english : req.body.text.english,
                        urdu : req.body.text.urdu
                      }
                }}, {new: true}, (err, doc) => {
                if (err) {
                    res.status(401).json({
                        message : err
                    })
                }
                else
                res.status(200).json({
                    message : "success",
                    data: doc
                })
            });
        }
    })

    router.get('/like/:postid',(req,res)=>{
        Comment.findOneAndUpdate({ _id : req.params.postid},
            {$addToSet : {likes : req.userData._id}, $pull: {dislikes : req.userData._id}}, {new: true}, (err, doc) => {
            if (err || !doc) {
                res.status(401).json({
                    message : err
                })
            }
            else
            res.status(200).json({
                message : "success"
            })
        });
})

    router.get('/dislike/:postid',(req,res)=>{
        Comment.findOneAndUpdate({ _id : req.params.postid},
            {$addToSet : {dislikes : req.userData._id}, $pull: {likes : req.userData._id}}, {new: true}, (err, doc) => {
            if (err || !doc) {
                res.status(401).json({
                    message : err
                })
            }
            else
            res.status(200).json({
                message : "success"
            })
        });
    })
router.get('/bestanswer/:postid',(req,res)=>{
    Comment.aggregate( [ { $unwind: "$likes" },  { $sortByCount: "$likes" } ] ).exec((err,result)=>{
        res.send(result)
    })
})
router.get('/unlikeanddis/:postid',(req,res)=>{
    Comment.findOneAndUpdate({ _id : req.params.postid},
        {$pull : {dislikes : req.userData._id, likes : req.userData._id}}, {new: true}, (err, doc) => {
        if (err || !doc) {
            res.status(401).json({
                message : err
            })
        }
        else
        res.status(200).json({
            message : "success"
        })
    });
})

}   