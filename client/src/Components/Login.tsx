import { TextField } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import { setLoginPassword, setLoginUserOrEmail, LoginUser } from '../Redux/Actions/LoginActions'
import { loginProps } from '../TypeScript/App Interfaces';

const Login:React.FC<loginProps> = ({ USEROREMAIL, PASSWORD, MESSAGE, LoginUser, setLoginPassword, setLoginUserOrEmail }) => {
    return (
        <form className='w-screen flex flex-col items-center py-10' onSubmit={(event:any) => {event.preventDefault();}}>
            <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={USEROREMAIL} placeholder='Log in with a username or email' onChange={(event:any) => {setLoginUserOrEmail(event.target.value)}} />
            <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' type='password' value={PASSWORD} placeholder='Password' onChange={(event:any) => {setLoginPassword(event.target.value)}} />
            <button className='ring-4 ring-blue-200 text-white text-xl font-bold bg-blue-800 px-4 py-4 w-3/5 rounded-full md:w-1/5' type='submit' onClick={(event:any) => {if (PASSWORD !== '' && USEROREMAIL !== '') LoginUser(USEROREMAIL, PASSWORD);}}>LOGIN</button>
            {MESSAGE && <span>{MESSAGE.message}</span>}
        </form>
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
