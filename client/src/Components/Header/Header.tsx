import MobileMenuIcon from '../../Media/Images/MobileMenuIcon.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap'
import React, {useState} from 'react'
import './Header.css'
import MobileMenu from '../MobileMenu/MobileMenu';
import {Link as RouterLink} from 'react-router-dom'

const Header = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <>
            <Navbar bg="primary" variant="dark" className='navbar'>
                <RouterLink to='/'>
                    <Navbar.Brand className='navbar__brand'>buildapcdeals</Navbar.Brand>
                </RouterLink>
                <img src={MobileMenuIcon} alt='mobile navigation menu icon' className='navbar__mobilemenuicon' onClick={() => {
                    setShowMenu(true);
                    document.body.style.overflowY = 'hidden';
                }} />
                <Nav className='nav'>
                    <Nav.Link className='nav__link'>Hey</Nav.Link>
                    <Nav.Link className='nav__link'>Hey</Nav.Link>
                </Nav>
                {showMenu && <MobileMenu setShowMenu={setShowMenu} />}
            </Navbar>
        </>
    )
}

export default Header
