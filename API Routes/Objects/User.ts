var SQL = require('../../DBConnection');
var BCrypt = require('bcrypt');
var JWT = require('jsonwebtoken');
import useBucket from '../../AWS/AWSDetails'

interface CreateUserBody {
    username: string,
    email: string,
    password: string,
    isadmin?: number,
    namehead: string
};


interface LoginUser {
    useroremail: string,
    password: string
}

interface ChangeUserPassword {
    username: string,
    email: string,
    newpassword: string,
    currentpassword: string
}

interface ChangeUserNameHead {
    namehead: string,
    username: string,
    email: string
}

class User {
    constructor () {
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.changepassword = this.changepassword.bind(this);
        this.changename = this.changename.bind(this);
        this.profile = this.profile.bind(this);
        this.getsavedposts = this.getsavedposts.bind(this);
        this.getuserpost = this.getuserpost.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.followdata = this.followdata.bind(this);
        this.getusertimeline = this.getusertimeline.bind(this);
        this.uploadinitialpfp = this.uploadinitialpfp.bind(this);
        this.uploadnewpfp = this.uploadnewpfp.bind(this);
        this.getusersettingsdata = this.getusersettingsdata.bind(this)
        this.removecurrentpfp = this.removecurrentpfp.bind(this)
        this.editprofileinfo = this.editprofileinfo.bind(this)
    };

    CheckUserExistenceQuery = 'SELECT * from users WHERE email = ? OR username = ? ;';
    CreateNewUserQuery = 'INSERT INTO users(username, email, hashedpassword, namehead, isadmin, pfp) VALUES(?, ?, ?, ?, ?, ?);';
    ChangeUserPasswordQuery = 'UPDATE users SET hashedpassword = ? WHERE username = ? AND email = ? ;';
    ChangeNameHeadQuery = 'UPDATE users SET namehead = ? WHERE username = ? AND email = ? ;';
    GetSavedPostsQuery = 'SELECT posts.id, posts.user_name, posts.image, posts.upvotes, posts.downvotes, posts.category, posts.tstamp FROM savedposts INNER JOIN posts ON savedposts.post_id = posts.id AND savedposts.post_user_name = posts.user_name WHERE savetousername = ? ;';
    GetUserPostQuery = 'SELECT * from posts where user_name = ? AND id = ? ;'
    FollowUserQuery = 'INSERT INTO userfollows(followinguser, followedbyuser) SELECT * FROM (SELECT ?, ?) as tmp WHERE NOT EXISTS (SELECT * FROM userfollows WHERE followinguser = ? AND followedbyuser = ?) LIMIT 1;'
    UnfollowUserQuery = 'DELETE FROM userfollows WHERE followinguser = ? AND followedbyuser = ? ;';
    GetUserFollowersQuery = 'SELECT followedbyuser FROM userfollows WHERE followinguser = ?'
    GetUserFollowingQuery = 'SELECT followinguser FROM userfollows WHERE followedbyuser = ?'
    GetAllUserPostsQuery = 'SELECT posts.title, posts.id, posts.category, posts.image, posts.url, posts.tstamp, posts.price, posts.urldomain, posts.user_name, posts.descript, posts.upvotes, posts.downvotes, users.namehead, users.pfp FROM posts INNER JOIN users ON posts.user_name = users.username WHERE users.username = ? AND EXISTS (SELECT * FROM users WHERE users.username = ?) ORDER BY posts.tstamp DESC ;';
    GetUserProfileDataQuery = 'SELECT namehead, username, bio, pfp FROM users WHERE username = ?';

    UploadUserPFPQuery = 'UPDATE users SET pfp = ? WHERE username = ? ;'
    GetUserSettingsQuery = 'SELECT pfp, namehead, username, bio, email FROM users WHERE username = ?'
    GetCurrentPFPQuery = 'SELECT pfp FROM users WHERE username = ?'
    RemoveCurrentPFPQuery = 'UPDATE users SET pfp = ? WHERE username = ?'

