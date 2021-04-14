<<<<<<< HEAD
import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

const EditProfile:React.FC<{ username:string, namehead:string, bio:string, email:string, pfp:string, data:any }> = ({ username, namehead, bio, email, pfp, data }) => {
    console.log(data)
=======
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const EditProfile:React.FC<{ username:string, namehead:string, bio:string, email:string, pfp:string }> = ({ username, namehead, bio, email, pfp }) => {

>>>>>>> 129d9cba2feb368568a009ba7a154c4fa413dd30
    const [ usernameInput, setUsernameInput ] = useState<string>(username);
    const [ nameInput, setNameInput ] = useState<string>(namehead);
    const [ bioInput, setBioInput ] = useState<string>(bio);
    const [ emailInput, setEmailInput ] = useState<string>(email);
<<<<<<< HEAD
    const [ PFPModalStatus, setPFPModalStatus ] = useState<boolean>(false);

    const handleUploadPFP = async (file:any) => {
        const FD = new FormData();
        FD.append('pfp', file, file.name);
        await axios.post('/api/users/uploadnewpfp', FD)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    const EnableSubmitButtonOnChange = usernameInput === username && nameInput === namehead && bioInput === bio && emailInput === email ? true : false

    return (
        <div className='w-full flex flex-row justify-center'>
            <div className='w-4/5'>
                <div className='flex flex-row'>
                    <img src={pfp} className='h-10 w-10 rounded-full' alt='' />
                    <div className='flex flex-col'>
                        <h1>{ username }</h1>
                        <span className='font-bold text-blue-600 cursor-pointer' onClick={() => { setPFPModalStatus(true); document.body.style.overflowY = 'hidden'}}>
                            Change Profile Photo
                        </span>
                    </div>
                </div>
                <form className='flex flex-col items-center w-full'>
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
                    <button disabled={EnableSubmitButtonOnChange} className={`py-2 px-6 rounded text-white ${EnableSubmitButtonOnChange ? 'bg-blue-300' : 'bg-blue-600'}`}>
=======
    const DisableSubmitButtonOnChange = usernameInput === username && nameInput === namehead && bioInput === bio && emailInput === email ? false : true

    return (
        <div className='w-3/5 flex flex-row justify-start'>
            <div className=''>
                {/* <img src={} alt='' /> */}
                <form className='flex flex-col'>
                    <label htmlFor='namehead'>Name</label>
                    <input value={ nameInput } placeholder='Name' id='namehead' onChange={({ target: { value } }) => { setNameInput(value) }} />
                    <label htmlFor='username'>Username</label>
                    <input value={ usernameInput } placeholder='Username' id='username' onChange={({ target: { value } }) => { setUsernameInput(value) }} />
                    <label htmlFor='bio'>Bio</label>
                    <input value={ bioInput } placeholder='Bio' id='bio' onChange={({ target: { value } }) => { setBioInput(value) }} />
                    <label htmlFor='email'>Email</label>
                    <input value={ emailInput } placeholder='Email' id='email' onChange={({ target: { value } }) => { setEmailInput(value) }} />
                    <button disabled={DisableSubmitButtonOnChange} className='py-2 px-4 rounded bg-blue-600 text-white'>
>>>>>>> 129d9cba2feb368568a009ba7a154c4fa413dd30
                        Submit
                    </button>
                </form>
            </div>
<<<<<<< HEAD
            {
                PFPModalStatus &&
                    <Modal isOpen={PFPModalStatus} onRequestClose={() => { setPFPModalStatus(false) }} shouldCloseOnOverlayClick={true} overlayClassName={'flex flex-row justify-center fixed items-center h-screen w-screen z-10 bg-modalunderlay top-0 left-0 right-0 bottom-0'}
                    className={'w-4/5 h-2/5 rounded-lg bg-white outline-none flex flex-col items-center lg:w-1/5 lg:h-2/4 py-2 px-0'}>
                        <ul className='list-style-none flex flex-col items-center m-0 p-0'>
                        <li className='z-40 fixed w-4/5 border-2 bg-white border-tangerine h-14 flex text-center flex-row justify-center items-center'>
                            <input type='file' className='border-2 border-black z-30 w-4/5 h-14 opacity-0 fixed' onChange={({ target: { files } }) => {
                                if (files) handleUploadPFP( files[0] )
                            }}/>
                            Upload Profile Photo
                        </li>
                        </ul>
                    </Modal>
            }
=======
>>>>>>> 129d9cba2feb368568a009ba7a154c4fa413dd30
        </div>
    )
}

export default EditProfile
