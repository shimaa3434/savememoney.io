import SearchForm from '../Search/SearchForm'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='w-full flex flex-col items-center bg-hero-pattern h-vh50 justify-center'>

                <h1 className='text-3xl text-center font-bold'>Want to find the best deals for tech products?</h1>
                <p className='text-center'>You've come to the right place.</p>
                <SearchForm />
        </div>
    )
}

export default HeroSection;