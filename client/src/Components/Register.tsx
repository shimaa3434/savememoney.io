import React, { useState } from 'react'
import { RegisterUser } from '../Redux/Actions/RegisterActions';
import { connect } from 'react-redux';
import { registerProps } from '../TypeScript/App Interfaces';

const Register:React.FC<registerProps>
 = ({LOADING, MESSAGE, RegisterUser}) => {

    const [ name, setName ] = useState<string>('');
    const [ username, setUsername ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    return (
        
            <form className='w-screen flex flex-col items-center py-10' onSubmit={(event:any) => {event.preventDefault();}}>
                <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={name} placeholder='Name' onChange={({ target: { value } }) => {setName(value)}} />
                <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={username} placeholder='Username' onChange={({ target: { value } }) => {setUsername(value)}} />
                <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={email} placeholder='Email' onChange={({ target: { value } }) => {setEmail(value)}} />
                <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={password} placeholder='Password' type='password' onChange={({ target: { value } }) => {setPassword(value)}} />
                <button className='ring-4 ring-blue-200 text-white text-xl font-bold bg-blue-800 px-4 py-4 w-3/5 rounded-full md:w-1/5' type='submit' onClick={(event:any) => {if (password !== '' && username !== '' && name !== '' && email !== '') RegisterUser(name, username, password, email);}}>SIGN UP</button>
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
