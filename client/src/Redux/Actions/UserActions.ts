import Axios from 'axios';
import { response } from 'express';
import { dispatchLoggedIn, dispatchLoggedInUsername, dispatchUserAttemptedAuth } from './DispatchTypes';

export const CheckUserAuth = () => {
    return async (dispatch:Function) => {
        await Axios.post('/api/auth')
        .then(({ data: { status, username } }) => {
            if (status === 210) {
                dispatch(dispatchLoggedIn(true));
                dispatch(dispatchLoggedInUsername(username))
                dispatch(dispatchUserAttemptedAuth());
            } else {
                dispatchLoggedInUsername(null)
                dispatch(dispatchUserAttemptedAuth())
            }
        }).catch((err:any) => {
            dispatch(dispatchUserAttemptedAuth())
        })
    }
}


export const LogoutUser = () => {
    return async (dispatch:Function) => {
        await Axios.post('/api/users/logout')
        .then((resp:any) => {
            dispatchLoggedInUsername(null)
            dispatch(dispatchLoggedIn(false))
        }).catch((err:any) => {
            console.log(err);
        })
    }
}