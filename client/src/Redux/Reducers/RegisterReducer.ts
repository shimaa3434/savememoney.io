import { ActionInt } from "../../TypeScript/App Interfaces"
import { SET_REGISTER_EMAIL, SET_REGISTER_LOADING, SET_REGISTER_NAME, SET_REGISTER_PASSWORD, SET_REGISTER_RESPONSE_MESSAGE, SET_REGISTER_USERNAME } from "../types";



const InitialState:{EMAIL: string, NAME: string, USERNAME:string, PASSWORD: string, LOADING: boolean, MESSAGE:{message: string, err?:any} | null} = {
    EMAIL: '',
    NAME: '',
    USERNAME: '',
    PASSWORD: '',
    LOADING: false,
    MESSAGE: null
}


const RegisterReducer = (state = InitialState, action:ActionInt) => {
    switch (action.type) {
        default:
            return state;
        case SET_REGISTER_NAME:
            return {
                ...state,
                NAME: action.payload
            }
        case SET_REGISTER_USERNAME:
            return {
                ...state,
                USERNAME: action.payload
            }
        case SET_REGISTER_EMAIL:
            return {
                ...state,
                EMAIL: action.payload
            }
        case SET_REGISTER_NAME:
            return {
                ...state,
                NAME: action.payload
            }
        case SET_REGISTER_PASSWORD:
            return {
                ...state,
                PASSWORD: action.payload
            }
        case SET_REGISTER_LOADING:
            return {
                ...state,
                LOADING: action.payload
            }
        case SET_REGISTER_RESPONSE_MESSAGE:
            return {
                ...state,
                MESSAGE: action.payload
            }
    }
}


export default RegisterReducer;