import { ActionInt, loginReducer } from '../../TypeScript/App Interfaces'
import { SET_LOGIN_MESSAGE, SET_LOGIN_PASSWORD, SET_LOGIN_USEROREMAIL } from '../types';

const InitialState:loginReducer = {
    USEROREMAIL: '',
    PASSWORD: '',
    MESSAGE: null
}


const LoginReducer = (state = InitialState, action:ActionInt) => {
    switch(action.type) {
        default:
            return state;
        case SET_LOGIN_PASSWORD:
            return {
                ...state,
                PASSWORD: action.payload
            }
        case SET_LOGIN_USEROREMAIL:
            return {
                ...state,
                USEROREMAIL: action.payload
            }
        case SET_LOGIN_MESSAGE:
            return {
                ...state,
                MESSAGE: action.payload
            }
    }
}


export default LoginReducer;