import { postcollectionProps, PostPropsInt, PostsPropsInt } from '../../TypeScript/App Interfaces';
import {SET_LOADING, SET_POSTS} from '../types';

interface State {
    LOADING: boolean,
    DATA: null | {
        timelineposts: Array<PostPropsInt&postcollectionProps>,
        status: number
    }
}

const initialState:State = {
    LOADING: false,
    DATA: null
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
                DATA: action.payload
            }
    }
}

export default postsReducer;
