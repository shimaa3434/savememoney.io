import Axios from 'axios';
import { dispatchLoggedIn, dispatchLoginMessage, dispatchLoginPassword, dispatchLoginUserOrEmail } from './DispatchTypes';


export const LoginUser = (useroremail:string, password:string) => {
    return async (dispatch:Function) => {
        await Axios.post('/api/users/login', {
            useroremail,
            password
        }).then((resp:any) => {
            if (resp.status === 210) {
                dispatch(dispatchLoggedIn(true));
                dispatch(dispatchLoginMessage(resp.data))
                window.location.assign('http://localhost:3000/');
            } else {
                dispatch(dispatchLoginMessage(resp.data))
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