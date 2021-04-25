
import {postcollectionProps, PostPropsInt} from '../../TypeScript/App Interfaces'
import {Link} from 'react-router-dom';
import React, {useState} from 'react'
import axios from 'axios';
import Modal from 'react-modal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const PostCard:React.FC<PostPropsInt & postcollectionProps> = ({postid, title, category, image, url, urldomain, tstamp, price, id, descript,    upvotes, downvotes, post_id, user_name, pfp     }) => {

    const [ currentUpvotes, setCurrentUpvotes ] = useState<number>(upvotes);

    const upvotePost = async (id:number, post_user_name:string) => {
        await axios.post('/api/posts/upvote', { post_id: id, post_user_name })
        .then(({ data: { upvotes, downvotes } }) => {
            setCurrentUpvotes(upvotes);
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
        <div className='flex flex-col w-screen items-center my-2 rounded border-b-1 border-lightgrey lg:w-full lg:border-2 lg:border-lightgrey lg:mb-2'>
            <div className='w-full h-16 flex flex-row justify-between items-center border-b-1 border-t-1 border-lightgrey'>
                <div className='flex flex-row justify-start items-center h-full w-3/4 lg:w-3/5 '>
                    <Link to={`/users/${user_name}`}>
                        <img className='h-12 w-12 rounded-full ml-4 object-cover border-2 border-blue-600' src={pfp} alt={`${user_name}'s profile picture image.`} />
                    </Link>
                    <Link to={`/users/${user_name}`} className='font-bold mx-4'>
                        {user_name}
                    </Link>
                    {/* <Link className='no-underline my-4 py-0' to={`/categories/${category.toLowerCase()}`}> </Link> */}
                    {category !== 'EXPIRED' ?
                        <span className={`${setCategoryColor(category)} text-center`}>{category || <SkeletonTheme> <Skeleton /> </SkeletonTheme>}</span>
                        :
                        <span className={`${setCategoryColor(category)} my-4 text-center`}>{category || <SkeletonTheme><Skeleton /></SkeletonTheme> }</span>
                    }
                </div>
                <div className='flex flex-row justify-center items-center h-full px-4'>
                    <img className='h-1/2 cursor-pointer' src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/postsettings.svg'} alt='settings icon' onClick={() => { setPostOptionsModalStatus(true); document.body.style.overflowY = 'hidden'}} />
                </div>
            </div>
            <div className='flex flex-col items-center justify-center w-full lg:h-vh50 lg:border-b-1 lg:border-t-1 lg:border-lightgrey '>
                <img className='object-contain lg:h-3/4 lg:w-3/4 h-4/5 w-4/5 my-4' src={image} alt={`${title} on domain ${urldomain}`}/>
                <a href={url} className='text-sm w-full text-center mx-0 my-2 p-0 lg:w-3/4 '>{title || <SkeletonTheme><Skeleton /></SkeletonTheme>}</a>
                <span>{`$${price}` || <SkeletonTheme><Skeleton /></SkeletonTheme>}</span>
            </div>
            <div className='flex flex-col h-vh25 w-full'>
                <div className='flex flex-row items-center w-full justify-between border-b-1 border-t-1 border-lightgrey px-2 py-4'>
                    <div className='flex flex-row items-center'>
                        <img onClick={() => { upvotePost(id, user_name) }} src='https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/upvote.svg' className='h-8 w-8 mx-2 cursor-pointer' />
                        <span className='mx-2'>{currentUpvotes} </span> {/* | {currentDownvotes} */}
                    </div>
                    <div className='flex flex-row items-center'>
                        <a className='bg-yellow-600 text-white mx-2 px-4 py-2 rounded' href={ url } target='_blank'>
                            CHECK IT OUT
                        </a>
                    </div>
                </div>
                <div className='w-full px-2 py-2 block'>
                    <Link to={`/users/${user_name}`} className='font-bold float-left mr-2'>{user_name}</Link>
                    <span className='w-full'> { descript } </span>
                </div>
            </div>

            { postOptionsModalStatus &&
                <Modal isOpen={postOptionsModalStatus} onRequestClose={()=> { setPostOptionsModalStatus(false); document.body.style.overflowY = 'unset' }}
                    shouldCloseOnOverlayClick={true} overlayClassName={'flex flex-row justify-center fixed items-center h-screen w-screen z-10 bg-modalunderlay top-0 left-0 right-0 bottom-0'}
                    className={'w-4/5 h-1/6 rounded-lg bg-white outline-none flex flex-col items-center lg:w-1/5 lg:h-2/4 py-2'}
                >
                    <ul className='list-style-none flex flex-col items-center m-0 p-0 w-full'>

                        <Link to={`/users/${user_name}/${id}`} className='w-full py-2 text-center' onClick={() => { setPostOptionsModalStatus(false); document.body.style.overflowY = 'unset' }}>
                            Go to post
                        </Link>
                        <li className='w-full py-2 text-center cursor-pointer' onClick={() => { upvotePost(id, user_name); setPostOptionsModalStatus(false); document.body.style.overflowY = 'unset' }}>
                            Upvote Post
                        </li>
                    </ul>
                </Modal>
            }
        </div>
    )
}

export default PostCard;
