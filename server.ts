const CategoryRoute = require('./API Routes/CategoryRoutes/CategoryRoute');
const SearchRoute = require('./API Routes/SearchRoute/SearchRoute');
const PostActions = require('./API Routes/PostsRoute/PostsAction');
const PostsRoute = require('./API Routes/PostsRoute/PostsRoute');
const {grabNewPosts} = PostActions;
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
    grabNewPosts();
})

App.listen(Port, () => {console.log(`Listening on port ${Port}.`)});