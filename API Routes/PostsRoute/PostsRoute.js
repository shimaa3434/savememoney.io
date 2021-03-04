const SQL = require('../../DBConnection');
const Express = require('express');
const Router = Express.Router();
const Posts = require('./Posts');
const cron = require('node-schedule');

// ESSENTIAL QUERIES

const getAllQuery = 'SELECT * FROM posts';

Router.get('/', (req, res) => {
    SQL.query(getAllQuery, (err, results) => {
        if (err)  console.log(err);
        if (!err) res.send(results);
    })
})


Router.post('/', (req, res) => {
    Posts.grabNewPosts()
    res.send('All new posts have been added.')
})

module.exports = Router;