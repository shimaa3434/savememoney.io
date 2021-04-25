import { ActionInt, registerReducer } from "../../TypeScript/App Interfaces"
import { SET_REGISTER_LOADING, SET_REGISTER_RESPONSE_MESSAGE } from "../types";

const InitialState:registerReducer = {
    LOADING: false,
    MESSAGE: null
}

const RegisterReducer = (state = InitialState, action:ActionInt) => {
    switch (action.type) {
        default:
            return state;
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