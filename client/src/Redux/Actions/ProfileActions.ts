import Axios from "axios"
import { dispatchProfileBio, dispatchProfileData, dispatchProfileLoading, dispatchProfileNamehead, dispatchProfileUsername } from "./DispatchTypes"


export const GetProfile = (usernameparameter:string) => {
    return async (dispatch:Function) => {
        dispatch(dispatchProfileLoading(true))
        await Axios.get(`/api/users/profile/${usernameparameter}`)
        .then(({data}) => {
            dispatch(dispatchProfileData(data));
            dispatch(dispatchProfileLoading(false));
        })
        .catch((err:any) => {
            dispatch(dispatchProfileLoading(false))
            console.log(err);
        })
    }
}