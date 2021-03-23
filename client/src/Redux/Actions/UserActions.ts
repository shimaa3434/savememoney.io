import Axios from 'axios';
import { response } from 'express';
import { dispatchLoggedIn, dispatchUserAttemptedAuth } from './DispatchTypes';

export const CheckUserAuth = () => {
    return async (dispatch:Function) => {
        await Axios.post('/api/auth')
        .then((resp:any) => {
            if (resp.status === 210) {

                dispatch(dispatchLoggedIn(true));
                dispatch(dispatchUserAttemptedAuth());
            } else {
                dispatch(dispatchUserAttemptedAuth())
            }
        }).catch((err:any) => {
            console.log(err);
            dispatch(dispatchUserAttemptedAuth())
        })
    }
}


export const LogoutUser = () => {
    return async (dispatch:Function) => {
        await Axios.post('/api/users/logout')
        .then((resp:any) => {
            dispatch(dispatchLoggedIn(false))
        }).catch((err:any) => {
            console.log(err);
        })
    }
}