    GetUserFeedQuery = 'SELECT posts.title, posts.id, posts.category, posts.image, posts.url, posts.tstamp, posts.price, posts.urldomain, posts.user_name, posts.descript, posts.upvotes, posts.downvotes, users.namehead, users.pfp FROM posts INNER JOIN users ON users.username = posts.user_name INNER JOIN userfollows ON userfollows.followinguser = posts.user_name WHERE userfollows.followedbyuser = ? AND EXISTS (SELECT * FROM users WHERE username = ?)  ORDER BY posts.tstamp DESC ;';

    create = (request:any, response:any) => {
        const requestBody:CreateUserBody = request.body;
        SQL.query(this.CheckUserExistenceQuery, [

            requestBody.email, requestBody.username

        ], async (err:any, results:any) => {

            if (err) {response.status(400).send({message: 'There has been an error.', err: err});}
            if (!err) {
                if (results.length === 1) {response.status(400).send({message: 'An user with this username or email already exists.'});}
                if (results.length === 0) {
                    // Maybe add message handling if user password is to short / not too complex?

                    const HashedPassword = await BCrypt.hash(requestBody.password, 10);

                    SQL.query(this.CreateNewUserQuery, [
                        
                        requestBody.username, requestBody.email, HashedPassword,
                        requestBody.namehead, 0, 'https://savememoneypfp.s3.us-east-2.amazonaws.com/user-512.png'
                        
                    ], (err:any, results:any) => {
                        if (err) {response.status(400).send({message: 'There has been an error.', err: err})};
                        if (!err) {
                            const Token = JWT.sign({ username: requestBody.username, email: requestBody.email, isadmin: 0}, 'f2b271e88196e68685f5a897da0ee715', { expiresIn: '24h' });
                            response.cookie('JWT', Token, {maxAge: 86400000, httpOnly: true});
                            response.status(210).send({message: 'The user has been created.'});
                        };
                    });
                };
            };
        });
    };

    login = (request:any, response:any) => {
        const requestBody:LoginUser = request.body;
        // const UsernameRegexTest = /[a-zA-Z0-9]*/gi.test(requestBody.useroremail);
        //const EmailRegexTest = /[a-zA-Z0-9]*@[a-zA-Z]*\.[a-zA-Z]*/gi.test(requestBody.useroremail);
    
        SQL.query(this.CheckUserExistenceQuery, [

            requestBody.useroremail, requestBody.useroremail

        ], async (err:any, results:any) => {

            if (err)  {response.send({message: 'There is an error logging in.', err: err})};
            if (!err) {
                if (results.length === 0) {response.send({message: 'This is not a valid username/email and password combination.'})};
                if (results.length === 1) {
                    const ComparePassword = await BCrypt.compare(requestBody.password, results[0].hashedpassword);

                    if (ComparePassword) {
                        const Token = JWT.sign({email: results[0].email, username: results[0].username, isadmin: results[0].isadmin}, 'f2b271e88196e68685f5a897da0ee715', {expiresIn: '24h'});
                        response.cookie('JWT', Token, {maxAge: 86400000, httpOnly: true});

                        response.send({
                            status: 210,
                            username: results[0].username
                        })

                    } else {
                        response.send({message: 'This is not a valid username/email and password combination.'});

                    };
                };
            };
        });
    };

    logout = (response:any) => {
        response.clearCookie('JWT');
        response.status(200).send({message: 'You have been signed out.'});
    };

