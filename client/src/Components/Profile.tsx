import React, {useEffect} from 'react'
import { PostPropsInt } from '../TypeScript/App Interfaces'
import Post from './Post/PostCard';
import {connect} from 'react-redux'
import { GetProfile } from '../Redux/Actions/ProfileActions';

const Profile:React.FC<{match:any, DATA:any, LOADING:boolean, username:string, bio:string, namehead:string, GetProfile:Function}>
= ({match, LOADING, username, bio, namehead, DATA, GetProfile}) => {


    useEffect(() => {
        GetProfile(match.params.username);
    }, [match.params.username])

    return (
        <div>
            <div className='border-b-2 border-gray-500'>
                <div className='flex flex-col w-screen items-center'>

                    <span className='text-2xl my-4'>{username && `@${username}`}</span>
                    <span className='my-2 font-bold'>{namehead && namehead}</span>
                    <span className='my-2 text-left'>{bio && `Bio: ${bio}`}</span>
                </div>
                {DATA && DATA.map((post:PostPropsInt) => {
                    const { title, category, image, url, tstamp, price, urldomain } = post;
                    return <Post title={title} category={category} image={image} url={url} tstamp={tstamp} price={price} urldomain={urldomain} />
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (store:any) => {
    const { ProfileState } = store;
    const { DATA, LOADING, username, bio, namehead } = ProfileState;

    return {
        DATA, LOADING, username, bio, namehead
    }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        GetProfile: (usernameparameter:string) => {dispatch(GetProfile(usernameparameter))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
