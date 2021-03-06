
import Timeline from '../Timeline/Timeline';
import React from 'react'
import Login from '../Login';
import { connect } from 'react-redux';
import { homeProps } from '../../TypeScript/App Interfaces';

const Home:React.FC<homeProps> = ({ LOGGEDIN }) => {

    return (

    <div>
        {LOGGEDIN ? 
            (
                <Timeline />
            )
        :
            (
                <div className='flex flex-col items-center w-screen bg-white'>
                    <Login />
                </div>
            )
        }
    </div>
    )
}

const mapStateToProps = (store:any) => {
    const { UserState: { LOGGEDIN } } = store;
    return { 
        LOGGEDIN
     }
}


export default connect(mapStateToProps)(Home);