    changepassword = (request:any, response:any) => {
        const requestBody:ChangeUserPassword = request.body;
        SQL.query(this.CheckUserExistenceQuery, [

            requestBody.email, requestBody.username

        ], async (err:any, results:any) => {
            if (err)  {response.status(400).send({message: 'There has been an error.', err: err})};
            if (!err) {
                if (results.length === 0) { response.status(400).send({message: 'You are not a valid user.'}) };
                if (results.length === 1) {

                    const compareCurrentPassword = await BCrypt.compare(requestBody.currentpassword, results[0].hashedpassword);
                    
                    if (compareCurrentPassword) {

                        if (requestBody.currentpassword !== requestBody.newpassword) {

                            const NewPasswordHashed = await BCrypt.hash(requestBody.newpassword, 10);

                            SQL.query(this.ChangeUserPasswordQuery, [
                                
                                NewPasswordHashed, requestBody.username, requestBody.email
                                
                            ], (err:any, results:any) => {
                                if (err) {response.status(400).send({message: 'There is an error changing your password.', err: err}); }
                                if (!err) {response.status(200).send({message: 'Your password has been changed.'}); }
                            })
                        } else {
                            response.status(400).send({message: 'The cannot enter the current password as the new password. Try again.'});
                        };
                    } else {
                        response.status(400).send({message: 'The current password you entered does not match our records. Try again.'});
                    };
                };
            };
        });
    };

    changename = (request:any, response:any) => {
        const requestBody:ChangeUserNameHead = request.body;

        SQL.query(this.CheckUserExistenceQuery, [

            requestBody.email, requestBody.username

        ], (err:any, results:any) => {
            if (err) {response.status(400).send({message: 'There has been an error.', err: err}); }
            if (!err) {
                if (results.length === 0) {response.status(400).send({message: 'This is not a valid user.'}); }
                if (results.length === 1) {
                    if (requestBody.namehead !== results[0].namehead) {
                        SQL.query(this.ChangeNameHeadQuery, [

                            requestBody.namehead, requestBody.username, requestBody.email

                        ], (err:any, results:any) => {
                            if (err) {response.status(400).send({message: 'There has been an error changing your name.', err: err}); }
                            if (!err) {response.status(200).send({message: 'Your name has been changed.'});}
                        })
                    } else {
                        response.status(400).send({message: 'To change your name you cannot submit the same name.'})
                    }
                }
            }
        })
    };

