var checklength = function(x){
    if(x){
        if( Object.keys(x).length==0 || Object.keys(x).length> 50){
            return true;
        }
    }
}

exports.signup = (req,res,next) => {
    if( !req.body.Name || 
        !req.body.Password ||
        !req.body.phone_number ||
        checklength(req.body.Name) ||
        Object.keys(req.body.Password)<8||
        checklength(req.body.Password) ||
        checklength(req.body.Email) ||
        checklength(req.body.phone_number) ||
        !req.body.verificationcode||
        checklength(req.body.Name)
        ){
        return res.status(400).json({
            message: "Error in sent data packets"
        });
    }
    else{
        if(!req.body.profilepic){
            req.body.profilepic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPndCOlz4wLOzQegnQ5a6cq6TJWz6kKccgvKhJm-otNiMDSdG'
        }
        next();
    }    
}


exports.login = (req,res,next) => {

    if(!req.body.username || 
        !req.body.password){
        return res.status(401).json({
            message: "Invalid fields"
        });
    }
    else
    next();
}