import {GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange} from '../../Redux/Actions/SearchActions';
import {priceSelectOptions, categorySelectOptions} from './searchSelectOptions'
import {SearchPropsInt} from '../../TypeScript/App Interfaces';
import {searchParameter} from '../../TypeScript/App Types';
import {TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Select from 'react-select';
import React from 'react';

const SearchForm:React.FC<SearchPropsInt> = ({BGCOLOR, INPUT, CATEGORY, PRICERANGE, LOADING, GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange}) => {

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
            if (!category && !pricerange) return ``
        };
    };

    return (
        <form className={`w-full ${BGCOLOR} flex flex-col md:w-3/4`} onSubmit={(event:any) => {event.preventDefault();}}>
                <div className='w-full flex items-center justify-center md:mx-4 my-2'>
                    <TextField onChange={(event:any) => {setSearchInput(event.target.value)}} className={`w-4/5 lg:w-1/2 bg-white rounded`} label='Search for any item...' />
                </div>
                <div className='flex flex-row justify-center my-4'>
                    <Select options={categorySelectOptions} placeholder='Category' className='mx-2 w-2/5 md:w-1/3 lg:w-1/6' isClearable={true} 
                    onChange={(event:any) => {
                        if (event) {
                            setSearchCategory(event.value);
                        } else {
                            setSearchCategory(null);
                        };
                    }}
                    />
                    <Select options={priceSelectOptions} placeholder='Price Range' className='mx-2 w-2/5 md:w-1/3 lg:w-1/6' isClearable={true}
                    onChange={(event:any) => {
                        if (event) {

                            setSearchPriceRange(event.value);
                        } else {
                            setSearchPriceRange(null);
                        };
                    }}
                    />
                </div>
                <div className='flex flex-row justify-center items-center mb-4'>
                    <Link className=' text-white ring-4 ring-gray-300 bg-seagreen flex flex-col items-center hover:opacity-75 w-1/3 rounded px-1 py-2 md:w-1/6' to={`/search${setQueryLink(INPUT, CATEGORY, PRICERANGE)}`}
                    onClick={() => {
                        if (INPUT || CATEGORY || PRICERANGE) GetSearch(setQueryLink(INPUT, CATEGORY, PRICERANGE))
                    }
                    }>
                    <button type='submit' className='' onClick={(event:any) => {
                        if (INPUT === null && INPUT === '' && CATEGORY === null && PRICERANGE === null) {
                            event.preventDefault();

                        }
                    }}>
                        SEARCH
                    </button>
                    </Link>
                </div>
            </form>
    );
};

const mapStateToProps = (state:any) => {
    return {
        DATA: state.SearchState.DATA,
        INPUT: state.SearchState.INPUT,
        CATEGORY: state.SearchState.CATEGORY,
        PRICERANGE: state.SearchState.PRICERANGE,
        LOADING: state.SearchState.LOADING,
    };
};
const mapDispatchToProps = (dispatch:Function) => {

    return {
        GetSearch: (query:string) => {dispatch(GetSearch(query))},
        setSearchInput: (input:string) => {dispatch(setSearchInput(input))},
        setSearchCategory: (category:string) => {dispatch(setSearchCategory(category))},
        setSearchPriceRange: (range:string) => {dispatch(setSearchPriceRange(range))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
