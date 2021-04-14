import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import ChangePassword from './SubSettings/ChangePassword';
import EditProfile from './SubSettings/EditProfile';

const Settings = () => {
    const LOGGEDINUSERNAME = useSelector((store:any) => store.UserState.LOGGEDINUSERNAME)
    const [ settingsView, setSettingsView ] = useState<string>('edit-profile');
    const [ data, setData ] = useState<any>(null)
    const fetchData = async () => {
        await axios.post('/api/users/settings')
        .then(({ data }) => {
            setData(data)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='w-screen h-screen flex flex-row justify-center'>
            <div className='flex flex-row h-9/10 lg:w-2/5 border-2 border-black'>
<<<<<<< HEAD
                <div className='hidden md:flex md:flex-row lg:w-2/6 h-full border-2 border-black'>
=======
                <div className='lg:w-2/6 h-full border-2 border-black'>
>>>>>>> 129d9cba2feb368568a009ba7a154c4fa413dd30
                    <ul className='list-style-none m-0 p-0'>
                        <li className='my-4 font-bold text-lg' onClick={() => { setSettingsView('edit-profile') }}>
                            Edit Profile
                        </li>
                        <li className='my-4 font-bold text-lg' onClick={() => { setSettingsView('change-password') }}>
                            Change Password
                        </li>
                    </ul>
                </div>
<<<<<<< HEAD
                <div className='w-screen lg:w-4/6'>
                    {
                        data &&
                            <div>
                                { settingsView === 'edit-profile' && <EditProfile data={data} username={data.username} bio={data.bio} namehead={data.namehead} email={data.email} pfp={data.pfp} /> }
                                { settingsView === 'change-password' && <ChangePassword username={data.username} pfp={data.pfp} /> }
                            </div>
=======
                <div className='lg:w-4/6'>
                    {
                        data && <div>
                                    { settingsView === 'edit-profile' && <EditProfile username={data.username} bio={data.bio} namehead={data.namehead} email={data.email} pfp={data.pfp} /> }
                                    { settingsView === 'change-password' && <ChangePassword username={data.username} pfp={data.pfp} /> }
                                </div>
>>>>>>> 129d9cba2feb368568a009ba7a154c4fa413dd30
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Settings
