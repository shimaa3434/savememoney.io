declare var require:any
declare var module:any
var JWT = require('jsonwebtoken');


const AuthenticateToken = (request:any, response:any, next:Function) => {
    const Cookies = request.headers.cookie;

    if (Cookies) {
        const Token = Cookies.split(/=/gi)[1];
        const DecodedJWTToken = JWT.verify(Token, 'f2b271e88196e68685f5a897da0ee715');
        
        request.body.email = DecodedJWTToken.email,
        request.body.username = DecodedJWTToken.username
        next();
    } else {
        response.sendStatus(400);
    }
}

module.exports = AuthenticateToken;