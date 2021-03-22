import {GetSearch, setSearchInput, setSearchCategory, setSearchPriceRange} from '../../Redux/Actions/SearchActions'
import {PostPropsInt, SearchPropsInt} from '../../TypeScript/App Interfaces'
import { Component } from 'react';
import SearchForm from './SearchForm';
import {connect} from 'react-redux';
import Post from '../Post/Post';

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
