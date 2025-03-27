const { Admin } = require("../db/database");

function adminMiddleware(req,res,next){
    const username = req.body.username;
    const password = req.body.password;
    
    Admin.findOne({
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

module.exports = adminMiddleware;