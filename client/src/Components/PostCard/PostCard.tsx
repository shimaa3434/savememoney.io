import HyperLinkChainIcon from '../../Media/Images/noimagelink.svg'
import {postcollectionProps, PostPropsInt} from '../../TypeScript/App Interfaces'
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import axios from 'axios';

const Post:React.FC<PostPropsInt & postcollectionProps> = ({postid, title, category, image, url, urldomain, tstamp, price, id,    upvotes, downvotes, post_id, user_name     }) => {

    const [savedstatus, setSavedStatus] = useState<boolean>(false);

    // ADD POSTS STATUS PER 

    const savePost = async (id:number, post_user_name:string, ) => {
        console.log(id)
        await axios.post('/api/posts/save', { post_id: id, post_user_name })
        .then(({ data: { redirecturl, err, status } }) => {
            if (status === 210) setSavedStatus(true);
        })
    }

    const unsavePost = async (post_id:number, post_user_name:string, ) => {
        await axios.post('/api/posts/unsave', { post_id: id, post_user_name })
        .then(({ data: { redirecturl, err, status } }) => {
            if (status === 210) setSavedStatus(false);
        })
    }
    
    const setCategoryColor = (category:string) => {
        if (category === 'CPU') return 'bg-blue-400 text-white px-2 py-1 rounded'
        if (category === 'EXPIRED') return 'bg-black text-white px-2 py-1 rounded'
        if (category === 'PSU') return 'bg-red-400 text-white px-2 py-1 rounded'
        if (category === 'Monitor') return 'bg-purple-400 text-white px-2 py-1 rounded'
        if (category === 'Prebuilt') return 'bg-green-400 text-white px-2 py-1 rounded'
        if (category === 'Motherboard') return 'bg-yellow-500 text-white px-2 py-1 rounded'
        if (category === 'Keyboard') return 'bg-red-700 text-white px-2 py-1 rounded'
        if (category === 'Cooler') return 'bg-yellow-700 text-white px-2 py-1 rounded'
        if (category === 'HDD') return 'bg-green-700 text-white px-2 py-1 rounded'
        if (category === 'Mouse') return 'bg-blue-700 text-white px-2 py-1 rounded'
        if (category === 'Cables') return 'bg-purple-700 text-white px-2 py-1 rounded'
        if (category === 'Other') return 'bg-gray-400 text-white px-2 py-1 rounded'
        if (category === 'SSD - M.2') return 'bg-gray-600 text-white px-2 py-1 rounded'
        if (category === 'Fan') return 'bg-darkblue text-white px-2 py-1 rounded'
        if (category === 'RAM') return 'bg-lighterblue text-white px-2 py-1 rounded'
        if (category === 'Speakers') return 'bg-pink-400 text-white px-2 py-1 rounded'
        if (category === 'SSD - SATA') return 'bg-junglegreen text-white px-2 py-1 rounded'
        if (category === 'Case') return 'bg-pink-700 text-white px-2 py-1 rounded'
        if (category === 'GPU') return 'bg-indigo-500 text-white px-2 py-1 rounded'
        if (category === 'Bundle') return 'bg-darksand text-white px-2 py-1 rounded'
        if (category === 'Controller') return 'bg-wine text-white px-2 py-1 rounded'
        if (category === 'Mouse Pad') return 'bg-diarrheagreen text-white px-2 py-1 rounded'
        if (category === 'Webcam') return 'bg-tangerine text-white px-2 py-1 rounded'
        if (category === 'Headphones') return 'bg-skyblue text-white px-2 py-1 rounded'
    }

    return (
        <div className='flex flex-col w-screen items-center my-4 py-4 border lg:w-1/4'>
            {
            image === 'false' || image === '0' ? 
            <a className='flex flex-col items-center w-1/2 h-36 rounded' href={url}>
                <img className='object-contain rounded h-full' src={HyperLinkChainIcon} alt={`NO IMAGE --- ${title} on domain ${urldomain}`}/>
            </a>
            :
            <a className='flex flex-col items-center w-1/2 h-36 rounded' href={url}>
                <img className='object-contain rounded h-full' src={image} alt={`${title} on domain ${urldomain}`}/>
            </a>
            }
            {category !== 'EXPIRED' ?
            <Link className='no-underline my-4 py-0' to={`/categories/${category.toLowerCase()}`}>
                <span className={`${setCategoryColor(category)} text-center`}>{category}</span>
            </Link>
            :
            <span className={`${setCategoryColor(category)} my-4 text-center`}>{category}</span>
            }
            <a href={url} className='text-sm w-3/4 text-center'>{title}</a>
            <button className='bg-purple-500 ring-4 px-4 my-2 text-white' onClick={() => {
                savedstatus ? unsavePost(id, user_name) : savePost(id, user_name)
            }}>
                {savedstatus ?
                    'unsave'
                    :
                    'save'
                }
            </button>
        </div>
    )
}

export default Post;
