import axios from 'axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { profilepostcardProps } from '../TypeScript/App Interfaces'
import ProfilePostCardVariant from './ProfilePostCardVariant'




const UpvotedPosts = () => {

    const [posts, setPosts] = useState<profilepostcardProps[]|null>(null);
    const [ loading, setLoading ] = useState<boolean>(false)
    const fetchUpvotedPosts = async () => {
        setLoading(true)
        await axios.get('/api/users/upvotedposts')
        .then( ( { data } ) => { setPosts(data); setLoading( false ); }) 
    }

    useEffect(() => {
        fetchUpvotedPosts()
    }, [])

    return (
        <div className='w-screen flex flex-col items-center'>
            <Helmet>
                <title> Upvoted Posts | SaveMeMoney </title>
            </Helmet>
            <div className='w-screen h-screen flex flex-col items-center lg:w-1/2'>
                <span className='text-black font-bold text-xl my-6'> Upvoted Posts </span>
                <div className='flex flex-col items-center w-full'>
                    {
                        !loading ?
                            <div className='flex flex-col items-center w-full'>
                                {
                                    posts &&
                                        <div className='flex flex-col items-center w-full'>
                                            {
                                                posts.length > 0 ?
                                                <div className='flex flex-col md:grid md:grid-cols-3 w-full items-center my-10'>
                                                {
                                                    posts.map(({ category, id, image, price, title, tstamp, upvotes, user_name}, i:number) => {
                                                        return  <Link to={`/users/${user_name}/${id}`}>
                                                                    <ProfilePostCardVariant
                                                                    image={image} tstamp={tstamp} category={category}
                                                                    user_name={user_name} upvotes={upvotes}
                                                                    id={id} price={price} title={title}
                                                                    />
                                                                </Link>
                                                    })
                                                }
                                                </div>
                                                :
                                                <div className='flex flex-col items-center w-full'>
                                                    <span className='text-center'>You have no upvoted posts. <br/> Visit the trending page!</span>
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
            </div>
        </div>
    )
}

export default UpvotedPosts
