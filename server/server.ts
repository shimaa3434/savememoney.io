
const SearchRoute = require('./API Routes/SearchRoute');
const PostsRoute = require('./API Routes/PostsRoute');
const UsersRoute = require('./API Routes/UserRoute');
const InitialAuthRoute = require('./API Routes/InitialAuthRoute');
const cors = require('cors');
const path = require('path');
var Express = require('express');
const AWS = require('aws-sdk');
const App = Express();
require('dotenv').config()
const Port = 10500;

/* if ( process.env.NODE_ENV === 'production' ) {
    App.use( Express.static( '../client/build' ) );
    App.get( '*', ( request, response ) => { response.sendFile( path.resolve( '../client/build/index.html' ) ) } )
} */

App.use(Express.json());
App.use(Express.urlencoded({extended: true}));
App.use(cors());
App.use('/api/posts', PostsRoute);
App.use('/api/search', SearchRoute);
App.use('/api/users', UsersRoute);

App.use('/api', InitialAuthRoute);
App.get('/working', (request, response) => { response.send('Working.') })

App.listen(process.env.PORT || Port, () => {console.log(`Listening on port ${Port}.`)});
