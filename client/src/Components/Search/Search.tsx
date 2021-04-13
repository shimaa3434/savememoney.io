import {GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange} from '../../Redux/Actions/SearchActions'
import {postcollectionProps, PostPropsInt, SearchPropsInt} from '../../TypeScript/App Interfaces'
import { Component } from 'react';
import SearchForm from './SearchForm';
import {connect} from 'react-redux';

import PostCard from '../PostCard/PostCard';

class Search extends Component<SearchPropsInt> {

    constructor (props:SearchPropsInt) {
        super(props);
    }

    componentWillMount () {
        if (window.location.search) {
            GetSearch(window.location.search);
        } else {
            setSearchInput('');
            setSearchCategory('');
            setSearchPriceRange('');
        }
    }

    render () {

        const { DATA } = this.props;
        
        return (
            <div className='flex flex-col w-screen items-center'>
                <SearchForm />
                <div className='w-screen bg-white flex flex-col md:flex-row md:flex-wrap justify-center'>
                    {DATA && DATA.map(({title, category, image, url, urldomain, tstamp, price, post_id, user_name, upvotes, downvotes, id, pfp}:PostPropsInt&postcollectionProps, i:number) => {
                    return <PostCard
                    title={title} category={category} image={image} url={url} tstamp={tstamp}
                    price={price} urldomain={urldomain} post_id={post_id}
                    user_name={user_name} upvotes={upvotes} downvotes={downvotes} id={id} pfp={pfp}
                    />
                    })}
                </div>
            </div>
        )
    }
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
