import React from 'react'
import { connect } from 'react-redux'
import { createpostProps } from '../TypeScript/App Interfaces'
import {CreateAPost, setCategory, setPrice, setURL} from '../Redux/Actions/CreatePostActions'
import LoadingIcon from '../Media/Images/loading.svg'
import Select from 'react-select'
import { GroupSelectOptions } from './Search/searchSelectOptions'

const CreatePost:React.FC<createpostProps> = ({ CATEGORY, URL, PRICE, CreateAPost, setURL, setPrice, setCategory, MESSAGE, LOADING}) => {
    return (
    <form className='w-screen flex flex-col items-center py-10' onSubmit={(event:any) => {event.preventDefault();}}>
        <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={URL} placeholder='Enter the product link' onChange={(event:any) => {setURL(event.target.value)}} />
        <input className='w-4/5 h-10 my-4 border-2 rounded pl-4 py-6 border-blue-800 md:w-1/3' value={PRICE} placeholder='Enter the sale price' onChange={(event:any) => {setPrice(event.target.value)}} />
        <Select options={GroupSelectOptions} isClearable={true} label='Category' className='my-6 w-4/5 md:w-1/3 lg:w-1/6' onChange={(event:any) => {
            if (event.value) {
                setCategory(event.value)
            } else {
                setCategory('')
            }
        }} />
        <button className='ring-4 ring-blue-200 text-white text-xl font-bold bg-blue-800 px-4 py-4 w-3/5 rounded-full md:w-1/5' type='submit' onClick={(event:any) => {if (URL !== '' && PRICE !== '' && CATEGORY !== '') CreateAPost(URL, CATEGORY, PRICE);}}>
            
            POST
        
        </button>
        {LOADING && <img src={LoadingIcon} alt='loading icon' />}
        {MESSAGE && <span>{MESSAGE.message}</span>}
    </form>
    )
}

const mapStateToProps = (store:any) => {
    const { CreatePostState } = store;
    const { CATEGORY, URL, PRICE, MESSAGE, LOADING } = CreatePostState;
    
    return {
        CATEGORY, URL, PRICE, MESSAGE, LOADING
    }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        CreateAPost: (URL:string, CATEGORY:string, PRICE:string) => {dispatch(CreateAPost(URL, CATEGORY, PRICE))},
        setCategory: (CATEGORY:string) => {dispatch(setCategory(CATEGORY))},
        setPrice: (PRICE:string) => {dispatch(setPrice(PRICE))},
        setURL: (URL:string) => {dispatch(setURL(URL))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)