import MobileMenuIcon from '../../../Media/Images/MobileMenuIcon.svg';
import MobileMenu from '../../MobileMenu/MobileMenu';
import {Link} from 'react-router-dom';
import {useState} from 'react';

const Header = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <>
            <div className='w-screen h-20 flex flex-row justify-between items-center px-2 bg-blue-800 border-white border-b-2 md:justify-around'>
                <Link to='/' className='no-underline'>
                    <h1 className='text-white text-3xl font-bold'>DEALMOOLA</h1>
                </Link>
                <img className='md:hidden' src={MobileMenuIcon} alt='mobile navigation menu icon' onClick={() => {
                    setShowMenu(true);
                    document.body.style.overflowY = 'hidden';
                }} />
                <ul className='hidden py-0 px-0 mx-0 my-0 md:flex'>
                    <Link to='/' className='mx-4 no-underline text-white'>
                        <li>HOME</li>
                    </Link>
                    <Link to='/search' className='mx-4 no-underline text-white'>
                        <li>SEARCH</li>
                    </Link>
                    <Link to='/categories' className='mx-4 no-underline text-white'>
                        <li>CATEGORIES</li>
                    </Link>
                </ul>
                {showMenu && <MobileMenu setShowMenu={setShowMenu} showMenu={showMenu} />}
            </div>
        </>
    );
}

export default Header;
