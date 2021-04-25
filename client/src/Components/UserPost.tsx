import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router'
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
    const [ status, setStatus ] = useState<number|null>(null)
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const fetchUserPost = async (user_name:string, post_id:string|number) => {
        setLoading(true)
        await axios.get(`/api/users/postlookup/${user_name}/${post_id}`)
        .then(({ data: { post, status } }) => { setPost(post); setStatus(status); setLoading(false); })
    }

    useEffect(() => {
        post && setPost(null);
        fetchUserPost(user_name, post_id);

    }, [ user_name, post_id ])

    return (
        <div className='flex flex-row justify-center w-screen'>
            <Helmet>
                <title> { !post ? 'Loading post...' : `@${user_name}'s Post ${post_id} - ${post.title} for $${post.price} | SaveMeMoney` } </title>
            </Helmet>
            {
                !loading ?
                    <div className='flex flex-row justify-center w-screen'>
                        {
                            status === 210 &&
                            <div className='flex flex-row justify-center w-screen'>
                                { post &&
                                    <div className='flex flex-row justify-center w-screen'>
                                        
                                        <div className='flex flex-col items-center w-screen lg:w-2/5'>
                                            <PostCard
                                            title={post.title} category={post.category} image={post.image} url={post.url} tstamp={post.tstamp} price={post.price} urldomain={post.urldomain}
                                            post_id={post.id} user_name={post.user_name} upvotes={post.upvotes} downvotes={post.downvotes} id={post.id} pfp={post.pfp} descript={post.descript}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        {
                            status === 400 &&
                                <Redirect to='/notfound' />
                        }
                    </div>
                :
                <img src={'https://savememoneypfp.s3.us-east-2.amazonaws.com/loader.svg'} className='h-32 w-32 m-4' alt='' />
            }
        </div>
    )
}

export default UserPost;
