import {searchParameter} from './App Types';
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
    setShowMenu: Function
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
    PRICERANGE: searchParameter,
    LOADING: boolean,
    BGCOLOR?: 'string',
    GetSearch: Function
    setSearchInput: Function,
    setSearchCategory: Function,
    setSearchPriceRange: Function,
};


// FOR USE IN THE SEARCHSELECTOPTIONS.TS to feed SEARCH.TSX

export interface SearchPriceRangeSelectInt {
    value: Array<number>,
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