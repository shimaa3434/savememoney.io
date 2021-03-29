import MobileMenuIcon from '../../../Media/Images/MobileMenuIcon.svg';
import MobileMenu from '../../MobileMenu/MobileMenu';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { connect } from 'react-redux';
import { LogoutUser } from '../../../Redux/Actions/UserActions';


const Header:React.FC<{LOGGEDIN:boolean, LogoutUser:Function}> = ({LogoutUser, LOGGEDIN}) => {

    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <>
            <div className='w-screen h-20 flex flex-row justify-between items-center px-2 bg-white border-black border-b-4 md:justify-around'>
                <Link to='/' className='no-underline'>
                    <h1 className='text-black text-3xl font-bold'>savememoney!</h1>
                </Link>
                <img className='md:hidden' src={MobileMenuIcon} alt='mobile navigation menu icon' onClick={() => {
                    setShowMenu(true);
                    document.body.style.overflowY = 'hidden';
                }} />
                <ul className='hidden py-0 px-0 mx-0 my-0 md:flex'>
                    <Link to='/' className='mx-4 no-underline text-black'>
                        HOME
                    </Link>
                    <Link to='/search' className='mx-4 no-underline text-black'>
                        SEARCH
                    </Link>
                    <Link to='/categories' className='mx-4 no-underline text-black'>
                        CATEGORIES
                    </Link>
                    {LOGGEDIN ?
                        <li className='mx-4 no-underline cursor-pointer text-black' onClick={() => {
                            LogoutUser()
                        }}>
                            Logout
                        </li>
                    :
                        <Link to='/login' className='mx-4 no-underline text-black'>
                            Login
                        </Link>
                    }
                    {!LOGGEDIN &&
                        <Link to='/register' className='mx-4 no-underline text-black'>
                            Sign Up
                        </Link>
                    }
                </ul>
                {showMenu && <MobileMenu setShowMenu={setShowMenu} showMenu={showMenu} LOGGEDIN={LOGGEDIN} LogoutUser={LogoutUser} />}
            </div>
        </>
    );
}

const mapStateToProps = (store:any) => {
    const { UserState } = store;
    const { LOGGEDIN } = UserState;
    return {LOGGEDIN}
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        LogoutUser: () => {dispatch(LogoutUser())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
