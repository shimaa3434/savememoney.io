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
        setLoading(true);
        const Response = await axios.get(`/api/search${query}`)
        .then((resp) => {
            console.log(resp.data)
            dispatch(setSearch(resp.data));
            dispatch(setLoading(false));
        })
        .catch((err) => {
            console.log('bruh')
            dispatch(setLoading(false));
        })
    }
}

export const setSearchInput = (input:string) => {
    console.log(input)
    return (dispatch:Function) => {
        dispatch(SearchInput(input))
    }
}

export const setSearchCategory = (category:string) => {
    console.log(category    )
    return (dispatch:Function) => {
        dispatch(SearchCategory(category))
    }
}

export const setSearchPriceRange = (range:string) => {
    console.log(range)
    return (dispatch:Function) => {
        dispatch(SearchPriceRange(range))
    }
}