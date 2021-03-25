import { bindActionCreators } from "redux";
import { ActionInt, createPostReducer } from "../../TypeScript/App Interfaces";
import { SET_CREATEPOST_CATEGORY, SET_CREATEPOST_LOADING, SET_CREATEPOST_MESSAGE, SET_CREATEPOST_PRICE, SET_CREATEPOST_TITLE, SET_CREATEPOST_URL } from "../types";


const InitialState:createPostReducer = {
    CATEGORY: '',
    URL: '',
    PRICE: '',
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
        case SET_CREATEPOST_URL:
            return {
                ...state,
                URL: action.payload
            }
        case SET_CREATEPOST_CATEGORY:
            return {
                ...state,
                CATEGORY: action.payload
            }
        case SET_CREATEPOST_PRICE:
            return {
                ...state,
                PRICE: action.payload
            }
    }
}


export default CreatePostReducer;