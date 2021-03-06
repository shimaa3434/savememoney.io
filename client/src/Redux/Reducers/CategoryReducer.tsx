import { SET_LOADING, SET_CATEGORY, SET_PARAM_ALERT } from "../types"


interface StateInt {
    DATA: null | Object
    LOADING: boolean,
    PARAMALERT: null | string,
    CATEGORY?: null | string,
}

const InitialState:StateInt = {
    DATA: null,
    LOADING: false,
    PARAMALERT: null,
    CATEGORY: null
}

const CategoryReducer = (state = InitialState, action:any) => {
    switch(action.type) {
        default:
            return state
        case SET_LOADING:
            return {
                ...state,
                LOADING: action.payload
            }
        case SET_CATEGORY:
            return {
                ...state,
                DATA: action.payload
            }
        case SET_PARAM_ALERT:
            return {
                ...state,
                PARAMALERT: action.payload
            }
    }
}

export default CategoryReducer;