import React from 'react'
import { followaccountlistitemProps } from '../../TypeScript/App Interfaces'
import { Link } from 'react-router-dom'

const FollowAccountListItem:React.FC<followaccountlistitemProps>  = ({ accountusername, namehead, ofaccount, type, pfp, closeModal }) => {
    return (
        <li className='w-full flex flex-row items-center py-2'>
            <Link to={`/users/${accountusername}`} onClick={() => { closeModal(false) }}>

            <img src={pfp}
                alt={`${accountusername} profile picture, ${ type === 'followedbyuser' ? 'a follower of' : 'who is followed by' } ${ofaccount}.`}
                className='mx-4 h-10 w-10 rounded-full border-2 border-blue-600'
                />
            </Link>
                <div className='flex flex-col'>
                <Link to={`/users/${accountusername}`} className='font-bold' onClick={() => { closeModal(false) }}> { accountusername } </Link>
                <span className='text-gray-500'> { namehead } </span>
                </div>
        </li>
    )
}

export default FollowAccountListItem
