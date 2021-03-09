var Express = require('express');
const App = Express();
const Port = 6000;
const PostsRoute = require('./API Routes/PostsRoute/PostsRoute');
const CategoryRoute = require('./API Routes/CategoryRoutes/CategoryRoute');
const SearchRoute = require('./API Routes/SearchRoute/SearchRoute');
const Cron = require('node-cron');
const PostActions = require('./API Routes/PostsRoute/PostsAction');
const {grabNewPosts} = PostActions;


App.use(Express.json());
App.use(Express.urlencoded({extended: true}));
App.use('/api/posts', PostsRoute);
App.use('/api/categories', CategoryRoute);
App.use('/api/search', SearchRoute);

Cron.schedule('*/30 * * * *', () => {
    grabNewPosts();
})

App.listen(Port, () => {console.log(`Listening on port ${Port}.`)});