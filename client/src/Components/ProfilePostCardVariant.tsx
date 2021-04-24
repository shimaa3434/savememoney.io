import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { profilepostcardProps } from '../TypeScript/App Interfaces'



const ProfilePostCardVariant:React.FC<profilepostcardProps> = ({ upvotes, price, category, user_name, id, image, title }) => {

    const [mouseposition, setMousePosition] = useState<boolean>(false)

    return (
        <Link to={`/users/${user_name}/${id}`} className='w-64 h-64 ' onMouseEnter={ () => { setMousePosition(true) } } onMouseLeave={ () => { setMousePosition(false) }} >
            <div className='w-64 h-64 z-10' >
                {
                    mouseposition &&
                    <div className='w-64 h-64 bg-modalunderlay absolute z-50 flex flex-col items-center justify-center'>
                        <div className='flex flex-row items-center my-2'>
                            <img src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/upvotewhite.svg'} alt='upvote' className='h-8 w-8 mx-2' />
                            <span className='text-white text-2xl'> { upvotes } </span>
                        </div>
                        {/* <div className='flex flex-row items-center my-2'>
                            <img src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/downvotewhite.svg'} alt='downvote' className='h-8 w-8 mx-2' />
                            <span className='text-white text-2xl'> { downvotes } </span>
                        </div> */}
                    </div>
                }
                <img className='z-0 w-64 h-64 object-contain' src={image} alt={`Deal ${title} of category ${category} costs $${price}. It was posted by user ${user_name} and has ${upvotes} upvotes`} />
            </div>
        </Link>
    )
}

export default ProfilePostCardVariant
