import HyperLinkChainIcon from '../../Media/Images/noimagelink.svg'
import {postcollectionProps, PostPropsInt} from '../../TypeScript/App Interfaces'
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import PostSettingsIcon from '../../Media/Images/postsettings.svg'
import Modal from 'react-modal'
import UnsavedPostIcon from '../../Media/Images/unsavedposticon.svg'
import SavedPostIcon from '../../Media/Images/savedposticon.svg'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const PostCard:React.FC<PostPropsInt & postcollectionProps> = ({postid, title, category, image, url, urldomain, tstamp, price, id,    upvotes, downvotes, post_id, user_name, pfp     }) => {

    const [savedstatus, setSavedStatus] = useState<boolean>(false);

    // ADD POSTS STATUS PER 

    const savePost = async (id:number, post_user_name:string, ) => {
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

    const [ postOptionsModalStatus, setPostOptionsModalStatus ] = useState<boolean>(false)
    
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
        <div className='flex flex-col w-screen items-center my-10 rounded border-b-2 border-lightgrey lg:w-full lg:border-2 lg:border-lightgrey lg:mb-20'>
            <div className='w-full h-16 flex flex-row justify-between items-center border-b-2 border-t-2 border-lightgrey'>
                <div className='flex flex-row justify-start items-center h-full w-3/4 lg:w-3/5 '>
                    <Link to={`/users/${user_name}`}>
                        <img className='h-12 w-12 rounded-full ml-4' src={pfp} alt={`${user_name}'s profile picture image.`} />
                    </Link>
                    <Link to={`/users/${user_name}`} className='font-bold mx-4'>
                        {user_name}
                    </Link>
                    {category !== 'EXPIRED' ?
                        <Link className='no-underline my-4 py-0' to={`/categories/${category.toLowerCase()}`}>
                            <span className={`${setCategoryColor(category)} text-center`}>{category || <SkeletonTheme> <Skeleton /> </SkeletonTheme>}</span>
                        </Link>
                        :
                        <span className={`${setCategoryColor(category)} my-4 text-center`}>{category || <SkeletonTheme><Skeleton /></SkeletonTheme> }</span>
                    }
                </div>
                <div className='flex flex-row justify-center items-center h-full px-4'>
                    <img className='h-1/2 cursor-pointer' src={PostSettingsIcon} alt='settings icon' onClick={() => { setPostOptionsModalStatus(true); document.body.style.overflowY = 'hidden'}} />
                </div>
            </div>
            <div className='flex flex-col items-center justify-center w-full lg:h-vh50 lg:border-b-2 lg:border-t-2 lg:border-lightgrey '>

            {
                image === 'false' || image === '0' ? 
                <img className='object-contain lg:h-3/4 lg:w-3/4 h-4/5 w-4/5' src={HyperLinkChainIcon} alt={`NO IMAGE --- ${title} on domain ${urldomain}`}/>
            :
                <img className='object-contain lg:h-3/4 lg:w-3/4 h-4/5 w-4/5' src={image} alt={`${title} on domain ${urldomain}`}/>
            }
                <a href={url} className='text-sm w-full text-center mx-0 my-2 p-0 lg:w-3/4 '>{title || <SkeletonTheme><Skeleton /></SkeletonTheme>}</a>
                <span>{price || <SkeletonTheme><Skeleton /></SkeletonTheme>}</span>
            </div>
            <div className='flex flex-col h-vh25'>
                
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

            { postOptionsModalStatus &&
                <Modal isOpen={postOptionsModalStatus} onRequestClose={()=> { setPostOptionsModalStatus(false); document.body.style.overflowY = 'unset' }}
                    shouldCloseOnOverlayClick={true} overlayClassName={'flex flex-row justify-center fixed items-center h-screen w-screen z-10 bg-modalunderlay top-0 left-0 right-0 bottom-0'}
                    className={'w-4/5 h-2/5 rounded-lg bg-white outline-none flex flex-col items-center lg:w-1/5 lg:h-2/4 py-2'}
                >
                    <ul className='list-style-none flex flex-col items-center m-0 p-0 w-full'>

                        <li className='w-full py-2 text-center'>
                            Report
                        </li>
                        <li className='w-full py-2 text-center' onClick={() => {
                            savePost(id, user_name)// add unsave too later
                            document.body.style.overflowY = 'unset';
                        }}>
                            Save post
                        </li>
                        <Link to={`/users/${user_name}/${id}`} className='w-full py-2 text-center'>
                            Go to post
                        </Link>
                    </ul>
                </Modal>
            }
        </div>
    )
}

export default PostCard;
