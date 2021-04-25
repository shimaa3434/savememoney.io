declare var require:any;
const CategoryRoute = require('./API Routes/CategoryRoute');
const SearchRoute = require('./API Routes/SearchRoute');
const PostsRoute = require('./API Routes/PostsRoute');
const UsersRoute = require('./API Routes/UserRoute');
const InitialAuthRoute = require('./API Routes/InitialAuthRoute');
const cors = require('cors');
declare var require:any
declare var module:any
declare var process:any
var Express = require('express');
const AWS = require('aws-sdk');
const App = Express();
require('dotenv').config()
const Port = 6667;

App.use(Express.json());
App.use(Express.urlencoded({extended: true}));
App.use(cors());
App.use('/api/posts', PostsRoute);
App.use('/api/categories', CategoryRoute);
App.use('/api/search', SearchRoute);
App.use('/api/users', UsersRoute);

App.use('/api', InitialAuthRoute);
App.get('/working', (request, response) => { response.send('Working.') })

App.listen(process.env.PORT || Port, () => {console.log(`Listening on port ${Port}.`)});