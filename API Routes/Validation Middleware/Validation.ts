


var ParameterValidation:any = {

    CategoryValidator: (categoryparam:string) => {
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

        return PossibleCategories.includes(Parameter)
    },

    
}

module.exports = ParameterValidation;