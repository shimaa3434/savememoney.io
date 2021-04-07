import React, {useEffect, useState} from 'react'
import { postcollectionProps, PostPropsInt, profilepostcardProps } from '../TypeScript/App Interfaces'
import Post from './PostCard/PostCard';
import {connect} from 'react-redux'
import { GetProfile } from '../Redux/Actions/ProfileActions';
import ProfilePostCardVariant from './ProfilePostCardVariant';
import Modal from 'react-modal'
import { Link } from 'react-router-dom';


const Profile:React.FC<{match:any, DATA:any, LOADING:boolean, username:string, bio:string, namehead:string, GetProfile:Function}>
= ({match, LOADING, username, bio, namehead, DATA, GetProfile}) => {

    const [ view, setView ] = useState<number>(0);
    const [ profiletimeline, setProfileTimeline ] = useState<number>(18);
    const [ profileoverview, setProfileOverview ] = useState<number>(18);
    const [ showFollowers, setShowFollowers ] = useState<boolean>(false);
    const [ showFollowing, setShowFollowing ] = useState<boolean>(false);
    useEffect(() => {
        GetProfile(match.params.username);
    }, [match.params.username])

    return (
        <div className='flex flex-row justify-center w-screen'>
            { DATA && DATA.status !== 400 ?
            <div className='border-b-2 border-gray-500 w-screen flex flex-col items-center lg:w-1/2'>
                <div className='flex flex-col w-full items-center'>
                    <span className='text-2xl my-4'>{`@${DATA.userdata.username}`}</span>
                    <span className='my-2 font-bold'>{DATA.userdata.namehead}</span>
                    <span className='my-2 text-left'>{`Bio: ${DATA.userdata.bio}`}</span>
                    <div>
                        <span onClick={() => { setShowFollowers(true) }}>
                            { DATA.followdata.followers.length } Followers
                        </span>
                        { showFollowers &&
                            <Modal isOpen={showFollowers} onRequestClose={() => { setShowFollowers(false) }}
                                shouldCloseOnOverlayClick={true} overlayClassName={'flex flex-row justify-center fixed items-center h-screen w-screen z-10 bg-modalunderlay top-0 left-0 right-0 bottom-0'}
                                className={'w-4/5 h-2/5 rounded-lg bg-white outline-none flex flex-col items-center lg:w-1/5 lg:h-2/4 py-2'}
                            >   
                                <h1 className='text-gray-400 w-full text-center border-b-2 border-lightgrey my-0 px-0 py-2'>
                                    FOLLOWERS
                                </h1>
                                <ul className='list-style-none flex flex-col items-center m-0 p-0 w-full'>
                                    {
                                        DATA.followdata.followers.map(({ followedbyuser }:{followedbyuser:string}, i:number) => {
                                            return <Link to={`/users/${followedbyuser}`} onClick={() => { setShowFollowers(false) }}>
                                                        { followedbyuser }
                                                   </Link>
                                        })
                                    }
                                </ul>
                            </Modal>
                        }
                        <span onClick={() => { setShowFollowing(true) }}>
                            { DATA.followdata.following.length } Following
                        </span>
                        { showFollowing &&
                            <Modal isOpen={showFollowing} onRequestClose={() => { setShowFollowing(false) }}
                                shouldCloseOnOverlayClick={true} overlayClassName={'flex flex-row justify-center fixed items-center h-screen w-screen z-10 bg-modalunderlay top-0 left-0 right-0 bottom-0'}
                                className={'w-4/5 h-2/5 rounded-lg bg-white outline-none flex flex-col items-center lg:w-1/5 lg:h-2/4 py-2'}
                            >   
                                <h1 className='text-gray-400 w-full text-center border-b-2 border-lightgrey my-0 px-0 py-2'>
                                    FOLLOWERS
                                </h1>
                                <ul className='list-style-none flex flex-col items-center m-0 p-0 w-full'>
                                    {
                                        DATA.followdata.following.map(({ followinguser }:{followinguser:string}, i:number) => {
                                            return <Link to={`/users/${followinguser}`} onClick={() => { setShowFollowing(false) }}>
                                                        { followinguser }
                                                   </Link>
                                        })
                                    }
                                </ul>
                            </Modal>
                        }
                    </div>
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
            :
            <div>Not found.</div>
            }
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
