var Router = require('express').Router();
import UserClass from './Objects/User';
var JWTAuthMiddleware = require('./Middleware/Authentication');

var User = new UserClass();


//    USER ROUTES FOR SIGNING UP, LOGGING IN, AND LOGGING OUT     \\

Router.post('/signup', (request:any, response:any) => {
    User.create(request, response);
});

Router.post('/login', (request:any, response:any) => {
    User.login(request, response);
});

Router.post('/logout', JWTAuthMiddleware, (request:any, response:any) => {
    User.logout(response);
});

Router.put('/changepassword', JWTAuthMiddleware, (request:any, response:any) => {
    User.changepassword(request, response);
});

Router.put('/changename', JWTAuthMiddleware, (request:any, response:any) => {
    User.changename(request, response)
});

Router.get('/profile/:username', (request:any, response:any) => {
    User.profile(request, response);
})

module.exports = Router;