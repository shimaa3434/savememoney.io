import {PostPropsInt, PostsPropsInt} from '../../TypeScript/App Interfaces' // Post vs PostsPropsInt.
import {getPosts} from '../../Redux/Actions/PostsActions'
import React, {Component, useEffect} from 'react'
import {connect} from 'react-redux'
import Post from '../Post/Post'

class Posts extends Component<PostsPropsInt> {

    constructor (props:PostsPropsInt) {
        super(props)
    }

    componentWillMount() {
        this.props.getPosts();
    }


    render() {
        const { POSTS } = this.props;
        return (
                <div className=''>
                <div className='flex flex-row w-screen'>
                    <h1>Newest deals</h1>
                </div>
                <div className='flex flex-col md:flex-row md:flex-wrap justify-center'>

                {POSTS && POSTS.map((post:PostPropsInt, i:number) => {
                    const {title, category, image, url, urldomain, tstamp, price} = post;
                    return <Post key={i} title={title} category={category}
                    image={image} url={url} urldomain={urldomain}
                    tstamp={tstamp} price={price} />
                })}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
