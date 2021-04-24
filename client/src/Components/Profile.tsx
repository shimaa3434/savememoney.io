import React, {useEffect, useState} from 'react'
import { postcollectionProps, PostPropsInt, profilepostcardProps } from '../TypeScript/App Interfaces'
import Post from './PostCard/PostCard';
import {connect} from 'react-redux'
import { GetProfile } from '../Redux/Actions/ProfileActions';
import ProfilePostCardVariant from './ProfilePostCardVariant';
import Modal from 'react-modal'
import { Link, Redirect } from 'react-router-dom';
import PostCard from './PostCard/PostCard';
import FollowAccountListItem from './Timeline/FollowAccountListItem';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Profile:React.FC<{match:any, DATA:any, LOADING:boolean, GetProfile:Function, LOGGEDINUSERNAME:string}>
= ({match, LOADING, DATA, GetProfile, LOGGEDINUSERNAME}) => {

    const [ view, setView ] = useState<number>(0);
    const [ profiletimeline, setProfileTimeline ] = useState<number>(18);
    const [ profileoverview, setProfileOverview ] = useState<number>(18);
    const [ showFollowers, setShowFollowers ] = useState<boolean>(false);
    const [ showFollowing, setShowFollowing ] = useState<boolean>(false);
    let isLoggedInUserAFollowerStatus = false;  let followerscount:number = 0; let followingcount:number = 0; let followers:any[] = []; let following:any[] = [];

    if ( DATA ) { isLoggedInUserAFollowerStatus = DATA.followdata.loggedinuserisfollower; followerscount = DATA.followdata.followers.length; followers = DATA.followdata.followers; followingcount = DATA.followdata.following.length; following = DATA.followdata.following; }
    
    const [ newfollowers, setNewFollowers ] = useState<any[]|undefined>(undefined);
    const followUser = async (usertofollow:string) => {
        await axios.post('/api/users/follow', { usertofollow })
        .then(( { data: { newfollowers, newIsLoggedInUserAFollowerStatus, status } } ) => {
            if (status === 210) window.location.reload()
        })
    }

    

    
    const unfollowUser = async (usertounfollow:string) => {
        await axios.post('/api/users/unfollow', { usertounfollow })
        .then(( { data: { newfollowers, newIsLoggedInUserAFollowerStatus, status } } ) => {
            if (status === 210) window.location.reload()
        })
    }

    useEffect(() => {
        setView(0);
        GetProfile(match.params.username);
    }, [match.params.username])

    return (
        <div className='flex flex-row justify-center w-screen'>
            <Helmet>
                <title> @{ match.params.username }'s profile | SaveMeMoney </title>
            </Helmet>
            {
            !LOADING ? <div className='flex flex-row justify-center w-screen'>
            {
                DATA &&
                    <div className='flex flex-row justify-center w-screen'>
                        {
                            DATA.status === 210 &&
                                <div className='w-screen flex flex-col items-center lg:w-1/2'>
                                    <div className='flex flex-col w-full items-center'>
                                        <div className='flex flex-col lg:flex-row w-full items-center py-6'>
                                            <div className='h-full lg:w-1/4 flex flex-col items-center justify-center'>
                                                <img src={DATA.userdata.pfp} alt={`${DATA.userdata.username}'s profile picture image.`} className='h-32 w-32 rounded-full border-2 border-blue-600' />
                                            </div>
                                            <div className='flex flex-col items-center lg:items-start'>
                                                <span className='text-3xl font-thin my-2'>{`@${DATA.userdata.username}`}</span>
                                                <div className='my-2'>
                                                    <span className='mr-4'>
                                                        { DATA.posts.length } Posts
                                                    </span>
                                                    <span className='mr-4 cursor-pointer' onClick={() => {
                                                        if (followerscount > 0) {
                                                            setShowFollowers(true) }}
                                                        }
                                                    >
                                                        { followerscount } Followers
                                                    </span>
                                                    { showFollowers &&
                                                        <Modal isOpen={showFollowers} onRequestClose={() => { setShowFollowers(false) }}
                                                            shouldCloseOnOverlayClick={true} overlayClassName={'flex flex-row justify-center fixed items-center h-screen w-screen z-10 bg-modalunderlay top-0 left-0 right-0 bottom-0'}
                                                            className={'w-4/5 h-2/5 rounded-lg bg-white outline-none flex flex-col items-center lg:w-1/5 lg:h-2/4 py-2'}
                                                        >   
                                                            <h1 className='text-black w-full text-center border-b-2 border-lightgrey my-0 px-0 py-2'>
                                                                FOLLOWERS
                                                            </h1>
                                                            <ul className='list-style-none flex flex-col items-center m-0 p-0 w-full h-full overflow-y-scroll'>
                                                                {
                                                                    DATA.followdata.followers.map(({ followedbyuser, pfp, namehead }:{followedbyuser:string, pfp:string, namehead: string}, i:number) => {
                                                                        return <FollowAccountListItem
                                                                            accountusername={ followedbyuser } pfp={ pfp }
                                                                            namehead={ namehead } type={ 'followedbyuser' }
                                                                            ofaccount={ match.params.username }
                                                                            closeModal={setShowFollowers}
                                                                        />
                                                                    })
                                                                }
                                                            </ul>
                                                        </Modal>
                                                    }
                                                    <span className='mr-4 cursor-pointer' onClick={() => {
                                                        if (followingcount > 0) {
                                                            setShowFollowing(true)
                                                        }
                                                    }}>
                                                        { followingcount } Following
                                                    </span>
                                                    { showFollowing &&
                                                        <Modal isOpen={showFollowing} onRequestClose={() => { setShowFollowing(false) }}
                                                            shouldCloseOnOverlayClick={true} overlayClassName={'flex flex-row justify-center fixed items-center h-screen w-screen z-10 bg-modalunderlay top-0 left-0 right-0 bottom-0'}
                                                            className={'w-4/5 h-2/5 rounded-lg bg-white outline-none flex flex-col items-center lg:w-1/5 lg:h-2/4 py-2'}
                                                        >   
                                                            <h1 className='text-black font-bold w-full text-center border-b-2 border-lightgrey my-0 px-0 py-2'>
                                                                FOLLOWING
                                                            </h1>
                                                            <ul className='list-style-none flex flex-col items-center m-0 p-0 w-full h-full overflow-y-scroll'>
                                                                {
                                                                    DATA.followdata.following.map(({ followinguser, pfp, namehead }:{followinguser:string, pfp:string, namehead:string}, i:number) => {
                                                                        return <FollowAccountListItem
                                                                            accountusername={ followinguser } pfp={ pfp }
                                                                            namehead={ namehead } type={ 'followinguser' }
                                                                            ofaccount={ match.params.username }
                                                                            closeModal={setShowFollowing}
                                                                        />
                                                                    })
                                                                }
                                                            </ul>
                                                        </Modal>
                                                    }
                                                </div>
                                                {
                                                    isLoggedInUserAFollowerStatus
                                                    ?
                                                    <div className={`${ LOGGEDINUSERNAME === match.params.username ? 'hidden' : 'block' }`}>
                                                        {
                                                        <button className='px-4 text-xl text-black border-1 border-black rounded' onClick={() => {
                                                            unfollowUser(match.params.username)
                                                        }}>
                                                            Unfollow
                                                        </button>
                                                        }
                                                    </div>
                                                    :
                                                    <div className={`${ LOGGEDINUSERNAME === match.params.username ? 'hidden' : 'block' }`}>
                                                        <button className='px-4 text-xl text-black border-1 border-black rounded' onClick={() => {
                                                            followUser(match.params.username)
                                                        }}>
                                                            Follow
                                                        </button>
                                                    </div>
                                                }
                                                <div className='flex flex-col w-full items-center lg:items-start '>
                                                    <span className='mt-2 font-bold'>{DATA.userdata.namehead}</span>
                                                    <span className='mb-2 text-left'> {DATA.userdata.bio} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className='list-style-none w-full flex flex-row'>
                                        <li className='w-1/2 text-center py-4 border-b-2 border-t-2 border-lightgrey cursor-pointer' onClick={() => { setView(0) }}>
                                            General
                                        </li>
                                        <li className='w-1/2 text-center py-4 border-b-2 border-t-2 border-lightgrey cursor-pointer' onClick={() => { setView(1) }}>
                                            Timeline
                                        </li>
                                    </ul>
                                    {
                                        view === 0 &&
                                            <div className='w-full items-center flex flex-col'>
                                                {
                                                    DATA.posts.length > 0 ?
                                                        <div className='flex flex-col md:grid md:grid-cols-3 w-full items-center mt-4 mb-20 md:my-10'>
                                                            {
                                                                DATA.posts.map(({ upvotes, price, category, user_name, id, image, title, tstamp}:profilepostcardProps) => {
                                                                    return <ProfilePostCardVariant upvotes={upvotes}
                                                                    price={price} category={category} user_name={user_name} id={id} image={image}
                                                                    title={title} tstamp={tstamp}
                                                                    />
                                                            })}
                                                        </div>
                                                        :
                                                        <div className='flex flex-col items-center my-10'>
                                                            <span className='text-center'>You have no posts. <br/> Create a post!</span>
                                                            <Link to='/createpost' className='px-4 py-2 my-4 rounded bg-blue-600 text-white' >
                                                                Create a post
                                                            </Link>
                                                        </div>
                                                }
                                            </div>
                                    }
                                    {
                                        view === 1 && <div className='flex flex-row justify-center w-screen'>
                                                {
                                                    DATA.posts.length > 0 ?
                                                        <div className='flex flex-col items-center w-screen lg:w-2/5 my-10'>
                                                            {
                                                                DATA.posts.map(({title, category, image, url, urldomain, tstamp, price, post_id, user_name, upvotes, downvotes, descript, id, pfp}:PostPropsInt&postcollectionProps, i:number) => {
                                                                    return <PostCard
                                                                    title={title} category={category} image={image} url={url}
                                                                    tstamp={tstamp} price={price} urldomain={urldomain}
                                                                    post_id={post_id} user_name={user_name} upvotes={upvotes}
                                                                    downvotes={downvotes} id={id} pfp={pfp} descript={descript}
                                                                    />
                                                                })
                                                            }
                                                        </div>
                                                    :
                                                    <div className='flex flex-col items-center my-10'>
                                                        <span className='text-center'>You have no posts. <br/> Create a post!</span>
                                                        <Link to='/createpost' className='px-4 py-2 my-4 rounded bg-blue-600 text-white' >
                                                            Create a post
                                                        </Link>
                                                    </div>
                                                }
                                        </div>
                                    }
                            </div>
                            
                        }
                </div>
            }
        </div>
        :
        <div>
            <img src={'https://savememoneypfp.s3.us-east-2.amazonaws.com/loader.svg'} className='h-32 w-32 m-4' alt='' />
        </div>
        }
        </div>
    )
}

const mapStateToProps = (store:any) => {
    const { ProfileState: { DATA, LOADING }, UserState: { LOGGEDINUSERNAME } } = store;
    return { DATA, LOADING, LOGGEDINUSERNAME }
}

const mapDispatchToProps = (dispatch:Function) => {
    return { GetProfile: (usernameparameter:string) => {dispatch(GetProfile(usernameparameter))} }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
