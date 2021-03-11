import {PostPropsInt, PostsPropsInt} from '../../TypeScript/App Interfaces' // Post vs PostsPropsInt.
import {getPosts} from '../../Redux/Actions/PostsActions'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Post from '../Post/Post'

const Posts:React.FC<PostsPropsInt> = ({LOADING, POSTS, getPosts}) => {
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className=''>
            <div className='flex'>
                <button className='bg-green-500'>Hey</button>
            </div>
            <div className='flex flex-col md:flex-row md:flex-wrap'>

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

const mapStateToProps = (store:any) => {
    return {
        POSTS: store.PostsState.POSTS,
        LOADING: store.PostsState.LOADING
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getPosts: () => {dispatch(getPosts())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
