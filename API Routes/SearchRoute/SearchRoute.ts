var Express = require('express');
var Router = Express.Router();
var SQL = require('../../DBConnection')
var QS = require('qs')
var ParameterValidation = require('../Validation Middleware/Validation');
var {CategoryValidator} = ParameterValidation;

// QUERY

// GET REQUEST OF SEARCH
Router.get('', (req:any, res:any)=> {
    
    const {category, input, pricerange} = req.query;

    type CategoryMatch = string | false;

    const checkCategoryMatch = (category:any, CategoryValidator:Function):CategoryMatch => {
        if (CategoryValidator(category)) return category;
        if (!CategoryValidator(category)) return false
    }

    checkCategoryMatch(category, CategoryValidator);

    const IncomingQueryObj = QS.parse(req.query);
    console.log(QS.stringify(req.query))
})

module.exports = Router;