import {MobileMenuProps} from '../../TypeScript/App Interfaces';
import MobileMenuIcon from '../../Media/Images/XCloseIcon.svg';
import {Link} from 'react-router-dom';
import React from 'react';
import Modal from '../Modal/Modal';

const MobileMenu:React.FC<MobileMenuProps> = ({setShowMenu, showMenu, LOGGEDIN, LogoutUser}) => {
    return (


        <Modal toggleModal={setShowMenu} toggleStatus={showMenu}>
                <ul className='flex flex-col p-0 m-0 list-none items-center w-full h-full bg-white'>
                    <Link to='/' className='py-4 w-full text-center no-underline text-black border-b-2 border-grey-400 border-opacity-50 text-2xl first:border-t-2 first:border-white first:border-opacity-25' onClick={() => {
                        setShowMenu(false);
                        document.body.style.overflowY='unset';
                    }}>
                        HOME
                    </Link>
                    <Link to='/categories' className='py-4 w-full text-center no-underline text-black border-b-2 border-grey-400 border-opacity-50 text-2xl' onClick={() => {
                        setShowMenu(false);
                        document.body.style.overflowY='unset';
                    }}>
                        CATEGORIES
                    </Link>
                    <Link to='/search' className='py-4 w-full text-center no-underline text-black  border-b-2 border-grey-400 border-opacity-50 text-2xl' onClick={() => {
                        setShowMenu(false);
                        document.body.style.overflowY='unset';
                    }}>
                        SEARCH
                    </Link>
                    {LOGGEDIN ? 

                    <Link to='/' className='py-4 w-full text-center no-underline text-black  border-b-2 border-grey-400 border-opacity-50 text-2xl' onClick={() => {
                            LogoutUser();
                            setShowMenu(false);
                            document.body.style.overflowY='unset';
                        }}>
                        LOG OUT
                    </Link>

                    :

                    <Link to='/login' className='py-4 w-full text-center no-underline text-black  border-b-2 border-white border-opacity-25 text-2xl' onClick={() => {
                            setShowMenu(false);
                            document.body.style.overflowY='unset';
                        }}>
                        LOG IN
                    </Link>
                    }
                    {!LOGGEDIN &&

                    <Link to='/register' className='py-4 w-full text-center no-underline text-black  border-b-2 border-white border-opacity-25 text-2xl' onClick={() => {
                            setShowMenu(false);
                            document.body.style.overflowY='unset';
                        }}>
                        SIGN UP
                    </Link>
                    }
                    {
                        LOGGEDIN && 
                            <Link to='/settings' className='py-4 w-full text-center no-underline text-black  border-b-2 border-white border-opacity-25 text-2xl' onClick={() => {
                                setShowMenu(false);
                                document.body.style.overflowY='unset';
                            }}>
                                SETTINGS
                            </Link>
                    }
                    {
                        LOGGEDIN && 
                            <Link to='/createpost' className='py-4 w-full text-center no-underline text-black  border-b-2 border-white border-opacity-25 text-2xl' onClick={() => {
                                setShowMenu(false);
                                document.body.style.overflowY='unset';
                            }}>
                                CREATE POST
                            </Link>
                    }
                </ul>
        </Modal>
    );
};

export default MobileMenu;