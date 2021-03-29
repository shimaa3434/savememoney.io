import SearchForm from '../Search/SearchForm'
import React from 'react'
import { Select } from '@material-ui/core'

const HeroSection = () => {



    return (
        <div className='w-full flex flex-col items-center bg-white h-vh50 justify-center'>
                <h1 className='text-3xl text-center font-bold text-black'>Want to find the best deals for tech products?</h1>
                <p className='text-center text-black my-6'>You've come to the right place.</p>
                <SearchForm />
        </div>
    )
}

export default HeroSection;