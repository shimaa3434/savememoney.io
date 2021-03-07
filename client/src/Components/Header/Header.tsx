import MobileMenuIcon from '../../Media/Images/MobileMenuIcon.svg'
import {useState} from 'react'
import MobileMenu from '../MobileMenu/MobileMenu';
import {Link} from 'react-router-dom'

const Header = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <>
            <div className='w-screen h-20 flex flex-row justify-between items-center bg-indigo-500 md:justify-around'>
                <Link to='/' className='no-underline'>
                    <h1 className='text-white'>dealmoola</h1>
                </Link>
                <img className='block md:hidden' src={MobileMenuIcon} alt='mobile navigation menu icon' onClick={() => {
                    setShowMenu(true);
                    document.body.style.overflowY = 'hidden';
                }} />
                <ul className='hidden py-0 px-0 mx-0 my-0 md:flex md:flex-row'>
                    <Link to='/' className='mx-4 no-underline text-white'>
                        <ul>HOME</ul>
                    </Link>
                    <Link to='/search' className='mx-4 no-underline text-white'>
                        <ul>SEARCH</ul>
                    </Link>
                    <Link to='/categories' className='mx-4 no-underline text-white'>
                        <ul>CATEGORIES</ul>
                    </Link>
                </ul>
                {showMenu && <MobileMenu setShowMenu={setShowMenu} />}
            </div>
        </>
    )
}

export default Header
