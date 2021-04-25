import Axios from "axios"
import { dispatchProfileData, dispatchProfileLoading, dispatchProfileRedirect } from "./DispatchTypes"


export const GetProfile = (usernameparameter:string) => {
    return async (dispatch:Function) => {
        dispatch(dispatchProfileLoading(true))
        await Axios.get(`/api/users/profile/${usernameparameter}`)
        .then(({data}) => {
            if (data.status === 210) { dispatch(dispatchProfileData(data)); dispatch(dispatchProfileLoading(false)); }
            if (data.status === 400) { dispatch(dispatchProfileLoading(false)); dispatch(dispatchProfileRedirect(true)) }
        })
        .catch((err:any) => {
            dispatch(dispatchProfileLoading(false))
            console.log(err);
        })
    }
}