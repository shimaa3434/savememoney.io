import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchLoggedInPFP } from '../../../Redux/Actions/DispatchTypes';

const EditProfile:React.FC<{ username:string, namehead:string, bio:string, email:string, pfp:string, data:any }> = ({ username, namehead, bio, email, pfp, data }) => {

    const [ usernameInput, setUsernameInput ] = useState<string>(username);
    const [ currentpfp, setCurrentPFP ] = useState<string>(pfp);
    const [ nameInput, setNameInput ] = useState<string>(namehead);
    const [ bioInput, setBioInput ] = useState<string>(bio);
    const [ emailInput, setEmailInput ] = useState<string>(email);
    const [ PFPModalStatus, setPFPModalStatus ] = useState<boolean>(false);
    const [ pfploading, setPFPLoading ] = useState<boolean>(false);
    let x:string = pfp;
    const dispatch = useDispatch()

    const handleUploadPFP = async (file:any) => {
        setPFPModalStatus(false)
        const FD = new FormData();
        FD.append('pfp', file, file.name);
        setPFPLoading(true)
        await axios.post('/api/users/uploadnewpfp', FD)
        .then(({ data: { newpfp, status, redirecturl } }) => {
            setPFPLoading(false);
            if (status === 210 && redirecturl) window.location.reload()
            setCurrentPFP(newpfp);
            dispatch(dispatchLoggedInPFP(newpfp))
            let x = newpfp
        }
        )
        .catch(err => console.log(err))
    }

    const handleRemovePFP = async () => {
        setPFPLoading(true)
        await axios.get('/api/users/removecurrentpfp')
        .then(({ data: { newpfp, status, redirecturl } }) => {
            setPFPModalStatus(false)
            dispatch(dispatchLoggedInPFP(newpfp))
            setCurrentPFP(newpfp);
            setPFPLoading(false);
        })
    }

    useEffect(() => {
        setCurrentPFP(x);
    }, [ x ])

    const handleDataChange = async (usernameinput:string, nameinput:string, bioinput:string, emailinput:string) => {
        await axios.post('/api/users/editprofileinfo', { usernameinput, nameinput, bioinput, emailinput })
        .then(({ data: { status, redirecturl } }) => {
            if (status === 210) {
                if (redirecturl) window.location.assign( window.location.origin + redirecturl )
                if (!redirecturl) window.location.reload()
            }
        })
        .catch(err => console.log(err))
    }

    const EnableSubmitButtonOnChange = usernameInput === username && nameInput === namehead && bioInput === bio && emailInput === email ? true : false

    return (
        <div className='w-full flex flex-row justify-center'>
            <div className='w-4/5'>
                <div className='flex flex-row items-center my-4'>
                    <div className='h-14 w-14 rounded-full mx-4'>
                        {
                            pfploading && pfp !== currentpfp ?
                            <img className='h-14 w-14 rounded-full object-cover' src={'https://savememoneypfp.s3.us-east-2.amazonaws.com/loader.svg'} alt='' />
                            :
                            <img src={currentpfp} className='h-14 w-14 rounded-full object-cover cursor-pointer' alt='' onClick={ () => { setPFPModalStatus(true) } } />
                        }
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-xl'>{ username }</h1>
                        <span className='font-bold text-blue-600 cursor-pointer' onClick={() => { setPFPModalStatus(true); document.body.style.overflowY = 'hidden'}}>
                            Change Profile Photo
                        </span>
                    </div>
                </div>
                <form className='flex flex-col items-center w-full' onSubmit={ (event) => { event.preventDefault(); handleDataChange(usernameInput, nameInput, bioInput, emailInput) } }>
                    <div className='flex flex-row w-full my-4'>
                        <div className='flex flex-row items-center justify-left w-1/2'>
                            <label className='font-bold' htmlFor='namehead'>Name</label>
                        </div>
                        <input className='border-2 border-blue-600 py-2 px-2 rounded-lg outline-none w-full' value={ nameInput } placeholder='Name' id='namehead' onChange={({ target: { value } }) => { setNameInput(value) }} />
                    </div>
                    <div className='flex flex-row w-full my-4'>
                        <div className='flex flex-row items-center justify-left w-1/2'>
                            <label className='font-bold' htmlFor='username'>Username</label>
                        </div>
                        <input className='border-2 border-blue-600 py-2 px-2 rounded-lg outline-none w-full' value={ usernameInput } placeholder='Username' id='username' onChange={({ target: { value } }) => { setUsernameInput(value) }} />
                    </div>
                    <div className='flex flex-row w-full my-4'>
                        <div className='flex flex-row items-top justify-left w-1/2'>
                            <label className='font-bold' htmlFor='bio'>Bio</label>
                        </div>
                        <textarea className='border-2 border-blue-600 py-2 px-2 rounded-lg outline-none w-full' value={ bioInput } placeholder='Bio' id='bio' onChange={({ target: { value } }) => { setBioInput(value) }} />
                    </div>
                    <div className='flex flex-row w-full my-4'>
                        <div className='flex flex-row items-center justify-left w-1/2'>
                            <label className='font-bold' htmlFor='email'>Email</label>
                        </div>
                        <input className='border-2 border-blue-600 py-2 px-2 rounded-lg outline-none w-full' value={ emailInput } placeholder='Email' id='email' onChange={({ target: { value } }) => { setEmailInput(value) }} />
                    </div>
                    <button type='submit' disabled={EnableSubmitButtonOnChange} className={`flex flex-col items-center justify-center py-2 px-6 rounded text-white ${EnableSubmitButtonOnChange ? 'bg-blue-300' : 'bg-blue-600'}`}>
                        Submit
                    </button>
                </form>
            </div>
            {
                PFPModalStatus &&
                    <Modal isOpen={PFPModalStatus} ariaHideApp={false} onRequestClose={() => { setPFPModalStatus(false) }} shouldCloseOnOverlayClick={true} overlayClassName={'flex flex-row justify-center fixed items-center h-screen w-screen z-10 bg-modalunderlay top-0 left-0 right-0 bottom-0'}
                    className={'w-4/5 h-2/5 rounded-lg bg-white outline-none flex flex-col items-center lg:w-1/5 lg:h-1/4 py-2 px-0'}>
                        <div className='font-bold text-2xl py-4 border-b-2 border-lightgrey w-full text-center'>
                            PROFILE PHOTO
                        </div>
                        <ul className='list-style-none flex flex-col items-center m-0 p-0 w-full'>
                        <li className='z-40 fixed w-4/6 border-b-2 bg-white border-lightgrey h-14 flex text-center flex-row justify-center items-center cursor-pointer p-0 lg:w-1/5'>
                            <input type='file' className='border-2 border-black z-30 w-4/5 h-14 opacity-0 fixed cursor-pointer p-0 lg:w-1/5' onChange={({ target: { files } }) => {
                                if (files) handleUploadPFP( files[files.length - 1] )
                    
                            }}/>
                            Upload Profile Photo
                        </li>
                        <li className='w-full relative border-b-2 bg-white border-lightgrey h-14 flex text-center flex-row justify-center items-center cursor-pointer lg:w-1/5'>
                            
                        </li>
                        <li className='w-full border-b-2 bg-white border-lightgrey h-14 flex cursor-pointer flex-row items-center justify-center' onClick={handleRemovePFP}>
                            Remove Profile Photo
                        </li>
                        <li className='w-full border-b-2 bg-white border-lightgrey h-14 flex cursor-pointer flex-row items-center justify-center' onClick={() => { setPFPModalStatus(false) }}>
                            Cancel
                        </li>
                        </ul>
                    </Modal>
            }
        </div>
    )
}

export default EditProfile
