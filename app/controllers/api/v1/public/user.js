const User = require('../../../../models/users')
const validator = require('../../../../lib/validators/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var _ = require('lodash');
const Verify = require('../../../../models/verification')
const codeverifier = require('../../../../lib/validators/verifycode')

module.exports =  function(router){
    router.post('/signup',validator.signup,codeverifier.verifycode,(req,res) => {
        bcrypt.hash(req.body.Password,10).then(function(hash) {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                fullname: req.body.Name,
                email: req.body.Email,
                password: hash,
                profilepic: req.body.profilepic,
                phonenumber: req.body.phone_number,
                type: req.body.type,
                location: {
                    lon: req.body.lng,
                    lat: req.body.lat
                },
                dateofbirth:{
                    day: req.body.day,
                    month: req.body.month,
                    year: req.body.year
                },
                designationName:req.body.designationName,
                instituteName: req.body.instituteName,
                gender: req.body.gender
                
            });
            user.save().then((data)=>{
              returnobj = data.toObject();
              delete returnobj.password;
                let userToken = user.CreateToken();
                res.json({
                  token : userToken,
                  user : returnobj
                })
            }).catch((err)=>{
                console.log(err)
                res.status(401).json({
                  message: err
              });
            })
        });
        
        
      });
      
      router.post('/login',validator.login,(req,res) =>{
        User.findOne({
            phonenumber : req.body.username
        }, (err,obj)=>{
            if(err){
                res.status(401).json({
                  message: err
                });
            }
            else if(obj){
                returnobj = obj.toObject();
                delete returnobj.password;
                bcrypt.compare(req.body.password, obj.password,function(err,result){
                    if(result == true){
                        let userToken = obj.CreateToken()
                        res.json({
                          token : userToken,
                          user : returnobj
                        })
                    }
                    if(result == false){
                        res.status(400).json({
                            message :  "Wrong Pass"             
                        });

                        if(err){
                            console.log(err)
                            res.status(400).json({
                                message :  "Server"             
                            });
                        }
                    }
                    console.log(result)
                })
            }
            else{
                res.status(401).send({
                  message: "no such user"           
                });
            }
        }).select('+password')
      });
      router.post('/addverify',(req,res) =>{
        var phonenumber = req.body.phonenumber
        console.log({ phonenumber })
        Verify.deleteMany({ phonenumber },(err, obj)=>{
            if(err){
                console.log(phonenumber)
                res.send(err)
            }else{
                console.log(phonenumber)
                let verify = new Verify({
                    _id: new mongoose.Types.ObjectId(),
                    phonenumber: phonenumber,
                    code: Math.floor(100000 + Math.random() * 900000)
                })
                verify.save().then((data)=>{
                    res.status(200).send({
                        message: 'success'
                    })
                }).catch((err)=>{
                        res.status(400).send({
                            message: err
                        })
                    })
            }
        })
      })
      router.get('/checknumber/:number',(req,res) =>{
        User.findOne({phonenumber:req.params.number},(err, obj)=>{
            if(err){
                res.status(400).send({
                    message: 'failed'
                })
            }
            if(obj !== null){
                res.status(400).send({
                    message: 'failed'
                })
            }else{
                res.status(201).send({
                    message: 'success'
                })
            }
        })
      })
}
