import React from 'react'
import HyperLinkChainIcon from '../../Media/Images/noimagelink.svg'
import {Link} from 'react-router-dom';

interface PostProps {
    postid?: string, title: string,
    category: string, image: string,
    url: string, urldomain: string,
    tstamp: number, price: string
}

const Post:React.FC<PostProps> = ({postid, title, category, image, url, urldomain, tstamp, price}) => {
    
    const setCategoryColor = (category:string) => {
        if (category === 'CPU') return 'bg-blue-400 text-white px-2 py-1 rounded'
        if (category === 'EXPIRED') return 'bg-black text-white px-2 py-1 rounded'
        if (category === 'PSU') return 'bg-red-400 text-white px-2 py-1 rounded'
        if (category === 'Monitor') return 'bg-purple-400 text-white px-2 py-1 rounded'
        if (category === 'Prebuilt') return 'bg-green-400 text-white px-2 py-1 rounded'
        if (category === 'Motherboard') return 'bg-yellow-400 text-white px-2 py-1 rounded'
        if (category === 'Keyboard') return 'bg-red-700 text-white px-2 py-1 rounded'
        if (category === 'Cooler') return 'bg-yellow-700 text-white px-2 py-1 rounded'
        if (category === 'HDD') return 'bg-green-700 text-white px-2 py-1 rounded'
        if (category === 'Mouse') return 'bg-blue-700 text-white px-2 py-1 rounded'
        if (category === 'Cables') return 'bg-purple-700 text-white px-2 py-1 rounded'
        if (category === 'Other') return 'bg-gray-400 text-white px-2 py-1 rounded'
        if (category === 'SSD - M.2') return 'bg-gray-600 text-white px-2 py-1 rounded'
    }

    return (
        <div className='flex flex-column w-screen items-center my-4 py-4 border'>
            {
            image === 'false' ? 
            <a className='items-center flex flex-column border w-1/2 rounded' href={url}>
                <img className='object-cover rounded' src={HyperLinkChainIcon} alt={`NO IMAGE --- ${title} on domain ${urldomain}`}/>
            </a>
            :
            <a className='items-center flex flex-column border w-1/2 rounded' href={url}>
                <img className='object-cover rounded' src={image} alt={`${title} on domain ${urldomain}`}/>
            </a>
            }
            {category !== 'EXPIRED' ?
            <Link className='no-underline my-4 py-0' to={`/categories/${category.toLowerCase()}`}>
                <span className={`${setCategoryColor(category)}`}>{category}</span>
            </Link>
            :
            <span className={`${setCategoryColor(category)} my-4`}>{category}</span>
            }
            <a href={url} className='text-sm w-3/4'>{title}</a>
        </div>
    )
}

export default Post
