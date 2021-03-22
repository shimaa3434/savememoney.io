var Express = require('express');
var Router = Express.Router();
var SQL = require('../../DBConnection');
var ParameterValidation = require('../Validation Middleware/Validation');
var {
    CategoryValidator,
    PriceRangeValidator,
    InputIntegrityValidator
} = ParameterValidation;

// GET REQUEST OF SEARCH

Router.get('', (req:any, res:any)=> {
    
    const {category, input, pricerange} = req.query;
    type ParameterMatch = string | false | Array<number>;
    type EnteringParameter = string | undefined;

    const checkCategoryMatch = (category:EnteringParameter, CategoryValidator:Function):ParameterMatch => {
        if (CategoryValidator(category)) return category;
        if (!CategoryValidator(category)) return false;
    };

    const checkPriceRangeMatch = (pricerange:EnteringParameter, PriceRangeValidator:Function):ParameterMatch => {
        if (PriceRangeValidator(pricerange)) return pricerange.split(',').map((bound:string, i:number) => {
            return Number(bound);
        });
        if (!PriceRangeValidator(pricerange)) return false;
    };

    const checkInputIntegrity = (input:EnteringParameter, InputIntegrityValidator:Function):ParameterMatch => {
        if (InputIntegrityValidator(input)) return InputIntegrityValidator(input);
        if (!InputIntegrityValidator(input)) return false
    }


    const createQuery = (input:ParameterMatch, category:ParameterMatch, pricerange:ParameterMatch):string => {
        if (input && category && pricerange) return `SELECT * FROM posts WHERE title LIKE ${input} AND category LIKE '${category}' and price BETWEEN ${pricerange[0]} AND ${pricerange[1]} ORDER BY tstamp DESC;`
        if (!input && category && pricerange) return `SELECT * FROM posts WHERE category LIKE '${category}' and price BETWEEN ${pricerange[0]} AND ${pricerange[1]} ORDER BY tstamp DESC;`
        if (!input && !category && pricerange) return `SELECT * FROM posts WHERE price BETWEEN ${pricerange[0]} AND ${pricerange[1]} ORDER BY tstamp DESC;`
        if (!input && category && !pricerange) return `SELECT * FROM posts WHERE category LIKE '${category}' ORDER BY tstamp DESC;`
        if (!input && category && pricerange) return `SELECT * FROM posts WHERE category LIKE '${category}' price LIKE '${pricerange[0]} AND ${pricerange[1]}' ORDER BY tstamp DESC;`
        if (input && !category && !pricerange) return `SELECT * FROM posts WHERE title LIKE ${input} ORDER BY tstamp DESC;`
        if (input && category && !pricerange) return `SELECT * FROM posts WHERE title LIKE ${input} AND category LIKE '${category}' ORDER BY tstamp DESC;`
        if (input && !category && pricerange) return `SELECT * FROM posts WHERE title LIKE ${input} AND price BETWEEN ${pricerange[0]} AND ${pricerange[1]} ORDER BY tstamp DESC;`
    }

    SQL.query(
        createQuery(
            checkInputIntegrity(input, InputIntegrityValidator),
            checkCategoryMatch(category, CategoryValidator),
            checkPriceRangeMatch(pricerange, PriceRangeValidator)
        ),
        (err:any, results:any) => {
            if (err) console.log(err);
            if (!err) res.send(results);
        }
    );
});

module.exports = Router;