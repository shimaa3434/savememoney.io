import Axios from "axios"
import { dispatchCreatePostCategory, dispatchCreatePostLoading, dispatchCreatePostPrice, dispatchCreatePostURL, dispatchCreatePostMessage } from "./DispatchTypes"


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

export const setCategory = (CATEGORY:string) => {
    return (dispatch:Function) => {
        dispatch(dispatchCreatePostCategory(CATEGORY))
    }
}
export const setURL = (URL:string) => {
    return (dispatch:Function) => {
        dispatch(dispatchCreatePostURL(URL))
    }
}
export const setPrice = (PRICE:string) => {
    return (dispatch:Function) => {
        dispatch(dispatchCreatePostPrice(PRICE))
    }
}