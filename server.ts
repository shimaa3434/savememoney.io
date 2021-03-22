
const CategoryRoute = require('./API Routes/CategoryRoutes/CategoryRoute');
const SearchRoute = require('./API Routes/SearchRoute/SearchRoute');
import PostClass from './API Routes/Objects/Post'
var Post = new PostClass();
const PostsRoute = require('./API Routes/PostsRoute/PostsRoute');
const Cron = require('node-cron');
var Express = require('express');
const AWS = require('aws-sdk');
const App = Express();
const Port = 6000;

App.use(Express.json());
App.use(Express.urlencoded({extended: true}));
App.use('/api/posts', PostsRoute);
App.use('/api/categories', CategoryRoute);
App.use('/api/search', SearchRoute);

Cron.schedule('*/59 * * * *', () => {
    Post.getNewPosts();
})

App.listen(Port, () => {console.log(`Listening on port ${Port}.`)});