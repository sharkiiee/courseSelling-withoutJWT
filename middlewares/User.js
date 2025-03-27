const { User } = require("../db/database");

function userMiddleware(req,res,next){
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({
        username,
        password
    }).then(function(value){
        if(value){
            next()
        }else{
            res.status(403).json({
                msg:"user doesn't exist"
            })
        }
    })
}

module.exports = userMiddleware;