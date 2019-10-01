const jwt = require('jsonwebtoken')


module.exports = function(){
    
  return (req, res, next)=>{
    try{
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'abc12385')
        req.userData = decoded;
        next();
    }
    catch(err){
        res.status(401).json({
            message: "Authorization error"
        });
    }
}
}