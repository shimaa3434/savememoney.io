import {combineReducers} from 'redux';
import CategoryReducer from './CategoryReducer';
import LoginReducer from './LoginReducer';
import postsReducer from './PostsReducer'
import SearchReducer from './SearchReducer';
import UserReducer from './UserReducer';

const mainReducer = combineReducers({
    PostsState: postsReducer,
    CategoryState: CategoryReducer,
    SearchState: SearchReducer,
    LoginState: LoginReducer,
    UserState: UserReducer
})

export default mainReducer;