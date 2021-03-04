const Express = require('express');
const App = Express();
const Port = 5000;
const PostsRoute = require('./API Routes/PostsRoute/PostsRoute');

App.use('/api/posts', PostsRoute)

App.listen(Port, () => {console.log(`Listening on port ${Port}.`)})