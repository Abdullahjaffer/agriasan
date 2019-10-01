const Verify = require('../../models/verification')

exports.verifycode = (req,res,next) => {
    Verify.findOne({phonenumber: req.body.phone_number, code: req.body.verificationcode},(err,obj)=>{
        if(err){
            res.send(err)
        }
        if(obj == null){
            res.status(400).send({
                message: 'Wrong code'
            })
        }
        else{
            next()
        }
    })
}