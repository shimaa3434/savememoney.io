declare var require:any
var Router = require('express').Router();
var JWT = require('jsonwebtoken');
declare var module:any

Router.post('/auth', (request:any, response:any) => {
    const Cookies = request.headers.cookie;
    
    if (Cookies) {
        const AuthenticationToken = Cookies.split(/=/gi)[0] === 'JWT' && Cookies.split(/=/gi)[1];
        const TokenDecoded = JWT.verify(AuthenticationToken, 'f2b271e88196e68685f5a897da0ee715');
        if (TokenDecoded && TokenDecoded !== 'invalid signature') {
            response.send({
                status: 210,
                username: TokenDecoded.username,
                pfp: TokenDecoded.pfp
            })
        }
    } else {
        response.send({
            status: 400
        })
    }
})


module.exports = Router;