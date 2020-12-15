const jwt = require('jsonwebtoken');
const authConfing = require('../serverFolder/config/auth.json')
module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization ;
    console.log(authHeader,'testeeeeeee')
    if(!authHeader)
        return res.status(401).json({error: 'no token provided'});
    const parts = authHeader.split(' ');
    if(!parts.length === 2)
        return res.status(401).json({error: 'token error'})
    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).sejsonnd({error: 'token malformatted'})
    jwt.verify(token, authConfing.secret, (err, decoded)=>{
        if(err) return res.status(401).json({error: 'token invalid'})
        req.id = decoded.id
        return next();
    })
}