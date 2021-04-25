import { ActionInt, profileReducer} from '../../TypeScript/App Interfaces'
import { SET_PROFILE_DATA, SET_PROFILE_LOADING } from '../types';

const InitialState:profileReducer  = {
    LOADING: false,
    DATA:null,
    REDIRECT: false
}

const ProfileReducer = (state = InitialState, action:ActionInt) => {
    switch(action.type) {
        default:
            return state;
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
        case 'SET_PROFILE_REDIRECT':
            return {
                ...state,
                REDIRECT: action.payload
            }
    }
}

export default ProfileReducer;