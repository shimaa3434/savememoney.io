import {GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange} from '../../Redux/Actions/SearchActions';
import {priceSelectOptions, categorySelectOptions, GroupSelectOptions} from './SearchSelectOptions'
import {SearchPropsInt} from '../../TypeScript/App Interfaces';
import {searchParameter} from '../../TypeScript/App Types';
import {TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Select, { components } from 'react-select';
import React from 'react';
import LOADINGSPINNER from '../../Media/Images/loading.svg';

const groupStyles = {
    color: 'white',
    fontSize: '1.25em',
    borderBottom: '1px solid grey',
    borderTop: '1px solid grey',
}

const GroupHeading = (props:any) => {
    return (
        <div style={groupStyles}>
            <components.GroupHeading {...props} />
        </div>
    )
}

const SearchForm:React.FC<SearchPropsInt> = ({styles, INPUT, CATEGORY, PRICERANGE, LOADING, GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange}) => {

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
        <form className={`${styles} flex`} onSubmit={(event:any) => {event.preventDefault();}}>

                    <TextField value={INPUT} onChange={(event:any) => {setSearchInput(event.target.value)}} className='w-4/5 lg:w-full bg-white' label='Search for any item...' />
                    <Link className=' outline-none text-white bg-blue-800 no-underline flex flex-col items-center hover:opacity-75 w-20 rounded px-1 py-2 h-full' to={`/search${setQueryLink(INPUT, CATEGORY, PRICERANGE)}`}
                    onClick={() => {
                        if (INPUT) GetSearch(setQueryLink(INPUT, null, null))
                    }
                    }>
                    <button type='submit' className='w-20 h-full text-lg font-bold rounded outline-none' onClick={(event:any) => {
                        if (INPUT === '') {
                            event.preventDefault();
                        }
                    }}>
                        GO
                    </button>
                    </Link>
            </form>
    );
};

const mapStateToProps = (store:any) => {
    const { SearchState } = store;
    const { DATA, INPUT, CATEGORY, PRICERANGE, LOADING } = SearchState;

    return {
        DATA,
        INPUT,
        CATEGORY,
        PRICERANGE,
        LOADING,
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
