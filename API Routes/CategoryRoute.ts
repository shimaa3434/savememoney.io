var SQL = require('../DBConnection');
var Express = require('express');
var Router = Express.Router();
var ParameterValidation = require('./Middleware/Validation');
var {CategoryValidator} = ParameterValidation;
// GET ROUTE FOR CATEGORY PARAMETER
Router.get('/:category', (req:any, res:any) => {
    
    const Parameter = req.params.category;
    
    if (CategoryValidator(req.params.category)) {
        const FilterQuery = `SELECT * FROM posts WHERE category LIKE '%${req.params.category}%';`
        SQL.query(FilterQuery, (err:any, results:any) => {
            if (err) res.send('Error.')
            if (!err) res.send(results)
        })
    }
})

module.exports = Router;