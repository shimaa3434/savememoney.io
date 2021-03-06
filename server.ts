const Express = require('express');
const App = Express();
const Port = 5000;
const PostsRoute = require('./API Routes/PostsRoute/PostsRoute');
const CategoryRoute = require('./API Routes/CategoryRoutes/CategoryRoute')
const SearchRoute = require('./API Routes/SearchRoute/SearchRoute')

App.use(Express.json())
App.use(Express.urlencoded({extended: true}))
App.use('/api/posts', PostsRoute)
App.use('/api/categories', CategoryRoute)
App.use('/api/search', SearchRoute)

App.listen(Port, () => {console.log(`Listening on port ${Port}.`)})