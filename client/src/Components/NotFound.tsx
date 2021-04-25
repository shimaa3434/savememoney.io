import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <Helmet>
                <title> Not Found | SaveMeMoney </title>
            </Helmet>
            <h1 className='text-2xl font-bold'>This user, post, or link is not available or valid.</h1>
            <Link to='/' className='rounded bg-blue-600 px-8 py-2 text-white text-2xl my-6'>
                Go Home
            </Link>
        </div>
    )
}

export default NotFound
