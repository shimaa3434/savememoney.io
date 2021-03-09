var SQL = require('../../DBConnection');
var Express = require('express');
var Router = Express.Router();
var Posts = require('./PostsAction');

// ESSENTIAL QUERIES

const getAllQuery = 'SELECT * FROM posts';

Router.get('/', (req:any, res:any) => {
    SQL.query(getAllQuery, (err:any, results:any) => {
        if (err)  console.log(err);
        if (!err) res.send(results);
    })
})

module.exports = Router;