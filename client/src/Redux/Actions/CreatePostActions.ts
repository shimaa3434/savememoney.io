import Axios from "axios"
import { dispatchCreatePostLoading, dispatchCreatePostMessage } from "./DispatchTypes"


export const CreateAPost = ( URL:string, CATEGORY:string, PRICE:string) => {
    
    return async (dispatch:Function) => {
        dispatch(dispatchCreatePostLoading(true))
        await Axios.post('/api/posts/create', {
            category: CATEGORY,
            url: URL,
            price: PRICE
        })
        .then((resp:any) => {
            dispatch(dispatchCreatePostLoading(false));
            dispatch(dispatchCreatePostMessage(resp.data))
            window.location.assign(resp.data.redirecturl);
        }).catch((err:any) => {
            dispatch(dispatchCreatePostLoading(false));
            console.log(err)
        })
    }
}