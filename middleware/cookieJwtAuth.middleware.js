const jwt = require('jsonwebtoken')

const cookieJwtAuth = (req, res, next) => {

    const token = req.cookies.token
    try{
        const user = jwt.verify(token, "q1y1npar0l")
        req.user = user;
        next()
    }catch(ex){
        res.clearCookie("token")
        return res.render('login', {

        });
    }
}

module.exports.cookieJwtAuth = cookieJwtAuth