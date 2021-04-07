import {postcollectionProps, PostPropsInt, PostsPropsInt} from '../../TypeScript/App Interfaces' // Post vs PostsPropsInt.
import {getPosts} from '../../Redux/Actions/PostsActions'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PostCard from '../PostCard/PostCard'
import InfiniteScroll from 'react-infinite-scroll-component'

class Timeline extends Component<PostsPropsInt> {

    constructor (props:PostsPropsInt) {
        super(props)
    }

    componentWillMount() {
        this.props.getPosts();
    };

    state = {
        CurrentSlice: 18
    }

    dataLength = (posts:any):number => {
        return posts.length
    }


    render() {
        const { props: { POSTS   }, state: { CurrentSlice } } = this;
        return (
            
                <div className='flex flex-row justify-center w-screen'>
                    {
                        POSTS &&
                            <InfiniteScroll className='flex flex-col items-center w-screen lg:w-2/5 my-10'
                                dataLength={POSTS.length}
                                next={() => {
                                    if (POSTS.length > CurrentSlice) this.setState({ CurrentSlice: CurrentSlice + 18 })
                                }}
                                scrollThreshold={0.80}
                                hasMore={() => { if (POSTS.length > CurrentSlice) return true }}
                                loader={<div> Loading... </div>}
                            >
                                {POSTS && POSTS.map(({title, category, image, url, urldomain, tstamp, price, id, post_id, user_name, upvotes, downvotes}:PostPropsInt&postcollectionProps, i:number) => {
                                    if (i < CurrentSlice) {

                                        return <PostCard key={i} title={title} category={category}
                                        image={image} url={url} urldomain={urldomain}
                                        tstamp={tstamp} price={price}
                                        user_name={user_name} upvotes={upvotes} downvotes={downvotes} id={id} post_id={post_id}
                                        />
                                    }
                                })}
                            </InfiniteScroll>
                    }
                </div>
        )
    }
}

const mapStateToProps = (store:any) => {

    const { PostsState } = store;
    const { POSTS, LOADING } = PostsState;

    return {
        POSTS: POSTS,
        LOADING: LOADING
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getPosts: () => {dispatch(getPosts())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
