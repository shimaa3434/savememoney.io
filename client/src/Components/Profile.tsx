import React, {useEffect, useState} from 'react'
import { postcollectionProps, PostPropsInt, profilepostcardProps } from '../TypeScript/App Interfaces'
import Post from './PostCard/PostCard';
import {connect} from 'react-redux'
import { GetProfile } from '../Redux/Actions/ProfileActions';
import ProfilePostCardVariant from './ProfilePostCardVariant';

const Profile:React.FC<{match:any, DATA:any, LOADING:boolean, username:string, bio:string, namehead:string, GetProfile:Function}>
= ({match, LOADING, username, bio, namehead, DATA, GetProfile}) => {

    const [ view, setView ] = useState<number>(0);
    useEffect(() => {
        GetProfile(match.params.username);
    }, [match.params.username])

    return (
        <div className='flex flex-row justify-center w-screen'>
            <div className='border-b-2 border-gray-500 w-1/2 flex flex-col items-center'>
                <div className='flex flex-col w-full items-center'>

                    <span className='text-2xl my-4'>{DATA && `@${DATA.userdata.username}`}</span>
                    <span className='my-2 font-bold'>{DATA && DATA.userdata.namehead}</span>
                    <span className='my-2 text-left'>{DATA && `Bio: ${DATA.userdata.bio}`}</span>
                </div>
                <ul className='list-style-none w-full flex flex-row'>
                    <li className='w-1/2 text-center py-4 border-b-2 border-t-2 border-lightgrey' onClick={() => { setView(0) }}>
                        General
                    </li>
                    <li className='w-1/2 text-center py-4 border-b-2 border-t-2 border-lightgrey' onClick={() => { setView(1) }}>
                        Timeline
                    </li>
                </ul>
                {
                    view === 0 &&
                        <div className='grid grid-cols-3 w-full items-center my-10'>
                            {
                                DATA && DATA.posts.length > 0 &&
                                    DATA.posts.map(({ upvotes, downvotes, price, category, user_name, id, image, title, tstamp}:profilepostcardProps) => {
                                        return <ProfilePostCardVariant upvotes={upvotes} downvotes={downvotes}
                                        price={price} category={category} user_name={user_name} id={id} image={image}
                                        title={title} tstamp={tstamp}
                                        />
                                    })
                            }
                        </div>
                }
                {
                    view === 1 && <div className='flex flex-row justify-center w-screen'>
                        <div className='flex flex-col items-center w-screen lg:w-2/5 my-10'>
                            {
                                DATA && DATA.posts.length > 0 &&
                                    DATA.posts.map(({title, category, image, url, urldomain, tstamp, price, post_id, user_name, upvotes, downvotes, id}:PostPropsInt&postcollectionProps, i:number) => {
                                    return <Post title={title} category={category} image={image} url={url} tstamp={tstamp} price={price} urldomain={urldomain}
                                    post_id={post_id} user_name={user_name} upvotes={upvotes} downvotes={downvotes} id={id}
                                    />
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (store:any) => {
    const { ProfileState: { DATA, LOADING } } = store;
    return { DATA, LOADING }
}

const mapDispatchToProps = (dispatch:Function) => {
    return { GetProfile: (usernameparameter:string) => {dispatch(GetProfile(usernameparameter))} }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
