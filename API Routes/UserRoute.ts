var Router = require('express').Router();
import UserClass from './Objects/User';
var JWTAuthMiddleware = require('./Middleware/Authentication');
var UploadMiddleware = require('./Middleware/Upload');
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

Router.get('/profile/:usernameparam', JWTAuthMiddleware, (request:any, response:any) => {
    User.profile(request, response);
})


Router.get('/savedposts', JWTAuthMiddleware, (request:any, response:any) => {
    User.getsavedposts(request, response);
})

Router.get('/postlookup/:username/:post_id', JWTAuthMiddleware, (request:any, response:any) => {
    User.getuserpost(request, response)
})

Router.post('/follow', JWTAuthMiddleware, (request:any, response:any) => {
    User.follow(request, response);
})

Router.post('/unfollow', JWTAuthMiddleware, (request:any, response:any) => {
    User.unfollow(request, response);
})

Router.get('/timeline', JWTAuthMiddleware, (request:any, response) => {
    User.getusertimeline(request, response)
})

<<<<<<< HEAD
Router.post('/uploadinitialpfp', [UploadMiddleware, JWTAuthMiddleware], (request, response) => {
    User.uploadinitialpfp(request, response);
})

Router.post('/uploadnewpfp', [UploadMiddleware, JWTAuthMiddleware], (request, response) => {
    User.uploadnewpfp(request, response)
=======
Router.post('/uploadpfp', [UploadMiddleware, JWTAuthMiddleware], (request, response) => {
    User.uploadpfp(request, response);
>>>>>>> 129d9cba2feb368568a009ba7a154c4fa413dd30
})

Router.post('/settings', JWTAuthMiddleware, (request, response) => {
    User.getusersettingsdata(request, response);
})
/* 
Router.get('/followdata/:usernameparam', (request:any, response:any) => {
    User.followdata(request, response)
})
*/

module.exports = Router;