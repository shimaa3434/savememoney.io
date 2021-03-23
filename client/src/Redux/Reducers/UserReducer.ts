import { UserReducerInt } from "../../TypeScript/App Interfaces";
import { SET_USER_ATTEMPTED_AUTH, SET_USER_LOGGED_IN } from "../types";


const InitialState:UserReducerInt = {
    LOGGEDIN: false,
    ATTEMPTEDAUTH: false
}


const UserReducer = (state = InitialState, action:any) => {
    switch(action.type) {
        default:
            return state;
        case SET_USER_LOGGED_IN:
            return {
                ...state,
                LOGGEDIN: action.payload
            }
        case SET_USER_ATTEMPTED_AUTH:
            return {
                ...state,
                ATTEMPTEDAUTH: action.payload
            }
    }
}

export default UserReducer;