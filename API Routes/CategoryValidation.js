

const CategoryValidator = (categoryparam) => {
    const Parameter = req.params.category;

    const PossibleCategories = [
        'psu', 'cpu', 'ssd',
        'monitor', 'prebuilt', 'mouse',
        'cables', 'keyboard', 'hdd', 'cooler',
        'other'
    ]
    
    const CheckMatch = PossibleCategories.includes(Parameter)
}


module.exports = CategoryValidator