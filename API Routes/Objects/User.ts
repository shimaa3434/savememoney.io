var SQL = require('../../DBConnection');
var BCrypt = require('bcrypt');
var JWT = require('jsonwebtoken')

interface CreateUserBody {
    username: string,
    email: string,
    password: string,
    isadmin: number,
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
    };

    CheckUserExistenceQuery = 'SELECT * from users WHERE email = ? OR username = ? ;';
    CreateNewUserQuery = 'INSERT INTO users(username, email, hashedpassword, namehead, isadmin) VALUES(?, ?, ?, ?, ?);';
    ChangeUserPasswordQuery = 'UPDATE users SET hashedpassword = ? WHERE username = ? AND email = ? ;';
    ChangeNameHeadQuery = 'UPDATE users SET namehead = ? WHERE username = ? AND email = ? ;';
    UserProfileQuery = 'SELECT users.username, users.bio, users.namehead, posts.title, posts.category, posts.image, posts.url, posts.tstamp, posts.price, posts.urldomain from users INNER JOIN posts ON users.id = posts.userid WHERE users.username = ? ;';


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
                        requestBody.namehead, 0
                        
                    ], (err:any, results:any) => {
                        if (err) {response.status(400).send({message: 'There has been an error.', err: err})};
                        if (!err) {
                            const Token = JWT.sign({ username: requestBody.username, email: requestBody.email, isadmin: 0}, 'f2b271e88196e68685f5a897da0ee715', { expiresIn: '24h' });
                            response.cookie('JWT', Token, {maxAge: 86400000, httpOnly: true});
                            response.status(200).send({message: 'The user has been created.'});
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
<<<<<<< HEAD
            if (err)  {response.send({message: 'There is an error logging in.', err: err})};
            if (!err) {
                if (results.length === 0) {response.send({message: 'This is not a valid username/email and password combination.'})};
=======
            if (err)  {response.status(400).send({message: 'There is an error logging in.', err: err})};
            if (!err) {
                if (results.length === 0) {response.status(400).send({message: 'This is not a valid username/email and password combination.'})};
>>>>>>> 15fac69f271089dfcdc4134ba46818c242739ddf
                if (results.length === 1) {
                    const ComparePassword = await BCrypt.compare(requestBody.password, results[0].hashedpassword);

                    if (ComparePassword) {
                        const Token = JWT.sign({email: results[0].email, username: results[0].username, isadmin: results[0].isadmin}, 'f2b271e88196e68685f5a897da0ee715', {expiresIn: '24h'});
                        response.cookie('JWT', Token, {maxAge: 86400000, httpOnly: true});
<<<<<<< HEAD
                        response.send({message: 'You are being logged in.'});
                        response.sendStatus(210);
                    } else {
                        response.send({message: 'This is not a valid username/email and password combination.'});
=======
                        response.status(200).send({message: 'You are being logged in.'});
                    } else {
                        response.status(400).send({message: 'This is not a valid username/email and password combination.'});
>>>>>>> 15fac69f271089dfcdc4134ba46818c242739ddf
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
        const UsernameParameter = request.params.username;

        SQL.query(this.CheckUserExistenceQuery, [

            UsernameParameter, UsernameParameter

        ], (err:any, results:any) => {
            if (err) {response.sendstatus(400).send({message: 'There has been an error loading this profile.', err: err})};
            if (!err) {
                if (results.length === 0) {response.status(400).send({message: 'This username does not exist.'})};
                if(results.length === 1) {
                    SQL.query(this.UserProfileQuery, [
                        UsernameParameter
                    ], (err:any, results:any) => {
                        if (err) {response.status(400).send({message: 'There has been an error loading this profile.', err: err})};
                        if (!err) {
                            response.status(200).send(results);
                        }
                    });
                }
            }
        })
    }
};

export default User;