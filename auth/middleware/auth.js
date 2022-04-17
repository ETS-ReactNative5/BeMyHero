const jwt = require("jsonwebtoken");
const TOKEN_KEY = 'sadhfjasjghasgk';

const verifyToken= (req, res, next) => {
    const token= req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['cookie'];
    
    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        req.user= decoded;
    } catch (err){
        return res.status(401).send("Invalid token");
    }
    return next();
}

module.exports = verifyToken;