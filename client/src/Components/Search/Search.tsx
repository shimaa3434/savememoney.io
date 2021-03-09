import {GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange} from '../../Redux/Actions/SearchActions'
import {PostPropsInt, SearchPropsInt} from '../../TypeScript/App Interfaces'
import React, {useEffect} from 'react';
import SearchForm from './SearchForm';
import {connect} from 'react-redux';
import Post from '../Post/Post';

const Search:React.FC<SearchPropsInt> = ({DATA, GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange}) => {
    useEffect(() => {
        if (window.location.search) {
            GetSearch(window.location.search);
        } else {
            setSearchInput(null);
            setSearchCategory(null);
            setSearchPriceRange(null);
        }
    }, []);

    return (
        <div className='flex flex-col w-screen items-center'>
            <SearchForm />
            <div className='w-screen bg-white flex flex-col justify-center md:w-3/4'>
                {DATA && DATA.map((post:PostPropsInt, i:number) => {
                    const {title, category, image, url, urldomain, tstamp, price} = post;
                    return <Post title={title} category={category} image={image}
                    url={url} urldomain={urldomain} tstamp={tstamp} price={price}
                    />
                })};
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => {
    return {
        DATA: state.SearchState.DATA,
        LOADING: state.SearchState.LOADING
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
