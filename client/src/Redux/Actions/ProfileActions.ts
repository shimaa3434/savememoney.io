import Axios from "axios"
import { dispatchProfileBio, dispatchProfileData, dispatchProfileLoading, dispatchProfileNamehead, dispatchProfileUsername } from "./DispatchTypes"


export const GetProfile = (usernameparameter:string) => {
    return async (dispatch:Function) => {
        dispatch(dispatchProfileLoading(true))
        await Axios.get(`/api/users/profile/${usernameparameter}`)
        .then((resp:any) => {
            const Data = resp.data;
            const StatusCode = resp.status;
            dispatch(dispatchProfileData(Data));
            dispatch(dispatchProfileUsername(Data[0].username));
            dispatch(dispatchProfileBio(Data[0].bio))
            dispatch(dispatchProfileNamehead(Data[0].namehead))
            dispatch(dispatchProfileLoading(false));
        })
        .catch((err:any) => {
            dispatch(dispatchProfileLoading(false))
            console.log(err);
        })
    }
}