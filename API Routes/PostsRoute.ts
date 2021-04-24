declare var require:any;

var Express = require('express');
var Router = Express.Router();
import PostClass from './Objects/Post';
const Post = new PostClass();
var JWTMiddleware = require('./Middleware/Authentication');
var PostImageUploadMiddleware = require('./Middleware/PostImageMiddleware');

Router.post('/create', [PostImageUploadMiddleware, JWTMiddleware], (request:any, response:any) => {
    Post.createv2(request, response)
})

Router.post('/delete', JWTMiddleware, (request:any, response:any) => {
    Post.delete(request, response)
})


Router.post('/save', JWTMiddleware, (request, response) => {
    Post.savepost(request, response)
})

Router.post('/unsave', JWTMiddleware, (request, response) => {
    Post.unsavepost(request, response)
})

Router.post('/upvote', JWTMiddleware, (request, response) => {
    Post.upvote(request, response)
})
/* 
Router.post('/downvote', JWTMiddleware, (request, response) => {
    Post.downvote(request, response)
}) */

Router.get('/trending', JWTMiddleware, (request, response) => {
    Post.trending(request, response)
})

module.exports = Router;