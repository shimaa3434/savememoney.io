import Axios from "axios"


export const CreateAPost = ( URL:string, CATEGORY:string, PRICE:string) => {
    return async (dispatch:Function) => {
        await Axios.post('/api/posts/create', {
            CATEGORY, URL, PRICE
        })
        .then((resp:any) => {


            if (resp.status === 210) window.location.assign('/users/')
        }).catch((err:any) => {

        })
    }
}

export const setCategory = (CATEGORY:string) => {
    return (dispatch:Function) => {
        dispatch()
    }
}
export const setURL = (URL:string) => {
    return (dispatch:Function) => {
        dispatch()
    }
}
export const setPrice = (PRICE:string) => {
    return (dispatch:Function) => {
        dispatch()
    }
}