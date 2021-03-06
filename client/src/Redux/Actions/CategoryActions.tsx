import Axios from 'axios';
import { setCategory, setParamAlert, setLoading } from './DispatchTypes';


export const getCategory:Function = (param:string) => {

    return async (dispatch:Function) => {
        dispatch(setLoading(true))
        const Response = await Axios.get(`/api/categories/${param}`)
        .then((resp) => {
            dispatch(setCategory(resp.data))
            dispatch(setLoading(false))
        })
        .catch((err) => {
            dispatch(setLoading(false));
            dispatch(setParamAlert('This is not a valid category.'))
        })
    }
}