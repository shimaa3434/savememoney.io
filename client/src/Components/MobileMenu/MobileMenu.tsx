import {MobileMenuProps} from '../../TypeScript/App Interfaces';
import {Link} from 'react-router-dom';
import React from 'react';
import Modal from '../Modal/Modal';

const MobileMenu:React.FC<MobileMenuProps> = ({setShowMenu, showMenu, LOGGEDIN, LogoutUser}) => {
    return (


        <Modal toggleModal={setShowMenu} toggleStatus={showMenu}>
                <ul className='flex flex-col p-0 m-0 list-none items-center w-full h-full bg-white'>
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
                                Settings
                            </Link>
                    }
                    {
                        LOGGEDIN && 
                            <Link to='/upvoted' className='py-4 w-full text-center no-underline text-black  border-b-2 border-white border-opacity-25 text-2xl' onClick={() => {
                                setShowMenu(false);
                                document.body.style.overflowY='unset';
                            }}>
                                Upvoted
                            </Link>
                    }
                    {LOGGEDIN && 
        
                        <Link to='/' className='py-4 w-full text-center no-underline text-black  border-b-2 border-grey-400 border-opacity-50 text-2xl' onClick={() => {
                            LogoutUser();
                            setShowMenu(false);
                            document.body.style.overflowY='unset';
                        }}>
                            Log out
                        </Link>
                    }
                </ul>
        </Modal>
    );
};

export default MobileMenu;