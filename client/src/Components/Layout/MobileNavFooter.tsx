import React from 'react'
import { Link } from 'react-router-dom'


const MobileNavFooter:React.FC<{ LOGGEDINUSERNAME:string|null, LOGGEDINPFP:string }> = ({ LOGGEDINPFP, LOGGEDINUSERNAME }) => {
    return (
        <div className='w-screen h-14 bottom-0 fixed z-50 flex flex-row justify-center md:hidden'>
                        <div className='bg-white border-t-2 border-black flex flex-row items-center justify-around w-full h-14 md'>
                            <Link to='/' className='w-1/5 text-center flex flex-col items-center justify-center'>
                                <img className='h-8' src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/HomeIcon.svg'} alt='' />
                            </Link>
                            <Link to='/search' className='w-1/5 text-center flex flex-col items-center justify-center'>
                                <img className='h-8' src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/SearchIcon.svg'} alt='' />
                            </Link>
                            <Link to='/createpost' className='w-1/5 text-center flex flex-col items-center justify-center'>
                                <img className='h-8' src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/PlusIcon.svg'} alt='' />
                            </Link>
                            <Link to='/trending' className='w-1/5 text-center flex flex-col items-center justify-center'>
                                <img className='h-8' src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/ExploreIcon.svg'} alt='' />
                            </Link>
                            <Link to={`/users/${LOGGEDINUSERNAME}`} className='w-1/5 text-center flex flex-col items-center justify-center'>
                                <img className='rounded-full border-2 border-blue-600 h-8 w-8' src={LOGGEDINPFP} alt='' />
                            </Link>
                        </div>
                    </div>
    )
}

export default MobileNavFooter
