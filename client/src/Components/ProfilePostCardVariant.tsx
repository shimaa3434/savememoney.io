import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { profilepostcardProps } from '../TypeScript/App Interfaces'



const ProfilePostCardVariant:React.FC<profilepostcardProps> = ({ upvotes, downvotes, price, category, user_name, id, image, title }) => {

    const [mouseposition, setMousePosition] = useState<boolean>(false)

    return (
        <Link to={`/users/${user_name}/${id}`} className='w-full h-full ' onMouseEnter={ () => { setMousePosition(true) } } onMouseLeave={ () => { setMousePosition(false) }} >
            <div className='w-full h-full z-0' >
                {
                    mouseposition &&
                    <div className='w-50 h-full bg-modalunderlay absolute z-50'>
                        <span>{upvotes}</span>
                        <span>{downvotes}</span>
                    </div>
                }
                <img className='z-0 w-full h-full object-contain' src={image} alt={`Deal ${title} of category ${category} costs $${price}. It was posted by user ${user_name} and has ${upvotes} upvotes and ${downvotes} downvotes.`} />
            </div>

        </Link>
    )
}

export default ProfilePostCardVariant
