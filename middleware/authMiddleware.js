const jwt = require('jsonwebtoken');

const verifyToken =(req,res,next)=>{
const token = req.header('Authorization')

if(!token){
    return res.status(401).json({ error: 'Access denied' });
}
try {
    const decoded = jwt.verify(token,"auth-secret")
    req.userId = decoded.userId;
    next()
} catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
    
}
}
module.exports = verifyToken