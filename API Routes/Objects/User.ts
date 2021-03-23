var SQL = require('../../DBConnection');
var BCrypt = require('bcrypt');
var JWT = require('jsonwebtoken')

interface CreateUserBody {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
};


interface LoginUser {
    useroremail: string,
    password: string
}

class User {
    constructor () {
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    };

    CheckUserExistenceQuery = 'SELECT * from users WHERE email = ? OR username = ? ;';
    CreateNewUserQuery = 'INSERT INTO users(username, email, hashedpassword, firstname, lastname) VALUES(?, ?, ?, ?, ?);';

    create = (request:any, response:any) => {
        const requestBody:CreateUserBody = request.body;
        SQL.query(this.CheckUserExistenceQuery, [

            requestBody.email, requestBody.username

        ], async (err:any, results:any) => {
            if (err) response.send({message: 'There has been an error.', err: err}); response.sendStatus(400);
            if (!err) {
                if (results.length === 1) response.send({message: 'An user with this username or email already exists.'}); response.sendStatus(400);
                if (results.length === 0) {
                    // Maybe add message handling if user password is to short / not too complex?

                    const HashedPassword = await BCrypt.hash(requestBody.password, 10);

                    SQL.query(this.CreateNewUserQuery, [
                        
                        requestBody.username, requestBody.email, HashedPassword,
                        requestBody.firstname, requestBody.lastname
                        
                    ], (err:any, results:any) => {
                        if (err) response.send({message: 'There has been an error.', err: err}); response.sendStatus(400);
                        if (!err) {
                            const Token = JWT.sign({ username: requestBody.username, email: requestBody.email }, 'f2b271e88196e68685f5a897da0ee715', { expiresIn: '24h' });
                            response.cookie('JWT', Token, {maxAge: 86400000, httpOnly: true});
                            response.sendStatus(200);
                            response.send({message: 'The user has been created.'});
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
            if (err) response.send({message: 'There is an error logging in.', err: err}); response.sendStatus(400);
            if (!err) {
                if (results.length === 0) response.send({message: 'This is not a valid username/email and password combination.'}); response.sendStatus(400);
                if (results.length === 1) {

                    const HashedDBPassword = results[0].hashedpassword;
                    const ComparePassword = await BCrypt.compare(requestBody.password, HashedDBPassword);
                    if (ComparePassword) {
                        const Token = JWT.sign({email: requestBody.useroremail, username: requestBody.useroremail}, 'f2b271e88196e68685f5a897da0ee715', {expiresIn: '24h'});
                        response.cookie('JWT', Token, {maxAge: 86400000, httpOnly: true});
                        response.sendStatus(200);
                    } else {
                        response.sendStatus(400);
                        response.send({message: 'This is not a valid username/email and password combination.'});
                    };
                }
            };
        });
    };

    logout = (response:any) => {
        response.clearCookie('JWT');
        response.send({message: 'You have been signed out.'});
    };


};

export default User;