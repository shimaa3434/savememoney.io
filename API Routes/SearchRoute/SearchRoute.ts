var Express = require('express');
var Router = Express.Router();
var SQL = require('../../DBConnection')

// QUERY

// GET REQUEST OF SEARCH
Router.get('', (req:any, res:any)=> {
    let Queries = {...req.query};
})

module.exports = Router;