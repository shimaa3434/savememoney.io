var Router = require('express').Router();
var JWT = require('jsonwebtoken');

Router.post('/auth', (request:any, response:any) => {
    const Cookies = request.headers.cookie;
    
    if (Cookies) {
        const AuthenticationToken = Cookies.split(/=/gi)[0] === 'JWT' && Cookies.split(/=/gi)[1];
        const TokenDecoded = JWT.verify(AuthenticationToken, 'f2b271e88196e68685f5a897da0ee715');
        if (TokenDecoded && TokenDecoded !== 'invalid signature') {
            response.sendStatus(210);
        }
    } else {
        response.sendStatus(400);
    }
})


module.exports = Router;