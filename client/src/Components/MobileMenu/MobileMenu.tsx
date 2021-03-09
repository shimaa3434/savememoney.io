import {MobileMenuProps} from '../../TypeScript/App Interfaces';
import MobileMenuIcon from '../../Media/Images/XCloseIcon.svg';
import {Link} from 'react-router-dom';
import React from 'react';

const MobileMenu:React.FC<MobileMenuProps> = ({setShowMenu}) => {
    return (
        <div className='flex flex-column absolute h-full w-full z-10 top-0 bg-coolwhite'>
            <div className='flex flex-row justify-end items-center'>
                <img src={MobileMenuIcon} alt='close menu icon' className='h-12 w-12 m-3'
                    onClick={() => {
                        setShowMenu(false);
                        document.body.style.overflowY = 'unset';
                    }}
                />
            </div>
            <div className='flex flex-col w-screen'>
                <ul className='flex flex-col p-0 m-0 list-none items-center w-screen'>
                    <Link to='/' className='py-2 no-underline text-seagreen border-b-2 border-white border-opacity-25 text-2xl first:border-t-2 first:border-white first:border-opacity-25' onClick={() => {
                        setShowMenu(false);
                        document.body.style.overflowY='unset';
                    }}>
                        HOME
                    </Link>
                    <Link to='/categories' className='py-2 no-underline text-seagreen border-b-2 border-white border-opacity-25 text-2xl' onClick={() => {
                        setShowMenu(false);
                        document.body.style.overflowY='unset';
                    }}>
                        CATEGORIES
                    </Link>
                    <Link to='/search' className='py-2 no-underline text-seagreen  border-b-2 border-white border-opacity-25 text-2xl' onClick={() => {
                        setShowMenu(false);
                        document.body.style.overflowY='unset';
                    }}>
                        SEARCH
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;