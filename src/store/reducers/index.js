import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './products_reducer';

const rootReducer = combineReducers({
    userStore: user,
    productStore: products
});

export default rootReducer;