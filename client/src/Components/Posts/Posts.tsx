import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../../Redux/Actions/PostsActions'
import Post from '../Post/Post'

interface PostsInt {
    postid?: string, title: string,
    category: string, image: string,
    url: string, urldomain: string,
    tstamp: number, price: string
}

interface Props {
    LOADING: boolean, POSTS: null | Array<PostsInt>, getPosts: Function
}


const Posts:React.FC<Props> = ({LOADING, POSTS, getPosts}) => {

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className=''>
            <div className='flex'>
                <button className='bg-green-500'>Hey</button>
            </div>
            <>
            {POSTS && POSTS.map((post:PostsInt, i:number) => {
                const {title, category, image, url, urldomain, tstamp, price} = post;
                return <Post key={i} title={title} category={category}
                image={image} url={url} urldomain={urldomain}
                tstamp={tstamp} price={price} />
            })}
            </>
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
