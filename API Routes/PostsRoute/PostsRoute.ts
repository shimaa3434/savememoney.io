var SQL = require('../../DBConnection');
var Express = require('express');
var Router = Express.Router();
var Posts = require('./PostsAction');
const cron = require('node-schedule');

// ESSENTIAL QUERIES

const getAllQuery = 'SELECT * FROM posts';

Router.get('/', (req:any, res:any) => {
    SQL.query(getAllQuery, (err:any, results:any) => {
        if (err)  console.log(err);
        if (!err) res.send(results);
    })
})


Router.post('/', (req:any, res:any) => {
    Posts.grabNewPosts()
    res.send('All new posts have been added.')
})

module.exports = Router;