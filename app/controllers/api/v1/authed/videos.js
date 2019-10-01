const Video = require('../../../../models/videos')
const User = require('../../../../models/users')
const mongoose = require('mongoose')

module.exports =  function(router){
      router.post('/',(req,res)=>{
      var video = new Video({
        _id: new mongoose.Types.ObjectId(),
        userid : req.userData._id,
        link : req.body.link,
        name: {
            english : req.body.name.english,
            urdu : req.body.name.urdu
          },
          Tags: req.body.tags
      })
      video.save().then((video)=>{
        User.findOneAndUpdate({_id: req.userData._id},
             { $push: { videos : video._id}},
             {new: true}, (err, doc) => {
            if (err) {
                // console.log("Something wrong when updating data!");
                res.status(401).json(err)
            }
            res.status(200).json({
                message: "done!"
            })
        });
      }).catch((err)=>{
          res.status(401).json({
            message: err
        });
      })
    })
    router.delete('/:postid',  (req,res)=>{
        Video.remove({ _id : req.params.postid , userid : req.userData._id },(err, doc)=>{
            if(err || !doc){
                res.send(200, 'false');
            }
            else{
                res.send(doc)
            }
        })
    });
    router.put('/:postid',(req,res)=>{
            Video.findOneAndUpdate({ _id : req.params.postid , userid : req.userData._id},
                {$set:{
                    name: {
                    english : req.body.name.english,
                    urdu : req.body.name.urdu
                  },
                Tags: res.body.tags}}, {new: true}, (err, doc) => {
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

    router.get('/like/:postid',(req,res)=>{
        Video.findOneAndUpdate({ _id : req.params.postid},
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
    Video.findOneAndUpdate({ _id : req.params.postid},
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
}   