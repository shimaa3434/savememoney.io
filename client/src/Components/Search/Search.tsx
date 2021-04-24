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

        const { DATA, LOADING } = this.props;
        
        return (
            <div className='flex flex-col w-screen items-center'>
                <SearchForm styles='w-4/5 flex flex-row items-center md:hidden my-4' />
                <div className='flex flex-row justify-center w-screen'>
                    <div className='flex flex-col items-center w-screen lg:w-2/5 my-10'>
                        {
                            !LOADING ?
                                <div className='flex flex-col items-center w-full'>
                                    {DATA && DATA.length > 0 ?

                                        DATA.map(({title, category, image, url, urldomain, tstamp, price, post_id, user_name, upvotes, downvotes, descript, id, pfp}:PostPropsInt&postcollectionProps, i:number) => {
                                            return <PostCard
                                            title={title} category={category} image={image} url={url} tstamp={tstamp}
                                            price={price} urldomain={urldomain} post_id={post_id}
                                            user_name={user_name} upvotes={upvotes} downvotes={downvotes} id={id} pfp={pfp} descript={descript}
                                            />
                                        })
                                        :
                                        <div>No results, make a search!</div>
                                    }
                                </div>
                                :
                                <img src={'https://savememoneypfp.s3.us-east-2.amazonaws.com/loader.svg'} className='h-32 w-32 m-4' alt='' />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    const { SearchState: { DATA, LOADING, INPUT } } = state;
    return {
        DATA, LOADING, INPUT
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
