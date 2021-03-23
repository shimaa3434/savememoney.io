import { ActionInt} from '../../TypeScript/App Interfaces'
import { SET_PROFILE_BIO, SET_PROFILE_DATA, SET_PROFILE_NAMEHEAD, SET_PROFILE_USERNAME, SET_PROFILE_LOADING } from '../types';

const InitialState:{LOADING:boolean, DATA: any, username: string | null, bio:string | null, namehead:string | null} = {
    LOADING: false,
    DATA: null,
    username: null,
    bio: null,
    namehead: null
}

const ProfileReducer = (state = InitialState, action:ActionInt) => {
    switch(action.type) {
        default:
            return state;
        case SET_PROFILE_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case SET_PROFILE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case SET_PROFILE_NAMEHEAD:
            return {
                ...state,
                namehead: action.payload
            }
        case SET_PROFILE_DATA:
            return {
                ...state,
                DATA: action.payload
            }
        case SET_PROFILE_LOADING:
            return {
                ...state,
                LOADING: action.payload
            }
    }
}

export default ProfileReducer;