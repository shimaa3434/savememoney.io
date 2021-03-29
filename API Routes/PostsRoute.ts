var SQL = require('../DBConnection');
var Express = require('express');
var Router = Express.Router();
import PostClass from './Objects/Post';
const Post = new PostClass();
var JWTMiddleware = require('./Middleware/Authentication');
// ESSENTIAL QUERIES

const getAllQuery = 'SELECT * FROM posts ORDER BY tstamp DESC';

Router.get('/', (req:any, res:any) => {
    SQL.query(getAllQuery, (err:any, results:any) => {
        if (err)  console.log(err);
        if (!err) res.send(results);
    })
});


Router.post('/create', JWTMiddleware, (request:any, response:any) => {
    Post.create(request, response)
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


module.exports = Router;