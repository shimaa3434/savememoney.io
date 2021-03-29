import { postcollectionProps, PostsPropsInt } from '../../TypeScript/App Interfaces';
import {SET_LOADING, SET_POSTS} from '../types';

interface State {
    LOADING: boolean,
    POSTS: null | postcollectionProps&PostsPropsInt[]
}

const initialState:State = {
    LOADING: false,
    POSTS: null
}

const postsReducer = (state = initialState, action:any) => {
    switch(action.type) {
        default:
            return state;
        
        case SET_LOADING:
            return {
                ...state,
                LOADING: action.payload
            }
        case SET_POSTS:
            return {
                ...state,
                POSTS: action.payload
            }
    }
}

export default postsReducer;
