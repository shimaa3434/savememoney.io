import MobileMenu from '../../MobileMenu/MobileMenu';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { connect } from 'react-redux';
import { LogoutUser } from '../../../Redux/Actions/UserActions';

import SearchForm from '../../Search/SearchForm';
import Modal from 'react-modal';

const Header:React.FC<{ LOGGEDINPFP:string, LOGGEDIN:boolean, LogoutUser:Function, LOGGEDINUSERNAME:string }> = ({ LogoutUser, LOGGEDIN, LOGGEDINPFP, LOGGEDINUSERNAME }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showLoggedInUserProfileMenu, setShowLoggedInUserProfileMenu] = useState<boolean>(false);

    return (
        <div className=''>
            <div className='w-screen h-20 flex flex-row justify-between items-center bg-white border-b-2 border-lightgrey md:justify-around'>
                <Link to='/' className='no-underline text-black text-xl flex flex-row font-bold justify-center mx-4 lg:mx-0 lg:w-2/5'>
                    savememoney!
                </Link>
                <div className='w-1/5 hidden md:flex'>
                    <SearchForm styles='flex flex-row md:hidden lg:flex lg:flex-row' />
                </div>
                <img className='w-10 h-10 mx-4 md:hidden' src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/MobileMenuIconBlack.svg'} alt='mobile navigation menu icon' onClick={() => {
                    setShowMenu(true);
                    document.body.style.overflowY = 'hidden';
                }} />
                <ul className='hidden py-0 px-0 mx-0 my-0 md:flex items-center justify-center lg:w-2/5'>
                    {
                        LOGGEDIN &&
                            <div className='relative flex flex-row items-center'>
                                <Link to='/' className='flex flex-row items-center'>
                                    <img src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/HomeIcon.svg'} alt='' className='h-10 w-10 mr-6' />
                                </Link>
                                <Link to='/search' className='hidden md:flex md:flex-row lg:hidden items-center'>
                                    <img src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/SearchIcon.svg'} alt='' className='h-12 w-12 mr-6' />
                                </Link>
                                <Link to='/createpost' className='flex flex-row items-center'>
                                    <img src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/PlusIcon.svg'} alt='' className='h-10 w-10 mr-6' />
                                </Link>
                                <Link to='/trending' className='flex flex-row items-center'>
                                    <img src={'https://savememoneysitewideimages.s3.us-east-2.amazonaws.com/ExploreIcon.svg'} alt='' className='h-12 w-12 mr-6' />
                                </Link>
                                <div className='h-12 w-12 rounded-full relative cursor-pointer' onClick={() => { setShowLoggedInUserProfileMenu(true) }}>
                                    {
                                        !LOGGEDINPFP ?
                                        <img src={'https://savememoneypfp.s3.us-east-2.amazonaws.com/loader.svg'} alt={``}  className='h-12 w-12 rounded-full focus:outline-black'  />
                                        :
                                        <img src={LOGGEDINPFP} alt={''}  className='h-12 w-12 rounded-full border-2 border-blue-600'  />
                                    }
                                </div>
                                {
                                    showLoggedInUserProfileMenu &&
                                    <Modal isOpen={showLoggedInUserProfileMenu} onRequestClose={() => { setShowLoggedInUserProfileMenu(false) }} shouldCloseOnOverlayClick={true}
                                    overlayClassName='top-0 left-0 right-0 bottom-0 absolute w-screen h-screen bg-clearmodalunderlay z-10'
                                    className='top-20 h-1/6 w-1/6 mr-50 md:right-12 lg:right-40 lg:right xl:right-48 2xl:right-64 3xl:right-32 bg-white fixed z-20  rounded-xl flex flex-col items-center'
                                    >
                                        <div className='flex flex-col items-center w-full h-full pb-2 outline-none focus:outline-none'>
                                            <Link to={`/users/${LOGGEDINUSERNAME}`} className='py-2 w-full text-center items-center flex flex-row justify-center' onClick={() => { setShowLoggedInUserProfileMenu(false) }}>
                                                Profile
                                            </Link>
                                            <Link to='/settings' className='py-2 w-full text-center items-center flex flex-row justify-center' onClick={() => { setShowLoggedInUserProfileMenu(false) }}>
                                                Settings
                                            </Link>
                                            <Link to='/upvoted' className='py-2 w-full text-center items-center flex flex-row justify-center' onClick={() => { setShowLoggedInUserProfileMenu(false) }}>
                                                Upvoted
                                            </Link>
                                            <Link to='/login' className='py-2 text-center items-center flex flex-row justify-center' onClick={() => { setShowLoggedInUserProfileMenu(false); LogoutUser(); }}>
                                                Logout
                                            </Link>
                                        </div>

                                    </Modal>
                                }
                            </div>
                    }
                </ul>
                {showMenu && <MobileMenu setShowMenu={setShowMenu} showMenu={showMenu} LOGGEDIN={LOGGEDIN} LogoutUser={LogoutUser} />}
                </div>
            </div>
    );
}

const mapStateToProps = (store:any) => {
    const { UserState } = store;
    const { LOGGEDIN, LOGGEDINPFP, LOGGEDINUSERNAME } = UserState;
    return { LOGGEDIN, LOGGEDINPFP, LOGGEDINUSERNAME }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        LogoutUser: () => {dispatch(LogoutUser())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
