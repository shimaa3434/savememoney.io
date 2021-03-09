import {GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange} from '../../Redux/Actions/SearchActions';
import {priceSelectOptions, categorySelectOptions} from './searchSelectOptions'
import {SearchPropsInt} from '../../TypeScript/App Interfaces';
import {searchParameter} from '../../TypeScript/App Types';
import {TextField} from '@material-ui/core';
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
            if (!category && !pricerange) return `?pricerange=${pricerange}`
        };
    };

    return (
        <form className={`w-full ${BGCOLOR} flex flex-col md:w-3/4`} onSubmit={(event:any) => {event.preventDefault();}}>
                <div className='w-full flex items-center justify-center md:mx-4 my-2'>
                    <TextField onChange={(event:any) => {setSearchInput(event.target.value)}} className='w-4/5 lg:w-1/2 bg-coolwhite border-seagreen border-2' label='Search for any item...' />
                </div>
                <div className='flex flex-row justify-center my-4'>
                    <Select onChange={(event:any) => {setSearchCategory(event.value)}} options={categorySelectOptions} placeholder='Category' className='mx-2 w-2/5 md:w-1/3 lg:w-1/6' />
                    <Select onChange={(event:any) => {setSearchPriceRange(event.value)}} options={priceSelectOptions} placeholder='Price Range' className='mx-2 w-2/5 md:w-1/3 lg:w-1/6' />
                </div>
                <div className='flex flex-row justify-center items-center mb-4'>
                    <button type='submit' className=' text-white ring-4 ring-gray-300 bg-seagreen transition delay:300 hover:ring-opacity-50 w-1/3 rounded px-1 py-1 md:w-1/5' onClick={(event:any) => {
                        if (INPUT === null && CATEGORY === null && PRICERANGE === null) {
                            event.preventDefault();
                        } else {
                            GetSearch(setQueryLink(INPUT, CATEGORY, PRICERANGE));
                           window.location.assign(`http://localhost:3000/search${setQueryLink(INPUT, CATEGORY, PRICERANGE)}`)
                        };
                    }}>
                        SEARCH
                    </button>
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
