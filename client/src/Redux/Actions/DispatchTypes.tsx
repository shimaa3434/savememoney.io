import {
    SET_LOADING,
    SET_POSTS,
    SET_CATEGORY,
    SET_PARAM_ALERT,
    GET_SEARCH,
    SET_SEARCH_INPUT,
    SET_SEARCH_CATEGORY,
    SET_SEARCH_PRICERANGE,
    SET_LOGIN_PASSWORD,
    SET_LOGIN_USEROREMAIL,
    SET_USER_LOGGED_IN,
    SET_LOGIN_MESSAGE,
    SET_USER_ATTEMPTED_AUTH
} from '../types';

// GENERAL & REUSABLE

export const setLoading:Function = (type:boolean) => {
    return {type: SET_LOADING, payload: type}
}

// FOR POSTS ACTIONS

type Posts = null | Object;

export const setPosts:Function = (content:Posts) => {
    return {type: SET_POSTS, payload: content}
}

// FOR CATEGORY ACTIONS

export const setCategory:Function = (data:Object) => {
    return {type: SET_CATEGORY, payload: data}
}

export const setParamAlert:Function = (alert:string) => {
    return {type: SET_PARAM_ALERT, payload: alert}
}

// FOR SEARCH ACTIONS

export const setSearch:Function = (data:Array<Object>) => {
    return {type: GET_SEARCH, payload: data}
}

export const SearchInput:Function = (input:string) => {
    return {type: SET_SEARCH_INPUT, payload: input}
}

export const SearchCategory:Function = (category:string) => {
    return {type: SET_SEARCH_CATEGORY, payload: category}
}
export const SearchPriceRange:Function = (range:Array<number>) => {
    return {type:SET_SEARCH_PRICERANGE, payload: range}
}


// FOR LOGIN COMPOENNET ACTIONS


export const dispatchLoginPassword = (PASSWORD: string) => {
    return {type: SET_LOGIN_PASSWORD, payload: PASSWORD}
}

export const dispatchLoginUserOrEmail = (USEROREMAIL: string) => {
    return {type: SET_LOGIN_USEROREMAIL, payload: USEROREMAIL}
}

export const dispatchLoginMessage = (MESSAGE:{message: string, err?: any} | null) => {
    return {type: SET_LOGIN_MESSAGE, payload: MESSAGE}
}

// FOR USER REDUCER AND LOGIN COMPONENTS.


export const dispatchLoggedIn = (status: boolean) => {
    return {type: SET_USER_LOGGED_IN, payload: status}
}

export const dispatchUserAttemptedAuth = () => {
    return {type: SET_USER_ATTEMPTED_AUTH, payload: true};
}