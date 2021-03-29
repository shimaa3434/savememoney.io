import {postcollectionProps, PostPropsInt, PostsPropsInt} from '../../TypeScript/App Interfaces' // Post vs PostsPropsInt.
import {getPosts} from '../../Redux/Actions/PostsActions'
import React, {Component, useEffect} from 'react'
import {connect} from 'react-redux'
import Post from '../PostCard/PostCard'

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

                </div>
                <div className='flex flex-col md:flex-row md:flex-wrap justify-center'>

                {POSTS && POSTS.map(({title, category, image, url, urldomain, tstamp, price, id, post_id, user_name, upvotes, downvotes}:PostPropsInt&postcollectionProps, i:number) => {

                    return <Post key={i} title={title} category={category}
                    image={image} url={url} urldomain={urldomain}
                    tstamp={tstamp} price={price}
                    user_name={user_name} upvotes={upvotes} downvotes={downvotes} id={id} post_id={post_id}
                    />
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
