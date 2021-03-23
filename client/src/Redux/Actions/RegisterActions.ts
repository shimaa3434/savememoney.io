import { dispatchRegisterEmail, dispatchRegisterName, dispatchRegisterLoading, dispatchRegisterMessage, dispatchRegisterPassword, dispatchRegisterUsername } from './DispatchTypes'
import Axios from 'axios';


export const RegisterUser = (name:string, username:string, email:string, password:string) => {
    return async (dispatch:Function) => {
        dispatch(dispatchRegisterLoading(true));
        await Axios.post('/api/users/signup', {
            email: email,
            username: username,
            password: password,
            namehead: name
        })
        .then((resp:any) => {
            const StatusCode = resp.status;
            dispatch(dispatchRegisterMessage(resp.data));
            dispatch(dispatchRegisterLoading(false))
            if (StatusCode === 210) window.location.assign('http://localhost:3000')
        })
        .catch((err:any) => {
            dispatch(dispatchRegisterLoading(false));
            dispatch(dispatchRegisterMessage({
                message: 'There was an error submitting your information.',
                err: null
            }))
        })
    }
}

export const setName = (name: string) => {
    return (dispatch:Function) => {
        dispatch(dispatchRegisterName(name))
    }
}

export const setPassword = (passwordinput: string) => {
    return (dispatch:Function) => {
        dispatch(dispatchRegisterPassword(passwordinput))
    }
}

export const setEmail = (email: string) => {
    return (dispatch:Function) => {
        dispatch(dispatchRegisterEmail(email))
    }
}

export const setUsername = (username: string) => {
    return (dispatch:Function) => {
        dispatch(dispatchRegisterUsername(username))
    }
}