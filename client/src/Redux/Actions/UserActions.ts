import Axios from 'axios';
import { dispatchLoggedIn, dispatchLoggedInPFP, dispatchLoggedInUsername, dispatchUserAttemptedAuth } from './DispatchTypes';

export const CheckUserAuth = () => {
    return async (dispatch:Function) => {
        await Axios.post('/api/auth')
        .then(({ data: { status, username, pfp } }) => {
            if (status === 210) {
                dispatch(dispatchLoggedIn(true));
                dispatch(dispatchLoggedInUsername(username))
                dispatch(dispatchLoggedInPFP(pfp))
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
            dispatch(dispatchLoggedInUsername(null))
            dispatch(dispatchLoggedIn(false))
        }).catch((err:any) => {
            console.log(err);
        })
    }
}