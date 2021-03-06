const Express = require('express');
const Router = Express.Router();
const SQL = require('../../DBConnection')

// QUERY

// GET REQUEST OF SEARCH
Router.get('', (req, res)=> {
    let Queries = {...req.query};
})

module.exports = Router;