import HeroSection from './HeroSection'
import Posts from '../Posts/Posts';
import React from 'react'

const Home = () => {
    return (
        <div className='flex flex-col items-center w-screen bg-white'>
            <HeroSection />
            <Posts />
        </div>
    )
}

export default Home;
