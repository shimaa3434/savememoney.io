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

                {/* <div className='flex flex-row justify-center my-6'>
                    <Select options={GroupSelectOptions} components={{ GroupHeading }} placeholder='Category' className='mx-2 w-2/5 md:w-1/3 lg:w-1/6' isClearable={true} 
                    onChange={(event:any) => {
                        if (event) {
                            setSearchCategory(event.value);
                        } else {
                            setSearchCategory('');
                        };
                    }}
                    />
                    <Select  options={priceSelectOptions} placeholder='Price Range' className='mx-2 w-2/5 md:w-1/3 lg:w-1/6' isClearable={true}
                    onChange={(event:any) => {
                        if (event) {

                            setSearchPriceRange(event.value);
                        } else {
                            setSearchPriceRange('');
                        };
                    }}
                    />
                </div>
                <div className='flex flex-col justify-center items-center mb-4'>
                    <Link className=' text-white ring-4 ring-white bg-blue-800 no-underline flex flex-col items-center hover:opacity-75 w-4/6 rounded px-1 py-2 md:w-1/6' to={`/search${setQueryLink(INPUT, CATEGORY, PRICERANGE)}`}
                    onClick={() => {
                        if (INPUT || CATEGORY || PRICERANGE) GetSearch(setQueryLink(INPUT, CATEGORY, PRICERANGE))
                    }
                    }>
                    <button type='submit' className='w-full h-full text-lg font-bold rounded outline-none' onClick={(event:any) => {
                        if (INPUT === '' && CATEGORY === null && PRICERANGE === null) {
                            event.preventDefault();
                        }
                    }}>
                        SEARCH
                    </button>
                    </Link>
                    {LOADING && <img className='h-10 w-10 mx-10' src={LOADINGSPINNER} alt='loading spinner' />}
                </div> */}
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
