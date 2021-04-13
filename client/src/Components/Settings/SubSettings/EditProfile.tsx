import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const EditProfile:React.FC<{ username:string, namehead:string, bio:string, email:string, pfp:string }> = ({ username, namehead, bio, email, pfp }) => {

    const [ usernameInput, setUsernameInput ] = useState<string>(username);
    const [ nameInput, setNameInput ] = useState<string>(namehead);
    const [ bioInput, setBioInput ] = useState<string>(bio);
    const [ emailInput, setEmailInput ] = useState<string>(email);
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
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
