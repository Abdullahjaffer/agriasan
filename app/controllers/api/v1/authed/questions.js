const Question = require('../../../../models/questions')
const User = require('../../../../models/users')
const mongoose = require('mongoose')
var cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dmqxw5kdc',
  api_key: '848222857133348',
  api_secret: 'Eh0LS1jPEcbU7vs9JB28WaDJVn4'
})
module.exports =  function(router){
      router.post('/',(req,res)=>{
        let promises = []
        req.body.images.forEach(element => {
            promises.push(cloudinary.uploader.upload(element,(err,result)=>{
                
            }))
        });
        Promise.all(promises)
            .then((result) => {
                let re = []
                result.forEach(element=>{
                    re.push(element.secure_url)
                })
                if(re.length == 0){
                    re.push('http://lequytong.com/Content/Images/no-image-02.png')
                }
                var question = new Question({
                    _id: new mongoose.Types.ObjectId(),
                    userid : req.userData._id,
                    question: {
                        english : req.body.question.english,
                        urdu : req.body.question.urdu
                      },
                      description:{
                        english : req.body.description.english,
                        urdu : req.body.description.urdu
                      },
                      images : re
                  })
                  question.save().then((question)=>{
                      let Question = question
                    User.findOneAndUpdate({_id: req.userData._id},
                         { $push: { questions : question._id}},
                         {new: true}, (err, doc) => {
                        if (err) {
                            // console.log("Something wrong when updating data!");
                            res.status(401).json(err)
                        }
                        res.status(200).json(Question)
                    });
                  }).catch((err)=>{
                      console.log(err)
                      res.status(401).json({
                        message: err
                    });
                  })
            })

    })
    router.delete('/:postid',  (req,res)=>{
        Question.remove({ _id : req.params.postid , userid : req.userData._id },(err, doc)=>{
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
            Question.findOneAndUpdate({ _id : req.params.postid , userid : req.userData._id , likes : { $size : 0}},
                {$set:{
                    question: {
                        english : req.body.question.english,
                        urdu : req.body.question.urdu
                      },
                      description:{
                        english : req.body.description.english,
                        urdu : req.body.description.urdu
                      }
                }}, {new: true}, (err, doc) => {
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
        }
    })

    router.get('/like/:postid',(req,res)=>{
        Question.findOneAndUpdate({ _id : req.params.postid},
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
    Question.findOneAndUpdate({ _id : req.params.postid},
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
router.get('/unlikeanddis/:postid',(req,res)=>{
    Question.findOneAndUpdate({ _id : req.params.postid},
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