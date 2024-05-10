const jwt = require('jsonwebtoken');
const JWt_SECRET = 'myjwtsecrets';

const fetchUser=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token)
    {
        res.status(401).send({error: 'Invalid token please authenticate using valid tokens'});
    }
    else
    {
        try {
            const data=jwt.verify(token,JWt_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({error: 'Invalid token please authenticate using valid token'});
        }
    }
}
module.exports =fetchUser;
