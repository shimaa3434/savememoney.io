import Axios from 'axios';
import { setPosts, setLoading } from './DispatchTypes';

export const getPosts = () => {

    return async (dispatch:Function) => {
        dispatch(setLoading(true))
        const Response = await Axios.get('/api/users/timeline')
        .then(({ data }) => {
            dispatch(setLoading(false)); dispatch(setPosts(data));
        })
        .catch((err) => {
            dispatch(setLoading(false));
        })
    }
};