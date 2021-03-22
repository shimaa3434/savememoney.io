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
    {value: 'laptop', label: 'Laptop'}, {value: 'other', label: 'Other'}, {value: 'vr', label: 'VR'},
    {value: 'case', label: 'Case'}, {value: 'cooler', label: 'Cooler'}, {value: 'headphones', label: 'Headphones'},
    {value: 'fan', label: 'Fan'}, {value: 'prebuilt', label: 'Prebuilt'}, {value: 'headset', label: 'Headset'},
    {value: 'optical-drive', label: 'Optical Drive'}, {value: 'os', label: 'OS'}, {value: 'speakers', label: 'Speakers'},
    {value: 'keyboard', label: 'Keyboard'}, {value: 'networking', label: 'Networking'}, {value: 'furniture', label: 'Furniture'},
    {value: 'mouse', label: 'Mouse'}, {value: 'bundle', label: 'Bundle'}, {value: 'htpc', label: 'HTPC'},
    {value: 'cables', label: 'Cables'}, {value: 'mouse', label: 'Mouse'}, {value: 'flash-drive', label: 'Flash Drive'},
    {value: 'router', label: 'Router'}, {value: 'mic', label: 'Mic'}
]