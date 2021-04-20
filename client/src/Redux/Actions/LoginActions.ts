import Axios from 'axios';
import { dispatchLoggedIn, dispatchLoggedInUsername, dispatchLoginMessage, dispatchLoginPassword, dispatchLoginUserOrEmail } from './DispatchTypes';


export const LoginUser = (useroremail:string, password:string) => {
    return async (dispatch:Function) => {
        await Axios.post('/api/users/login', {
            useroremail,
            password
        }).then(({ data: { status, username, message } }) => {
            if (status === 210) {
                dispatch(dispatchLoggedIn(true));
                dispatch(dispatchLoggedInUsername(username))
                window.location.assign(window.location.origin);
            } else {
                dispatch(dispatchLoginMessage(message))
            }
        }).catch((err) => {console.log(err)})
    }
}

export const setLoginPassword = (PASSWORD:string) => {
    return (dispatch:Function) => {
        dispatch(dispatchLoginPassword(PASSWORD))
    }
} 

export const setLoginUserOrEmail = (USEROREMAIL:string) => {
    return (dispatch:Function) => {
        dispatch(dispatchLoginUserOrEmail(USEROREMAIL))
    }
} 