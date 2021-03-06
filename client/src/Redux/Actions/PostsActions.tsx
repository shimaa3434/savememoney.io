import Axios from 'axios';
import { setPosts, setLoading } from './DispatchTypes';

export const getPosts = () => {

    return async (dispatch:Function) => {
        dispatch(setLoading(true))
        const Response = await Axios.get('/api/posts')
        .then((res) => {
            dispatch(setLoading(false)); dispatch(setPosts(res.data));
        })
        .catch((err) => {
            dispatch(setLoading(false));
        })
    }
};

