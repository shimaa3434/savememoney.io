import {combineReducers} from 'redux';
import CategoryReducer from './CategoryReducer';
import postsReducer from './PostsReducer'
import SearchReducer from './SearchReducer';

const mainReducer = combineReducers({
    PostsState: postsReducer,
    CategoryState: CategoryReducer,
    SearchState: SearchReducer
})

export default mainReducer;