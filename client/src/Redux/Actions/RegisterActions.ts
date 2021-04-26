import { dispatchRegisterLoading, dispatchRegisterMessage } from './DispatchTypes'
import Axios from 'axios';


export const RegisterUser = (namehead:string, username:string, email:string, password:string) => {
    return async (dispatch:Function) => {
        dispatch(dispatchRegisterLoading(true));
        await Axios.post('/api/users/signup', {
            email,
            
            username,
            password,
            namehead
        })
        .then((resp:any) => {
            const StatusCode = resp.status;
            dispatch(dispatchRegisterMessage(resp.data));
            dispatch(dispatchRegisterLoading(false))
            if (StatusCode === 210) window.location.assign(window.location.origin)
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