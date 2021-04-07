import { ReactNode } from 'react';
import {searchParameter} from './App Types';


export interface profileReducer {
    LOADING: boolean,
    DATA: null | {
        message: string,
        posts: Array<{
            title: string,
            id: number,
            category: string,
            image: string,
            url: string,
            tstamp: number,
            price: string,
            urldomain: string,
            user_name: string,
            descript: string,
            upvotes: number,
            downvotes: number,
            namehead: string
        }>,
        userdata: {
            namehead: string,
            bio: string,
            username: string
        },
        status: number
    }
}

export interface registerProps {
    LOADING:boolean,
    MESSAGE:{message:string, err?:any} | null,
    RegisterUser:Function
}

export interface registerReducer {
    LOADING:boolean,
    MESSAGE:{message:string, err?:any} | null
}

export interface profilepostcardProps {
    upvotes: number,
    price: string,
    downvotes: number,
    category: string,
    user_name: string,
    id: number,
    image: string,
    title:string,
    tstamp: number
}

// homeprops


export interface homeProps {
    LOGGEDIN: boolean
}



// saved posts

// CHANGE THE | NULL PIPES. SET THE SQL QUERY FOR CREATE POSTS ON BACKEND DEFAULT UPVOTES AND DOWNVOTES TO 0, SO NUMERICAL. MAYBE COMMENTS

export interface postcollectionProps {
    post_id: number,
    user_name: string,
    category: string,
    image: string,
    upvotes: number | null,
    downvotes: number | null,
    tstamp: number,
    id: number
}


// for createpost compoenent

export interface createPostReducer {
    LOADING: boolean,
    MESSAGE: {message: string, err?: any, redirecturl: string} | null
}

export interface createpostProps {
    CreateAPost: Function,
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
    postid?: string, title?: string,
    category: string, image: string,
    url?: string, urldomain?: string,
    tstamp: number, price?: string, id:number
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
    LOADING: boolean, POSTS: null | Array<PostPropsInt&postcollectionProps>, getPosts: Function
};

// FOR USE IN THE SEARCH.TSX FOR PROPS

export interface SearchPropsInt {
    DATA?: null | Array<PostPropsInt& postcollectionProps>
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
    ATTEMPTEDAUTH: boolean,
    LOGGEDINUSERNAME: string | null
}