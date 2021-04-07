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

Router.get('/profile/:usernameparam', (request:any, response:any) => {
    User.profile(request, response);
})



Router.get('/savedposts', JWTAuthMiddleware, (request:any, response:any) => {
    User.getsavedposts(request, response);
})

Router.get('/postlookup/:username/:post_id', (request:any, response:any) => {
    User.getuserpost(request, response)
})

Router.post('/follow', JWTAuthMiddleware, (request:any, response:any) => {
    User.follow(request, response);
})

Router.post('/unfollow', JWTAuthMiddleware, (request:any, response:any) => {
    User.unfollow(request, response);
})

Router.get('/followdata/:usernameparam', (request:any, response:any) => {
    User.followdata(request, response)
})

module.exports = Router;