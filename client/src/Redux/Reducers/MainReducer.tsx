import {combineReducers} from 'redux';
import CategoryReducer from './CategoryReducer';
import CreatePostReducer from './CreatePostReducer';
import LoginReducer from './LoginReducer';
import postsReducer from './PostsReducer'
import ProfileReducer from './ProfileReducer';
import RegisterReducer from './RegisterReducer';
import SearchReducer from './SearchReducer';
import UserReducer from './UserReducer';

const mainReducer = combineReducers({
    PostsState: postsReducer,
    CategoryState: CategoryReducer,
    SearchState: SearchReducer,
    LoginState: LoginReducer,
    UserState: UserReducer,
    RegisterState: RegisterReducer,
    ProfileState: ProfileReducer,
    CreatePostState: CreatePostReducer
})

export default mainReducer;