import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createpostProps } from '../TypeScript/App Interfaces'
import {CreateAPost} from '../Redux/Actions/CreatePostActions'
import LoadingIcon from '../Media/Images/loading.svg'
import Select from 'react-select'
import { GroupSelectOptions } from './Search/SearchSelectOptions'
import { TextField } from '@material-ui/core';
const CreatePost:React.FC<createpostProps> = ({ CreateAPost, MESSAGE, LOADING }) => {

    const [ price, setPrice ] = useState<string>('')
    const [ category, setCategory ] = useState<string>('')
    const [ url, setURL ] = useState<string>('')
    const [ title, setTitle ] = useState<string>('')
    const [ descript, setDescript ] = useState<string>('')
    const [ imageFile, setImageFile ] = useState<any>({});
    const FD = new FormData();

    return (
    <form className='w-screen flex flex-col items-center py-10' onSubmit={(event:any) => {event.preventDefault();}}>
        <TextField className='w-4/5 h-14 my-6 border-2 rounded pl-4 border-blue-800 md:w-2/4 lg:w-1/3' value={url} placeholder='Enter the product link' onChange={({ target: { value } }) => { setURL(value) }} />
        <TextField className='w-4/5 h-14 my-6 border-2 rounded pl-4 border-blue-800 md:w-2/4 lg:w-1/3' value={price} placeholder='Enter the sale price' onChange={({ target: { value } }) => { setPrice(value) }} />
        <TextField className='w-4/5 h-14 my-6 border-2 rounded pl-4 border-blue-800 md:w-2/4 lg:w-1/3' value={title} placeholder='Enter the title' onChange={({ target: { value } }) => { setTitle(value) }} />
        <TextField className='w-4/5 h-14 my-6 border-2 rounded pl-4 border-blue-800 md:w-2/4 lg:w-1/3' value={descript} placeholder='Enter the description' onChange={({ target: { value } }) => { setDescript(value) }} />
        <input type='file' onChange={({ target: { files } }) => { if ( files ) { setImageFile(files[ files.length - 1 ]) } }}/>
        <Select options={GroupSelectOptions} isClearable={true} label='Category' className='my-6 w-4/5 md:w-2/4 lg:w-1/3' onChange={(event:any) => {
            if (event.value) {
                setCategory(event.value)
            } else {
                setCategory('')
            }
        }} />
        <button className='ring-4 ring-blue-200 text-white text-xl font-bold bg-blue-800 px-4 py-4 w-3/5 rounded-full md:w-1/5' type='submit' onClick={
            event => {
                if (url !== '' && price !== '' && category !== '' && title !== '' && descript !== '' && imageFile !== {}) {
                    FD.append('url', url)
                    FD.append('price', price)
                    FD.append('category', category)
                    FD.append('title', title)
                    FD.append('descript', descript)
                    FD.append('image', imageFile, imageFile.name)
                    CreateAPost(FD)
                }
            }}>
            
            POST
        
        </button>
        {LOADING && <img src={LoadingIcon} alt='loading icon' />}
        {MESSAGE && <span>{MESSAGE.message}</span>}
    </form>
    )
}

const mapStateToProps = (store:any) => {
    const { CreatePostState: { MESSAGE, LOADING } } = store;
    
    return {
        MESSAGE, LOADING
    }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        CreateAPost: (FD:FormData) => {dispatch(CreateAPost(FD))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)