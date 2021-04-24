import React, { useState } from 'react'
import { RegisterUser } from '../Redux/Actions/RegisterActions';
import { connect } from 'react-redux';
import { registerProps } from '../TypeScript/App Interfaces';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Register:React.FC<registerProps>
 = ({LOADING, MESSAGE, RegisterUser}) => {

    const [ name, setName ] = useState<string>('');
    const [ username, setUsername ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    return (
        
            <form className='w-screen flex flex-col items-center py-10' onSubmit={(event:any) => {event.preventDefault();}}>
                <Helmet>
                    <title> Register | SaveMeMoney </title>
                </Helmet>
                <div className='flex flex-row justify-end my-4 w-4/5 md:w-3/5 lg:w-1/3'>
                Already signed up?
                <Link to='/login' className='text-blue-600 font-bold mx-2'>
                    {' ' + `Log In`}
                </Link>
                </div>
                <TextField className='w-4/5 h-20 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-3/5 lg:w-1/3' value={name} placeholder='Name' onChange={({ target: { value } }) => {setName(value)}} />
                <TextField className='w-4/5 h-20 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-3/5 lg:w-1/3' value={username} placeholder='Username' onChange={({ target: { value } }) => {setUsername(value)}} />
                <TextField className='w-4/5 h-20 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-3/5 lg:w-1/3' value={email} placeholder='Email' onChange={({ target: { value } }) => {setEmail(value)}} />
                <TextField className='w-4/5 h-20 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-3/5 lg:w-1/3' value={password} placeholder='Password' type='password' onChange={({ target: { value } }) => {setPassword(value)}} />
                <button className='flex flex-col items-center justify-center py-2 px-12 rounded text-white text-xl bg-blue-600' type='submit' onClick={(event:any) => {if (password !== '' && username !== '' && name !== '' && email !== '') RegisterUser(name, username, password, email);}}>SIGN UP</button>
                {MESSAGE && <span>{MESSAGE.message}</span>}
            </form>
    )
}


const mapStateToProps = (state:any) => {
    const { RegisterState } = state;
    const { LOADING, MESSAGE } = RegisterState;

    return {
        LOADING, MESSAGE
    }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        RegisterUser: (NAME:string, USERNAME:string, PASSWORD: string, EMAIL: string) => {
            dispatch(RegisterUser(NAME, USERNAME, EMAIL, PASSWORD))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)
