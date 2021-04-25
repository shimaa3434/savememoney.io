import { TextField } from '@material-ui/core';
import Helmet from 'react-helmet'
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoginPassword, setLoginUserOrEmail, LoginUser } from '../Redux/Actions/LoginActions'
import { loginProps } from '../TypeScript/App Interfaces';

const Login:React.FC<loginProps> = ({ USEROREMAIL, PASSWORD, MESSAGE, LoginUser, setLoginPassword, setLoginUserOrEmail }) => {
    return (
        <div className='w-screen flex flex-col items-center'>
            <Helmet>
                <title> Login | SaveMeMoney </title>
            </Helmet>
            <form className='w-screen flex flex-col items-center py-10' onSubmit={(event:any) => {event.preventDefault();}}>
                <div className='flex flex-row justify-end my-4 w-4/5 md:w-3/5 lg:w-1/3'>
                    Not a user?
                    <Link to='/register' className='text-blue-600 font-bold mx-2'>
                        {' ' + `Sign Up`}
                    </Link>
                </div>
                <TextField className='w-4/5 h-20 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-3/5 lg:w-1/3' value={USEROREMAIL} placeholder='Log in with a username or email' onChange={(event:any) => {setLoginUserOrEmail(event.target.value)}} />
                <TextField className='w-4/5 h-20 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-3/5 lg:w-1/3' type='password' value={PASSWORD} placeholder='Password' onChange={(event:any) => {setLoginPassword(event.target.value)}} />
                <button className='flex flex-col items-center justify-center py-2 px-12 rounded text-white text-xl bg-blue-600' type='submit' onClick={(event:any) => {if (PASSWORD !== '' && USEROREMAIL !== '') LoginUser(USEROREMAIL, PASSWORD);}}>LOGIN</button>
                {MESSAGE && <span>{MESSAGE.message}</span>}
            </form>
        </div>
    )
}

const mapStateToProps = (store:any) => {
    const { LoginState } = store;
    const { USEROREMAIL, PASSWORD, MESSAGE } = LoginState;
    return {
        USEROREMAIL,
        PASSWORD,
        MESSAGE
    }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        LoginUser: (USEROREMAIL:string, PASSWORD:string) => {dispatch(LoginUser(USEROREMAIL, PASSWORD))},
        setLoginPassword: (input:string) => {dispatch(setLoginPassword(input))},
        setLoginUserOrEmail: (input:string) => {dispatch(setLoginUserOrEmail(input))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
