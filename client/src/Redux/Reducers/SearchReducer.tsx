import {
    SET_LOADING,
    GET_SEARCH,
    SET_SEARCH_CATEGORY,
    SET_SEARCH_PRICERANGE,
    SET_SEARCH_INPUT
} from '../types';


interface StateInt {
    DATA: null | Object
    INPUT: string,
    CATEGORY: string,
    PRICERANGE: string,
    LOADING: boolean
};

const InitialState:StateInt = {
    DATA: null,
    INPUT: '',
    CATEGORY: '',
    PRICERANGE: '',
    LOADING: false
}
const SearchReducer = (state = InitialState, action:any) => {
    switch(action.type) {
        default:
            return state
        case GET_SEARCH:
            return {
                ...state,
                DATA: action.payload
            }
        case SET_SEARCH_INPUT:
            return {
                ...state,
                INPUT: action.payload
            }
        case SET_SEARCH_CATEGORY:
            return {
                ...state,
                CATEGORY: action.payload
            }
        case SET_SEARCH_PRICERANGE:
            return {
                ...state,
                PRICERANGE: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                LOADING: action.payload
            }
    }
}

export default SearchReducer;