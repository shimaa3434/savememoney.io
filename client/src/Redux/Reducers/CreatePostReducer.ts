
import { ActionInt, createPostReducer } from "../../TypeScript/App Interfaces";
import { SET_CREATEPOST_LOADING, SET_CREATEPOST_MESSAGE } from "../types";


const InitialState:createPostReducer = {
    LOADING: false,
    MESSAGE: null
}

const CreatePostReducer = (state = InitialState, action:ActionInt) => {
    switch(action.type) {
        default:
            return state;
        case SET_CREATEPOST_LOADING:
            return {
                ...state,
                LOADING: action.payload
            }
        case SET_CREATEPOST_MESSAGE:
            return {
                ...state,
                MESSAGE: action.payload
            }
    }
}


export default CreatePostReducer;