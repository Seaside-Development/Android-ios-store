import CartActionTypes from '../type/cart';
import { addItemToCart, removeItemFromCart } from '../utils/cart';

const initialState = {
    cartItems: [],
    totalAmount: 0,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            };
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
            };
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };
        case CartActionTypes.SET_CART_FROM_FIREBASE:
            return {
                ...state,
                cartItems: action.payload
            };
        default:
            return state;
    }
};

export default cartReducer;
