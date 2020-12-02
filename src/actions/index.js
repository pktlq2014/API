// 5
import * as Types from './../constants/ActionTypes';
import apiCaller from './../utils/apiCaller';
// lấy data từ server về và lưu vào store
export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return apiCaller('products', 'GET', null).then(res => {
            dispatch(actFetchProducts(res.data))
        });
    };
}
// lấy all các products
export const actFetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}
// xóa 
export const actDeleteProductRequest = (id) => {
    return dispatch => {
        return apiCaller(`products/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteProduct(id))
        });
    }
}
// lấy all id của các sp
export const actDeleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}
// thêm
export const actAddProductRequest = (products) => {
    return dispatch => {
        return apiCaller('products', 'POST', products).then(res => {
            dispatch(actAddProduct(res.data))
        });
    }
}
export const actAddProduct = (products) => {
    return {
        type: Types.ADD_PRODUCT,
        products
    }
}
// lấy thông tin sp cần sửa theo id
export const actGetProductRequest = (id) => {
    return dispatch => {
        return apiCaller(`products/${id}`, 'GET', null).then(res => {
            dispatch(actGetProduct(res.data))
        });
    }
}
export const actGetProduct = (products) => {
    return {
        type: Types.EDIT_PRODUCT,
        products
    }
}
// sửa
export const actUpdateProductRequest = (products) => {
    return dispatch => {
        return apiCaller(`products/${products.id}`, 'PUT', products).then(res => {
            dispatch(actUpdateProduct(res.data))
        });
    }
}
export const actUpdateProduct = (products) => {
    return {
        type: Types.UPDATE_PRODUCT,
        products
    }
}