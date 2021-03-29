import React from 'react'
import { RegisterUser, setEmail, setName, setPassword, setUsername } from '../Redux/Actions/RegisterActions';
import { connect } from 'react-redux';

const Register:React.FC<{USERNAME: string, PASSWORD:string, NAME:string, EMAIL:string, LOADING:boolean, MESSAGE:{message:string, err?:any} | null, setName:Function, setPassword:Function, setEmail:Function, setUsername:Function, RegisterUser:Function}>
 = ({USERNAME, PASSWORD, NAME, EMAIL, LOADING, MESSAGE, setName, setUsername, setEmail, setPassword, RegisterUser}) => {
    return (
        
            <form className='w-screen flex flex-col items-center py-10' onSubmit={(event:any) => {event.preventDefault();}}>
                <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={NAME} placeholder='Name' onChange={(event:any) => {setName(event.target.value)}} />
                <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={USERNAME} placeholder='Username' onChange={(event:any) => {setUsername(event.target.value)}} />
                <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={EMAIL} placeholder='Email' onChange={(event:any) => {setEmail(event.target.value)}} />
                <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={PASSWORD} placeholder='Password' type='password' onChange={(event:any) => {setPassword(event.target.value)}} />
                <button className='ring-4 ring-blue-200 text-white text-xl font-bold bg-blue-800 px-4 py-4 w-3/5 rounded-full md:w-1/5' type='submit' onClick={(event:any) => {if (PASSWORD !== '' && USERNAME !== '' && NAME !== '' && EMAIL !== '') RegisterUser(NAME, USERNAME,PASSWORD, EMAIL);}}>SIGN UP</button>
                {MESSAGE && <span>{MESSAGE.message}</span>}
            </form>
    )
}


const mapStateToProps = (state:any) => {
    const { RegisterState } = state;
    const { LOADING, NAME, PASSWORD, EMAIL, MESSAGE, USERNAME } = RegisterState;

    return {
        LOADING, NAME, USERNAME,
        PASSWORD, EMAIL, MESSAGE
    }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        RegisterUser: (NAME:string, USERNAME:string, PASSWORD: string, EMAIL: string) => {
            dispatch(RegisterUser(NAME, USERNAME, EMAIL, PASSWORD))
        },
        setName: (input:string) => {dispatch(setName(input))},
        setEmail: (input:string) => {dispatch(setEmail(input))},
        setPassword: (input:string) => {dispatch(setPassword(input))},
        setUsername: (input:string) => {dispatch(setUsername(input))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)
