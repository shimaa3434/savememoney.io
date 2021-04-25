import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import ProfilePostCardVariant from './ProfilePostCardVariant';

const Trending = () => {
    
    const [ trendingposts, setTrendingPosts ] = useState<null|any[]>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const getTrending = async () => {
        setLoading(true)
        await axios.get('/api/posts/trending')
        .then(( { data: { status, trendingposts } } ) => {
            if (status === 210) { setTrendingPosts( trendingposts ); setLoading( false ) }
        })
    }

    useEffect( () => { getTrending() }, [  ] )
    return (
        <div className='w-screen flex flex-col items-center'>
            <Helmet>
                <title> Trending Posts | SaveMeMoney </title>
            </Helmet>
            <div className='w-screen h-screen flex flex-col items-center lg:w-1/2'>
                {
                    !loading ?
                <div className='w-full items-center flex flex-col'>
                    <span className='text-black font-bold text-xl my-6'> Trending Posts </span>
                        { trendingposts &&
                            <div className='flex flex-col md:grid md:grid-cols-3 w-full items-center my-10'>
                                {  trendingposts.map( ({ title, upvotes, price, category, user_name, id, image, tstamp }, i:number) => {
                                    return <ProfilePostCardVariant
                                        title={ title } upvotes={ upvotes } price={ price }
                                        category={ category } user_name={ user_name }
                                        id={ id } tstamp={ tstamp } image={ image }
                                    />
                                }) }
                            </div>
                        }
                </div>
                :
                <div className='items-center flex flex-col w-full'>
                    <img src={'https://savememoneypfp.s3.us-east-2.amazonaws.com/loader.svg'} className='h-32 w-32 m-4' alt='' />
                </div>
                }
        </div>
        </div>
    )
}

export default Trending
