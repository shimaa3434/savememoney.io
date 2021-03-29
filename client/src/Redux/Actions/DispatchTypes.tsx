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
    SET_USER_ATTEMPTED_AUTH,
    SET_REGISTER_PASSWORD,
    SET_REGISTER_EMAIL,
    SET_REGISTER_LOADING,
    SET_REGISTER_RESPONSE_MESSAGE,
    SET_REGISTER_NAME,
    SET_REGISTER_USERNAME,
    SET_PROFILE_USERNAME,
    SET_PROFILE_BIO,
    SET_PROFILE_NAMEHEAD,
    SET_PROFILE_DATA,
    SET_PROFILE_LOADING,
    SET_CREATEPOST_LOADING,
    SET_CREATEPOST_URL,
    SET_CREATEPOST_CATEGORY,
    SET_CREATEPOST_PRICE,
    SET_CREATEPOST_MESSAGE
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


// register reducer  and component


export const dispatchRegisterPassword = (password:string) => {
    return {type: SET_REGISTER_PASSWORD, payload: password};
};

export const dispatchRegisterEmail = (email:string) => {
    return {type: SET_REGISTER_EMAIL, payload: email};
};

export const dispatchRegisterName = (name:string) => {
    return {type: SET_REGISTER_NAME, payload: name};
};

export const dispatchRegisterUsername = (username:string) => {
    return {type: SET_REGISTER_USERNAME, payload: username};
};

export const dispatchRegisterLoading = (type:boolean) => {
    return {type: SET_REGISTER_LOADING, payload: type}
}

export const dispatchRegisterMessage = (response:{message: string, err?: any} | null) => {
    return {type: SET_REGISTER_RESPONSE_MESSAGE, payload: response}
}


// for profile reducer

export const dispatchProfileUsername = (username:string) => {
    return {type: SET_PROFILE_USERNAME, payload: username}
}
export const dispatchProfileBio = (bio:string) => {
    return {type: SET_PROFILE_BIO, payload: bio}
}
export const dispatchProfileNamehead = (namehead:string) => {
    return {type: SET_PROFILE_NAMEHEAD, payload: namehead}
}
export const dispatchProfileData = (data:any) => {
    return {type: SET_PROFILE_DATA, payload: data}
}
export const dispatchProfileLoading = (status:boolean) => {
    return {type: SET_PROFILE_LOADING, payload: status}
}


// for createpost reducer


export const dispatchCreatePostLoading = (status:boolean) => {
    return {type: SET_CREATEPOST_LOADING, payload: status}
}
export const dispatchCreatePostURL = (URL:string) => {
    return {type: SET_CREATEPOST_URL, payload: URL}
}
export const dispatchCreatePostCategory = (category:string) => {
    return {type: SET_CREATEPOST_CATEGORY, payload: category}
}
export const dispatchCreatePostPrice = (price:string) => {
    return {type: SET_CREATEPOST_PRICE, payload: price}
}
export const dispatchCreatePostMessage = (message:{message: string, err?: any, redirecturl: null | string}) => {
    return {type: SET_CREATEPOST_MESSAGE, payload: message}
}
