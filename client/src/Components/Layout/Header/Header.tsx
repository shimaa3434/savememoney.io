import MobileMenuIcon from '../../../Media/Images/MobileMenuIcon.svg';
import MobileMenu from '../../MobileMenu/MobileMenu';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { connect } from 'react-redux';
import { LogoutUser } from '../../../Redux/Actions/UserActions';
import { GroupSelectOptions } from '../../Search/SearchSelectOptions';


const Header:React.FC<{LOGGEDIN:boolean, LogoutUser:Function}> = ({LogoutUser, LOGGEDIN}) => {

    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className=''>
            <div className='w-screen h-20 flex flex-row justify-between items-center px-2 bg-lighterblue md:justify-around'>
                <Link to='/' className='no-underline'>
                    <h1 className='text-white text-3xl font-bold'>savememoney!</h1>
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
                <ul className='w-screen overflow-x-scroll py-2 list-style-none flex flex-row  border-b-2 border-t-2 border-lighterblue '>
                    {
                        GroupSelectOptions.map(({ label }) => {
                            return <Link to={`/categories/${label}`} className='mx-2 text-black'>
                                        { label }
                                    </Link>
                        })
                    }
                </ul>
            </div>
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
