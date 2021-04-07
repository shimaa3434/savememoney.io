import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './Layout/Header/Header'
import PostCard from './PostCard/PostCard'


interface userPostProps {
    match: {
        params: {
            user_name:string,
            post_id: string | number
        }
    }
}

const UserPost:React.FC<userPostProps> = ({ match: { params: { user_name, post_id } } }) => {

    const [ post, setPost ] = useState<any>(null)    
    const fetchUserPost = async (user_name:string, post_id:string|number) => {
        console.log(user_name)
        console.log(post_id)
        await axios.get(`/api/users/postlookup/${user_name}/${post_id}`)
        .then(({ data }) => { setPost(data); console.log(data) })
    }

    useEffect(() => {

        fetchUserPost(user_name, post_id);

    }, [ user_name, post_id ])

    return (
        <div>
            <Header />
            {post &&
                <div className='flex flex-row justify-center w-screen'>
                    <div className='flex flex-col items-center w-screen lg:w-2/5 my-10'>
                        <PostCard
                        title={post.title} category={post.category} image={post.image} url={post.url} tstamp={post.tstamp} price={post.price} urldomain={post.urldomain}
                        post_id={post.id} user_name={post.user_name} upvotes={post.upvotes} downvotes={post.downvotes} id={post.id}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default UserPost;
