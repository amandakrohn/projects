const jwt = require('jsonwebtoken')

function auth(req, res, next){
    try{
        const token = req.cookies.token
        if(!token) return res.status(401).json({msg: "No auth token found. Unauthorized."})
    
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.status(401).json({msg: "Token verification failed, authorization failed."})

        req.user = verified.id;
        next()
    } catch(err){
        console.error(err)
        res.status(401).json({msg: "Unauthorized"})
    }
}

module.exports = auth