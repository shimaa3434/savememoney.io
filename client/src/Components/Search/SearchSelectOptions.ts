import {SearchPriceRangeSelectInt, SearchCategorySelectInt} from '../../TypeScript/App Interfaces';


export const priceSelectOptions:Array<SearchPriceRangeSelectInt> = [
    {value: ['0','25'], label: '$0-$25'}, {value: ['25','50'], label: '$25-$50'}, {value: ['50','100'], label: '$50-$100'},
    {value: ['100','250'], label: '$100-$250'}, {value: ['250','500'], label: '$250-$500'}, {value: ['500','1000'], label: '$500-$1000'},
    {value: ['1000','5000'], label: '$1000+'}
];

export const categorySelectOptions:Array<SearchCategorySelectInt> = [
    {value: 'cpu', label: 'CPU'}, {value: 'gpu', label: 'GPU'}, {value: 'ram', label: 'RAM'},
    {value: 'hdd', label: 'HDD'}, {value: 'ssd', label: 'SSD'}, {value: 'motherboard', label: 'Motherboard'},
    {value: 'monitor', label: 'Monitor'}, {value: 'psu', label: 'PSU'}, {value: 'controller', label: 'Controller'},
    {value: 'laptop', label: 'Laptop'}, {value: 'Other', label: 'Other'}, {value: 'vr', label: 'VR'},
    {value: 'case', label: 'Case'}, {value: 'cooler', label: 'Cooler'}, {value: 'headphones', label: 'Headphones'},
    {value: 'fan', label: 'Fan'}, {value: 'prebuilt', label: 'Prebuilt'}, {value: 'headset', label: 'Headset'},
    {value: 'optical-drive', label: 'Optical Drive'}, {value: 'os', label: 'OS'}, {value: 'speakers', label: 'Speakers'},
    {value: 'keyboard', label: 'Keyboard'}, {value: 'networking', label: 'Networking'}, {value: 'furniture', label: 'Furniture'},
    {value: 'mouse', label: 'Mouse'}, {value: 'bundle', label: 'Bundle'}, {value: 'htpc', label: 'HTPC'},
    {value: 'cables', label: 'Cables'}, {value: 'mouse', label: 'Mouse'}, {value: 'flash-drive', label: 'Flash Drive'},
    {value: 'router', label: 'Router'}, {value: 'mic', label: 'Mic'}
]

interface Group {
    label: string,
    options: Array<{label:string, value:string}>
}

export const GroupSelectOptions:Array<Group> = [
    {
        label: 'Computers',
        options: [
            { value: 'cpu', label: 'CPU' },
            { value: 'gpu', label: 'GPU' },
            { value: 'ram', label: 'RAM' },
            { value: 'hdd', label: 'HDD' },
            { value: 'ssd', label: 'SSD' },
            { value: 'motherboard', label: 'Motherboard' },
            { value: 'monitor', label: 'Monitor' },
            { value: 'psu', label: 'PSU' },
            { value: 'laptop', label: 'Laptop' },
            { value: 'Other', label: 'Other' },
            { value: 'case', label: 'Case' },
            { value: 'cooler', label: 'Cooler' },
            { value: 'fan', label: 'Fan' },
            { value: 'prebuilt', label: 'Prebuilt' },
            { value: 'optical-drive', label: 'Optical Drive' },
            { value: 'os', label: 'OS' },
            { value: 'keyboard', label: 'Keyboard' },
            { value: 'networking', label: 'Networking' },
            { value: 'mouse', label: 'Mouse' },
            { value: 'bundle', label: 'Bundle' },
            { value: 'htpc', label: 'HTPC' },
            { value: 'cables', label: 'Cables' },
            { value: 'mousepad', label: 'Mouse Pad' },
            { value: 'flash-drive', label: 'Flash Drive' },
            { value: 'router', label: 'Router' },
            { value: 'mic', label: 'Mic' }
        ]
    },
    {
        label: 'Electronics',
        options: [
            { value: 'controller', label: 'Controller' },
            { value: 'vr', label: 'VR' },
            { value: 'headphones', label: 'Headphones' },
            { value: 'headset', label: 'Headset' },
            { value: 'speakers', label: 'Speakers' },
        ]
    },
    {
        label: 'Clothing',
        options: [
            { value: 'mens', label: 'Mens' },
            { value: 'women', label: 'Women' },
            { value: 'girls', label: 'Girls' },
            { value: 'boys', label: 'Boys' },
            { value: 'baby', label: 'Baby' },
            { value: 'luggage', label: 'Luggage' }
        ]
    },
    {
        label: 'Books',
        options: [
            { value: 'books', label: 'Books' },
            { value: 'childrens-books', label: 'Children\'s Books' },
            { value: 'textbooks', label: 'Girls' },
        ]
    },
    {
        label: 'Entertainment',
        options: [
            { value: 'movies', label: 'Movies' },
            { value: 'tvshows', label: 'TV Shows' },
            { value: 'bluray', label: 'Bluray' },
            { value: 'digitalmusic', label: 'Digital Music' },
            { value: 'instruments', label: 'Instruments' },
            { value: 'videogames', label: 'Video Games' }
        ]
    },
    {
        label: 'Furniture',
        options: [
            { value: 'Furniture', label: 'Furniture' },
            { value: 'tvshows', label: 'TV Shows' },
            { value: 'bluray', label: 'Bluray' },
            { value: 'digitalmusic', label: 'Digital Music' },
            { value: 'instruments', label: 'Instruments' },
            { value: 'videogames', label: 'Video Games' }
        ]
    },

]