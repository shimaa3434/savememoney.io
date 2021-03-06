var SQL = require('../../DBConnection');
var Express = require('express');
var Router = Express.Router();
 
Router.get('/:category', (req, res) => {
    const Parameter = req.params.category;

    const PossibleCategories = [
        'psu', 'cpu', 'ssd',
        'monitor', 'prebuilt', 'mouse',
        'cables', 'keyboard', 'hdd', 'cooler',
        'other'
    ]
    
    const CheckMatch = PossibleCategories.includes(Parameter)
    
    if (CheckMatch) {
        const FilterQuery = `SELECT * FROM posts WHERE category LIKE '%${req.params.category}%';`
        SQL.query(FilterQuery, (err, results) => {
            if (err) res.send('Error.')
            if (!err) res.send(results)
        })
    }
})

module.exports = Router;