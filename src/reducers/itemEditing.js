import * as Types from './../constants/ActionTypes';
var initialState = {};
const itemEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_PRODUCT:
           return action.products;
            // return {...state, selectedGlobalTriviaTab : action.payload};
        default:
            return state;
    }
}
export default itemEditing;