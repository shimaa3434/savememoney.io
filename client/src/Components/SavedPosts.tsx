import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postcollectionProps } from '../TypeScript/App Interfaces'
import PostCard from './PostCard/PostCard'
import Post from './PostCard/PostCard'




const SavedPosts = () => {

    const [posts, setPosts] = useState<postcollectionProps[]>([])
    const fetchSavedPosts = async () => {
        await axios.get('/api/users/savedposts')
        .then(({ data })=> setPosts(data)) 
    }

    useEffect(() => {
        fetchSavedPosts()
    }, [])

    return (
        <div>
            {posts.length > 0 &&
                posts.map(({ upvotes, downvotes, user_name, image, post_id, tstamp, category, id}, i:number) => {
                    return  <Link to={`/users/${user_name}/${post_id}`}>
                                <PostCard image={image} tstamp={tstamp} category={category} post_id={post_id} user_name={user_name} upvotes={upvotes} downvotes={downvotes} id={id} />
                            </Link>
                })
            }
        </div>
    )
}

export default SavedPosts
