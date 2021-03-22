import axios from 'axios'
import {
    setSearch,
    setLoading,
    SearchInput,
    SearchCategory,
    SearchPriceRange
} from './DispatchTypes'


export const GetSearch:Function = (query:string) => {
    return async (dispatch:Function) => {
        dispatch(setLoading(true));
        const Response = await axios.get(`/api/search${query}`)
        .then((resp) => {
            dispatch(setSearch(resp.data));
            dispatch(setLoading(false));
        })
        .catch((err) => {
            dispatch(setLoading(false));
        })
    }
}

export const setSearchInput = (input:string) => {
    return (dispatch:Function) => {
        dispatch(SearchInput(input))
    }
}

export const setSearchCategory = (category:string) => {
    return (dispatch:Function) => {
        dispatch(SearchCategory(category))
    }
}

export const setSearchPriceRange = (range:string) => {
    return (dispatch:Function) => {
        dispatch(SearchPriceRange(range))
    }
}