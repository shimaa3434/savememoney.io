

const CategoryValidator = (categoryparam:string) => {
    const Parameter = categoryparam;

    const PossibleCategories = [
        'psu', 'cpu', 'ssd',
        'monitor', 'prebuilt', 'mouse',
        'cables', 'keyboard', 'hdd', 'cooler',
        'other'
    ]
    
    const CheckMatch = PossibleCategories.includes(Parameter)
}


module.exports = CategoryValidator