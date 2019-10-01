const User = require('../../../../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var _ = require('lodash');



module.exports =  function(router){
      router.post('/setuserlocation',(req,res)=>{
        User.findOneAndUpdate({ _id : req.userData._id},
            {location:{
                lon: req.body.location.lon,
                lat: req.body.location.lat
            }},{new: true},(err, doc)=>{
                if (err) {
                    res.status(401).json({
                        message : err
                    })
                }
                res.json(doc)
        })
      })
      router.get('/me',(req,res)=>{
        User.findById(req.userData._id,(err,doc)=>{
            if (err) {
                res.status(401).json({
                    message : err
                })
            }
            res.json(doc)
        })
      })
}