    profile = (request:any, response:any) => {
        const {params: { usernameparam } } = request

        SQL.query(this.GetAllUserPostsQuery, [

            usernameparam, usernameparam

        ], (err:any, posts) => {
            if (err) {response.send({message: 'There has been an error loading this profile.', err, status: 400})};
            if (!err) {
                if (posts.length === 0) {response.send({message: 'This user has no posts.', status: 400})};
                if(posts.length > 0 ) {

                    SQL.query(this.GetUserProfileDataQuery, [

                        usernameparam

                    ], (err, userdata) => {
                        if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                        if (!err) {
                            if (userdata.length === 0) response.send({ message: 'This user does not exist.', status: 400})
                            const { namehead, bio, username, pfp } = userdata[0];
                            if (userdata.length === 1) {

                                SQL.query(this.GetUserFollowersQuery, [

                                    usernameparam

                                ], (err, followers) => {
                                    if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                                    if (!err) SQL.query(this.GetUserFollowingQuery, [

                                        usernameparam

                                    ], (err, following) => {
                                        if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                                        if (!err) response.send({
                                            message: 'Here is the user data.',
                                            foruser: usernameparam,
                                            posts,
                                            userdata: userdata[0],
                                            followdata: {
                                                followers,
                                                following
                                            },
                                            status: 210
                                        })
                                    })
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    uploadinitialpfp = (request, response) => {
        const { body: { username, email }, file: { originalname, buffer } } = request;
        const fileType = originalname.split(/\./gi)[1];
        const Bucket = 'savememoneypfp';
        const S3 = useBucket(Bucket);
        S3.upload({ Bucket, Key: `${username}pfp.${fileType}`, Body: buffer},
        (err, uploaddata) => {
            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 });
            if (!err) {
                const { Location } = uploaddata;
                SQL.query(this.UploadUserPFPQuery, [
                    Location, username
                ], (err, results) => {
                    if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                    if (!err) response.send({ message: 'Success: Status Code 210', status: 210, redirecturl: `/settings` })
                })
            }
        })
    }

    uploadnewpfp = (request, response) => {
        const { file: { originalname, buffer }, body: { username, email } } = request;
        const fileType = originalname.split(/\./gi)[1];
        const Bucket = 'savememoneypfp';
        const S3 = useBucket(Bucket);
        SQL.query(this.GetCurrentPFPQuery, [
            username
        ], (err, results) => {
            const currentPFPFileSplit = results[0].pfp.split(/\//gi)
            const currentPFPFile = currentPFPFileSplit[ currentPFPFileSplit.length - 1 ]
            if (currentPFPFile !== 'user-512.png') {

                S3.deleteObject({ Bucket, Key: currentPFPFile},
                    (err, data) => {
                        if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                        if (!err) {
                            S3.upload({ Bucket, Key: `${username}pfp.${fileType}`, Body: buffer },
                            (err, uploaddata) => {
                                if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                                if (!err) {
                                    const { Location } = uploaddata;
                                    SQL.query(this.UploadUserPFPQuery, [
                                        Location, username
                                    ], (err, results) => {
                                        if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                                        if (!err) response.send({ message: 'Success: Status Code 210', status: 210, redirecturl: `/settings`, newpfp: Location })
                                    })
                                }
                            })
                        }
                    })
            } else {
                S3.upload({ Bucket, Key: `${username}pfp.${fileType}`, Body: buffer },
                (err, uploaddata) => {
                    if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 });
                    if (!err) {
                        const { Location } = uploaddata;
                        SQL.query(this.UploadUserPFPQuery, [
                            Location, username
                        ], (err, results) => {
                            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 });
                            if (!err) response.send({ message: 'Success: Status Code 210', status: 210, redirecturl: `/settings`, newpfp: Location })
                        })
                    }
                })
            }
        })
    }

    removecurrentpfp = (request, response) => {
        const { body: { username, email } } = request;
        const DefaultPFPURL = 'https://savememoneypfp.s3.us-east-2.amazonaws.com/user-512.png'
        SQL.query(this.RemoveCurrentPFPQuery, [
            DefaultPFPURL, username
        ], (err, results) => {
            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 });
            if (!err) response.send({ message: 'Success: Status Code 210', status: 210, newpfp: DefaultPFPURL })
        })
    }

    EditProfileInfoQuery = 'UPDATE users SET username = ?, namehead = ?, bio = ?, email = ? WHERE username = ?'
    IfUsernameChangedChangePostUserQuery = 'UPDATE posts set user_name = ? WHERE user_name = ?'
    IfUsernameChangedChangePostVotesUpvotedByUserQuery = 'UPDATE postvotes SET upvotedbyuser = ? WHERE upvotedbyuser = ?'
    IfUsernameChangedChangePostVotesDownvotedByUserQuery = 'UPDATE postvotes SET downvotedbyuser = ? WHERE downvotedbyuser = ?'
    IfUsernameChangedChangeSavedPostsPostUserQuery = 'UPDATE savedposts SET post_user_name = ? WHERE post_user_name = ?'
    IfUsernameChangedChangeSavedPostsSaveToUserQuery = 'UPDATE savedposts SET savetousername = ? WHERE savetousername = ?'
    IfUsernameChangedChangeUserFollowsFollowingUserQuery = 'UPDATE userfollows SET followinguser = ? WHERE followinguser = ?'
    IfUsernameChangedChangeUserFollowsFollowedByUserQuery = 'UPDATE userfollows SET followedbyuser = ? WHERE followedbyuser = ?'

    editprofileinfo = (request, response) => {
        const { body: { username, email, usernameinput, nameinput, bioinput, emailinput } } = request;
        SQL.query(this.EditProfileInfoQuery, [
            usernameinput, nameinput, bioinput, emailinput, username
        ], (err , results) => {
            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
            if (!err) {
                if (username !== usernameinput) {

                    const UpdateUsernameDatabaseWideQueries = [
                        this.IfUsernameChangedChangePostUserQuery,
                        this.IfUsernameChangedChangePostVotesUpvotedByUserQuery,
                        this.IfUsernameChangedChangePostVotesDownvotedByUserQuery,
                        this.IfUsernameChangedChangeSavedPostsPostUserQuery,
                        this.IfUsernameChangedChangeSavedPostsSaveToUserQuery,
                        this.IfUsernameChangedChangeUserFollowsFollowingUserQuery,
                        this.IfUsernameChangedChangeUserFollowsFollowedByUserQuery
                    ]

                    UpdateUsernameDatabaseWideQueries.map((query:string, i:number) => {
                        SQL.query(query, [
                            usernameinput, username
                        ], (err, results) => {
                            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                            if (!err) {
                                if (i === UpdateUsernameDatabaseWideQueries.length - 1) {
                                    response.clearCookie('JWT')
                                    const NewJWTToken = JWT.sign({ username: usernameinput, email: emailinput }, 'f2b271e88196e68685f5a897da0ee715', { expiresIn: '24h' })
                                    response.cookie('JWT', NewJWTToken, { httpOnly: true, maxAge: 86400000 })
                                    response.send({ message: 'Success: Status Code 210', status: 210, aye: 'namechanged site wide g' })
                                }
                            }
                        })
                    })
                } else {
                    ///
                }
            }
        })
    }

    getusersettingsdata = (request, response) => {
         SQL.query(this.GetUserSettingsQuery, [
            request.body.username
        ], (err, results) => {
            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
            if (!err) response.send({...results[0]})
        }) 
    }

    getsavedposts = (request, response) => {
        const { username, email } = request.body
        SQL.query(this.CheckUserExistenceQuery, [

            email, username

        ], (err, results) => {
            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 });
            if (!err) SQL.query(this.GetSavedPostsQuery, [

                username

            ], (err, results) => {
                if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                if (!err) {
                    if (results.length === 0) response.send({ message: 'You have no saved posts.', err: null, status: 400 })
                    if (results.length > 0) response.send(results);
                } 
            })
        })
    }

    getuserpost = (request, response) => {
        const { params: { username, post_id } } = request;
        // change to user_name
        SQL.query(this.GetUserPostQuery, [

            username, Number(post_id)

        ], (err, results) => {
            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
            if (!err) {
                if (results.length === 0 ) response.send({message: 'This is not a valid post.'})
                if (results.length === 1) {

                    response.send(...results[0]);
                }
            }
            
        })
    }

    follow = (request, response) => {
        const { body: { username, email, usertofollow } } = request;
        SQL.query(this.FollowUserQuery, [

            usertofollow, username, usertofollow, username

        ], (err, results) => {
            if (err) response.send({ message: 'There has been an error.', err: err, status: 400});
            if (!err) response.send({ message: 'Following', status: 210 })
        })
    }
    
    unfollow = (request, response) => {
        const { body: { username, email, usertounfollow } } = request;
        SQL.query(this.UnfollowUserQuery, [
    
            usertounfollow, username
    
        ], (err, results) => {
            if (err) response.send({ message: 'There has been an error.', err: err, status: 400});
            if (!err) response.send({ message: 'Successfully unfollowed the user!', status: 210 })
        })
        
    }

    followdata = (request, response) => {
        const { params: { usernameparam } } = request;

        SQL.query(this.GetUserFollowersQuery, [

            usernameparam

        ], (err, followers) => {
            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
            if (!err) SQL.query(this.GetUserFollowingQuery, [

                usernameparam

            ], (err, following) => {
                if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
                if (!err) response.send({ foruser: usernameparam, followers, following, status: 210 })
            })
        })
    };

    getusertimeline = (request, response) => {
        
        const { body: { username } } = request;

        SQL.query(this.GetUserFeedQuery, [

            username, username

        ], (err, timelineposts) => {
            if (err) response.send({ message: 'Error: Status Code 400', err, status: 400 })
            if (!err) response.send({ timelineposts, status: 210 })
        })
    }
};

export default User;