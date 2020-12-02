// 2 của store thường và bước 6 của api đọc api và lưu data vào store lại
import * as Types from './../constants/ActionTypes';
var initialState = [];
var findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product.id === id) {
            result = index;
        }
    });
    return result;
}
const products = (state = initialState, action) => {
    var index = -1;
    var { id, products } = action;
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case Types.DELETE_PRODUCT:
            index = findIndex(state, id);
            if (index !== -1) {
                state.splice(index, 1); // mỗi lần xóa sp theo cái index của sp đó
            }
            return [...state];
        case Types.ADD_PRODUCT:
            state.push(action.products);
            return [...state];
        case Types.UPDATE_PRODUCT:
            index = findIndex(state, products.id);
            state[index] = products;
            return [...state];
        default: return [...state];
    }
};
export default products;