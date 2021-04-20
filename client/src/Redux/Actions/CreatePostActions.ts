import Axios from "axios"
import { dispatchCreatePostLoading, dispatchCreatePostMessage } from "./DispatchTypes"


export const CreateAPost = (FD: FormData) => {
    
    return async (dispatch:Function) => {
        dispatch(dispatchCreatePostLoading(true))
        await Axios.post('/api/posts/create', FD)
        .then(({ data }) => {
            dispatch(dispatchCreatePostLoading(false));
            dispatch(dispatchCreatePostMessage(data))
            window.location.assign(window.location.origin + data.redirecturl);
        }).catch((err:any) => {
            dispatch(dispatchCreatePostLoading(false));
            console.log(err)
        })
    }
}