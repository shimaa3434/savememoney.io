var Router = require('express').Router();
import UserClass from './Objects/User';

var User = new UserClass();

Router.post('/signup', (request:any, response:any) => {
    User.create(request, response);
})

Router.put('/login', (request:any, response:any) => {
    User.login(request, response);
})

module.exports = Router;