import { ReactNode } from 'react';
import {searchParameter} from './App Types';


// for createpost compoenent

export interface createPostReducer {
    CATEGORY: string,
    URL: string,
    PRICE: string,
    LOADING: boolean,
    MESSAGE: {message: string, err: any} | null
}

export interface createpostProps {
    CATEGORY: string,
    URL: string,
    PRICE: string,
    CreateAPost: Function,
    setURL: Function,
    setCategory: Function,
    setPrice: Function,
    LOADING: boolean,
    MESSAGE: {message: string, err: any} | null
}

// for login component props

export interface loginProps {
    setLoginUserOrEmail: Function,
    setLoginPassword: Function,
    LoginUser: Function,
    USEROREMAIL: string,
    PASSWORD: string,
    MESSAGE: {message: string, err?: any} | null
}

//for reducer action interfeace


export interface ActionInt {
    type: string,
    payload:any
}

// FOR USE IN LOGINREDUCER

export interface loginReducer {
    USEROREMAIL: string,
    PASSWORD: string,
    MESSAGE: {message: string, err?: any} | null
}

// FOR USE IN MODAL.TSX

export interface modalPropsInt {
    children: ReactNode,
    underlayclassName?: string,
    modalclassName?: string,
    containerclassName?: string,
    toggleStatus: boolean,
    toggleModal: Function,
    closeOnUnderlayClick?: boolean,
}

// FOR USE IN CATEGORY.TSX, POSTS.TSX, POST.TSX FOR DATA VARIABLE RESPONSE SHAPE.

export interface PostPropsInt {
    postid?: string, title: string,
    category: string, image: string,
    url: string, urldomain: string,
    tstamp: number, price: string
};

// FOR USE IN CATEGORY.TSX FOR CONNECTED REDUX PROPS AND ROUTE PROPS

export interface CategoryPropsInt {
    match: any, DATA: any,
    LOADING: boolean, CATEGORY: null | string,
    PARAMALERT: null | string, getCategory: Function
};

// FOR USE IN MOBILEMENU.TSX FOR PROPS FROM HEADER.TSX TO ALTER SHOW MENU USESTATE.

export interface MobileMenuProps {
    setShowMenu: Function,
    showMenu: boolean,
    LOGGEDIN: boolean,
    LogoutUser: Function
};

// FOR USE IN THE POSTS.TSX FOR PROPS

export interface PostsPropsInt {
    LOADING: boolean, POSTS: null | Array<PostPropsInt>, getPosts: Function
};

// FOR USE IN THE SEARCH.TSX FOR PROPS

export interface SearchPropsInt {
    DATA?: null | Array<PostPropsInt>
    INPUT: searchParameter,
    CATEGORY: searchParameter,
    PRICERANGE: searchParameter | Array<string>,
    LOADING: boolean,
    BGCOLOR?: 'string',
    GetSearch: Function
    setSearchInput: Function,
    setSearchCategory: Function,
    setSearchPriceRange: Function,
};


// FOR USE IN THE SEARCHSELECTOPTIONS.TS to feed SEARCH.TSX

export interface SearchPriceRangeSelectInt {
    value: Array<string>,
    label: string
};

export interface SearchCategorySelectInt {
    value: string,
    label: string
};

// FOR USE IN APP.TSX FOR ROUTES ARRAY

export interface RoutesInt {
    path: string,
    name?: string,
    exact: boolean,
    component: any,
    props?: any
};

// for authlayer


export interface authLayerProps {
    
    CheckUserAuth: Function,
    ATTEMPTEDAUTH: boolean,
    LOGGEDIN: boolean
}

// FOR USER REDUCER

export interface UserReducerInt {
    LOGGEDIN: boolean,
    ATTEMPTEDAUTH: boolean
}