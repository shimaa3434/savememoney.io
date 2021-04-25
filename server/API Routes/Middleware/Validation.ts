declare var require:any
var SQL = require('../../DBConnection');
declare var module:any

type EnteringParameter = string | undefined;

var ParameterValidation:any = {

    CategoryValidator: (categoryparam:EnteringParameter):boolean => {
        const Parameter = categoryparam;
        const PossibleCategories = [
            'cpu', 'gpu', 'ram', 'hdd', 'ssd',
            'motherboard', 'monitor', 'psu', 'webcam',
            'controller', 'laptop', 'other', 'vr', 'case',
            'cooler', 'headphones', 'fan', 'prebuilt', 'headset',
            'optical-drive', 'os', 'speakers', 'keyboard', 'networking',
            'furniture', 'mouse', 'bundle', 'htpc', 'cables', 'flash-drive',
            'router', 'mic'
        ]

        return PossibleCategories.includes(Parameter);
    },
    PriceRangeValidator: (pricerangeparam:EnteringParameter):boolean => {
        const Parameter = pricerangeparam;
        const PossiblePriceRanges:string[] = [
            '0,25', '25,50', '50,100',
            '100,250', '250,500', '500,1000',
            '1000,5000'
        ];

        return PossiblePriceRanges.includes(Parameter)
    },
    InputIntegrityValidator: (userinput:EnteringParameter) => {
        if (userinput) return SQL.escape("%"+userinput+"%")
        if (!userinput) return false;
    }
}

module.exports = ParameterValidation;