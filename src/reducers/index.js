//3
import {combineReducers} from 'redux';
import products from './products';
import itemEditing from './itemEditing';
const appReducers = combineReducers({
    products, // đặt là products để bên ProductListPage gọi
    itemEditing
});
export default appReducers;