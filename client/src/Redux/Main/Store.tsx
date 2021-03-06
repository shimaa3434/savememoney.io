import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import mainReducer from '../Reducers/MainReducer';

const middleware = [thunk];
const Store = createStore(mainReducer, {}, compose(applyMiddleware(...middleware)))

export default Store;