import MobileMenuIcon from '../../Media/Images/XCloseIcon.svg'
import './MobileMenu.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

interface MobileMenuProps {
    setShowMenu: Function,
}

const MobileMenu:React.FC<MobileMenuProps> = ({setShowMenu}) => {
    return (
        <div className='mobilemenu'>
            <div className='mobilemenuclose'>
                <img src={MobileMenuIcon} alt='close menu icon' className='mobilemenuclose__image'
                    onClick={() => {
                        setShowMenu(false);
                        document.body.style.overflowY = 'unset';
                    }}
                />
            </div>
        </div>
    )
}

export default MobileMenu
