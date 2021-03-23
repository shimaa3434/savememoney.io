import HyperLinkChainIcon from '../../Media/Images/noimagelink.svg'
import {PostPropsInt} from '../../TypeScript/App Interfaces'
import {Link} from 'react-router-dom';
import React from 'react'

const Post:React.FC<PostPropsInt> = ({postid, title, category, image, url, urldomain, tstamp, price}) => {
    
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
        </div>
    )
}

export default Post;
