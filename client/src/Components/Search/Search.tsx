import React, {useEffect} from 'react'
import {TextField, Select, MenuItem} from '@material-ui/core'
import {connect} from 'react-redux';
import {GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange} from '../../Redux/Actions/SearchActions'
import Post from '../Post/Post';
import { Link } from 'react-router-dom';
const queryString = require('query-string');

interface PostProps {
    postid?: string, title: string,
    category: string, image: string,
    url: string, urldomain: string,
    tstamp: number, price: string
}

type Parameter = null | string;

interface SearchProps {
    DATA: null | Array<PostProps>
    INPUT: Parameter,
    CATEGORY: Parameter,
    PRICERANGE: Parameter,
    LOADING: boolean,
    GetSearch: Function
    setSearchInput: Function,
    setSearchCategory: Function,
    setSearchPriceRange: Function
};

const Search:React.FC<SearchProps> = ({DATA, INPUT, CATEGORY, PRICERANGE, LOADING, GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange}) => {
    

    const onInputChange = (event:any) => {
        setSearchInput(event.target.value)
    }

    const onCategoryChange = (event:any) => {
        setSearchCategory(event.target.value)
    }

    const onPriceRangeChange = (event:any) => {
        setSearchPriceRange(event.target.value)
    }
    useEffect(() => {
        const Queries = queryString.stringify(window.location.search);
        console.log(Queries)
        const QueriesLength = (Object.keys(queryString.parse(window.location.search))).length;
        if (window.location.search) {
            GetSearch(window.location.search);
        }
    }, [])

    

    const setQueryLink = (input:Parameter, category:Parameter, pricerange:Parameter) => {

        
        if (input) {
            if (category && pricerange) return `?input=${input}&category=${category}&pricerange=${pricerange}`
            if (category && !pricerange) return `?input=${input}&category=${category}`
            if (!category && pricerange) return `?input=${input}&pricerange=${pricerange}`
            if (!category && !pricerange) return `?input=${input}`
        } else {
            if (category && pricerange) return `?category=${category}&pricerange=${pricerange}`
            if (category && !pricerange) return `?category=${category}`
            if (!category && pricerange) return `?pricerange=${pricerange}`
            if (!category && !pricerange) return `?pricerange=${pricerange}`
        }
    }

    return (
        <div className='flex flex-column w-screen items-center'>
            <div className='w-full bg-gray-300 flex justify-center md:w-3/4'>
                <TextField onChange={onInputChange} className='mx-4' label='Search for any item...' />
                <div className='flex flex-row'>
                    <Select onChange={onCategoryChange} className='mx-4'>
                        <MenuItem value={'MONITOR'}>MONITOR</MenuItem>
                        <MenuItem value={'KEYBOARD'}>KEYBOARD</MenuItem>
                        <MenuItem value={'PREBUILT'}>PREBUILT</MenuItem>
                        <MenuItem value={'MOUSE'}>MOUSE</MenuItem>
                        <MenuItem value={'CABLES'}>CABLES</MenuItem>
                        <MenuItem value={'COOLER'}>COOLER</MenuItem>
                        <MenuItem value={'PSU'}>PSU</MenuItem>
                        <MenuItem value={'CPU'}>CPU</MenuItem>
                        <MenuItem value={'SSD'}>SSD</MenuItem>
                        <MenuItem value={'HDD'}>HDD</MenuItem>
                        <MenuItem value={'OTHER'}>OTHER</MenuItem>
                    </Select>
                    <Select onChange={onPriceRangeChange} className='mx-4'>
                        <MenuItem value={'0-25'}>$0 - $25</MenuItem>
                        <MenuItem value={'25-50'}>$25 - $50</MenuItem>
                        <MenuItem value={'50-100'}>OTHER</MenuItem>
                        <MenuItem value={'100-1000'}>OTHER</MenuItem>
                    </Select>
                        <button className='bg-red-900 text-blue-500' onClick={() => {
                            GetSearch(INPUT, CATEGORY, PRICERANGE)
                            window.location.assign(`http://localhost:3000/search${setQueryLink(INPUT, CATEGORY, PRICERANGE)}`)
                        }}>
                            Go!
                        </button>
                </div>
            </div>
            <div className='w-full bg-gray-300 flex justify-center md:w-3/4'>
                {/* {DATA && DATA.map((post:PostProps, i:number) => {
                    const {title, category, image, url, urldomain, tstamp, price} = post;

                    return <Post title={title} category={category} image={image}
                    url={url} urldomain={urldomain} tstamp={tstamp} price={price}
                    />
                })} */}
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => {
    return {
        DATA: state.SearchState.DATA,
        INPUT: state.SearchState.INPUT,
        CATEGORY: state.SearchState.CATEGORY,
        PRICERANGE: state.SearchState.PRICERANGE,
        LOADING: state.SearchState.LOADING
    }
}
const mapDispatchToProps = (dispatch:Function) => {

    return {
        GetSearch: (query:string) => {dispatch(GetSearch(query))},
        setSearchInput: (input:string) => {dispatch(setSearchInput(input))},
        setSearchCategory: (category:string) => {dispatch(setSearchCategory(category))},
        setSearchPriceRange: (range:string) => {dispatch(setSearchPriceRange(range))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
