import axios from 'axios';
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import EditProfile from './SubSettings/EditProfile';

const Settings = () => {
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ settingsView, setSettingsView ] = useState<string>('edit-profile');
    const [ data, setData ] = useState<any>(null)
    const fetchData = async () => {
        setLoading(true)
        await axios.post('/api/users/settings')
        .then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='w-screen h-screen flex flex-row justify-center'>
            <Helmet>
                <title> Settings | SaveMeMoney </title>
            </Helmet>
            { data && !loading ?
                <div className='flex flex-row h-9/10 lg:w-2/5 border-1 border-lightgrey'>
                    <div className='hidden md:flex md:flex-row lg:w-2/6 h-full border-r-1 border-lightgrey '>
                        <ul className='list-style-none m-0 p-0 hidden lg:flex lg:flex-col w-full'>
                            <li className='p-4 font-bold text-lg w-full text-left border-b-1 border-black' onClick={() => { setSettingsView('edit-profile') }}>
                                Edit Profile
                            </li>
                        </ul>
                    </div>
                    <div className='w-screen lg:w-4/6'>
                    
                                <div>
                                    { settingsView === 'edit-profile' && <EditProfile data={data} username={data.username} bio={data.bio} namehead={data.namehead} email={data.email} pfp={data.pfp} /> }
                                </div>
                        
                    </div>
                </div>
                :
                <img src={'https://savememoneypfp.s3.us-east-2.amazonaws.com/loader.svg'} className='h-32 w-32 m-4' alt='' />
            }
        </div>
    )
}

export default Settings
