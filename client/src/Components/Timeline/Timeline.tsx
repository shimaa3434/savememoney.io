import {postcollectionProps, PostPropsInt, PostsPropsInt} from '../../TypeScript/App Interfaces' // Post vs PostsPropsInt.
import {getPosts} from '../../Redux/Actions/PostsActions'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PostCard from '../PostCard/PostCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

class Timeline extends Component<PostsPropsInt> {

    constructor (props:PostsPropsInt) {
        super(props)
    }

    componentWillMount() {
        this.props.getPosts();
    };

    state = {
        CurrentSlice: 10
    }

    dataLength = (posts:any):number => {
        return posts.length
    }


    render() {
        const { props: { DATA, LOADING }, state: { CurrentSlice } } = this;

        return (
            
                <div className='flex flex-row justify-center w-screen'>
                    <Helmet>
                        <title> Timeline | SaveMeMoney </title>
                    </Helmet>
                    {
                        !LOADING ?
                            <div className='flex flex-row justify-center w-full'>
                                {
                                    DATA &&
                                        <div className='flex flex-row justify-center w-full'>
                                        {
                                            DATA.timelineposts.length > 0 ?
                                        
                                                <InfiniteScroll className='flex flex-col items-center w-screen md:w-screen lg:w-2/5 my-10'
                                                    dataLength={DATA.timelineposts.length}
                                                    next={() => {
                                                        if (DATA.timelineposts.length > CurrentSlice) this.setState({ CurrentSlice: CurrentSlice + 10 })
                                                    }}
                                                    scrollThreshold={0.80}
                                                    hasMore={() => {
                                                        if (DATA.timelineposts.length > CurrentSlice) { return true }
                                                        
                                                    }}
                                                    endMessage={<div>The end!</div>}
                                                    loader={''}
                                                >
                                                
                                                    {DATA.timelineposts.map(({title, category, image, url, urldomain, tstamp, price, id, post_id, user_name, descript, upvotes, downvotes, pfp}:PostPropsInt&postcollectionProps, i:number) => {
                                                        if (i < CurrentSlice) {
                                                            
                                                            return <PostCard key={i} title={title} category={category}
                                                            image={image} url={url} urldomain={urldomain}
                                                            tstamp={tstamp} price={price} pfp={pfp}
                                                            user_name={user_name} upvotes={upvotes} downvotes={downvotes}
                                                            id={id} post_id={post_id} descript={descript}
                                                            />
                                                        }
                                                    })}
                                                </InfiniteScroll>
                                            :
                                                <div className='flex flex-col items-center my-10'>
                                                    <span className='text-center'>You have no timeline. <br/> Visit the trending page and follow users!</span>
                                                    <Link to='/trending' className='px-4 py-2 my-4 rounded bg-blue-600 text-white' >
                                                        See trending
                                                    </Link>
                                                </div>
                                        }
                                        </div>
                                }
                            </div>
                            :
                            <img src={'https://savememoneypfp.s3.us-east-2.amazonaws.com/loader.svg'} className='h-32 w-32 m-4' alt='' />
                    }
                </div>
        )
    }
}

const mapStateToProps = (store:any) => {

    const { PostsState } = store;
    const { DATA, LOADING } = PostsState;

    return {
        DATA, LOADING
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getPosts: () => {dispatch(getPosts())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)