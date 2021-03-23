import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import mainReducer from '../Reducers/MainReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const Store = createStore(mainReducer, {}, composeWithDevTools(applyMiddleware(...middleware)))

export default Store;
