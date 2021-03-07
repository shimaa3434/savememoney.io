import React, {useEffect} from 'react'
import {TextField} from '@material-ui/core'
import Select from 'react-select'
import {connect} from 'react-redux';
import {GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange} from '../../Redux/Actions/SearchActions'
import Post from '../Post/Post';
import {PostPropsInt, SearchPropsInt} from '../../TypeScript/App Interfaces'
import {searchParameter} from '../../TypeScript/App Types'
import {priceSelectOptions, categorySelectOptions} from './searchSelectOptions';

const Search:React.FC<SearchPropsInt> = ({DATA, INPUT, CATEGORY, PRICERANGE, LOADING, GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange}) => {
    useEffect(() => {
        if (window.location.search) {
            GetSearch(window.location.search);
        } else {
            setSearchInput(null);
            setSearchCategory(null);
            setSearchPriceRange(null);
        }
    }, []);

    const onInputChange = (event:any) => {setSearchInput(event.target.value)};
    const onCategoryChange = (event:any) => {setSearchCategory(event.value)};
    const onPriceRangeChange = (event:any) => {setSearchPriceRange(event.value)};
    const onSubmit = (event:any) => {event.preventDefault()};

    const setQueryLink = (input:searchParameter, category:searchParameter, pricerange:searchParameter) => {
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
        };
    };

    return (
        <div className='flex flex-column w-screen items-center'>
            <form className='w-full bg-gray-300 flex flex-column justify-center md:w-3/4 md:flex-row' onSubmit={onSubmit}>
                <div className='w-full flex flex-column items-center'>
                    <TextField onChange={onInputChange} className='w-4/5 mx-4 mt-2 lg:w-1/2' label='Search for any item...' />
                </div>
                <div className='flex flex-row justify-center my-4'>
                    <Select onChange={onCategoryChange} options={categorySelectOptions} placeholder='Category' className='mx-2 w-2/5 md:w-1/3 lg:w-1/6' />
                    <Select onChange={onPriceRangeChange} options={priceSelectOptions} placeholder='Price Range' className='mx-2 w-2/5 md:w-1/3 lg:w-1/6' />
                </div>
                <div className='flex flex-row justify-center items-center mb-4'>
                    <button type='submit' className=' text-white ring-4 ring-indigo-300 bg-indigo-400 w-1/3 rounded px-1 py-1 md:w-1/5' onClick={(event:any) => {
                        if (INPUT === null && CATEGORY === null && PRICERANGE === null) {
                            event.preventDefault();
                        } else {
                            GetSearch(setQueryLink(INPUT, CATEGORY, PRICERANGE));
                           window.location.assign(`http://localhost:3000/search${setQueryLink(INPUT, CATEGORY, PRICERANGE)}`)
                        }
                    }}>
                        SEARCH
                    </button>
                </div>
            </form>
            <div className='w-screen bg-white flex flex-column justify-center md:w-3/4'>
                {DATA && DATA.map((post:PostPropsInt, i:number) => {
                    const {title, category, image, url, urldomain, tstamp, price} = post;

                    return <Post title={title} category={category} image={image}
                    url={url} urldomain={urldomain} tstamp={tstamp} price={price}
                    />
                })}
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
