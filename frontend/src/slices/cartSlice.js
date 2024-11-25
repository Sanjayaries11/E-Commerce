import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [], //get value which is stored in localstoarge
        loading: false,
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}

    },
    reducers: {
        addCartItemRequest(state, action) {
            return {
                ...state,
                loading: false,
            }
        },
        addCartItemSuccess(state, action) {
            const item = action.payload
            const isItemExist = state.items.find(i => i.product == item.product)
            if (isItemExist) {
                state = {
                    ...state,
                    loading: false
                }
            }
            else {
                state = {
                    items: [...state.items, item],
                    loading: false
                }
                localStorage.setItem("cartItems", JSON.stringify(state.items));
            }
            return state
        },
        addCartItemFailure(state, action) {
            return {
                ...state,
                loading: false
            }
        },

        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product == action.payload) {
                    item.quantity = item.quantity + 1
                }
                return;
            }
            )
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product == action.payload) {
                    item.quantity = item.quantity - 1
                }
                return;
            }
            )
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload;
            })
            localStorage.setItem("cartItems", JSON.stringify(filterItems));
            return {
                ...state,
                items: filterItems
            }
        },
        saveShippingInfo(state, action) {
            localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            }
        }
    }
});
const { actions, reducer } = cartSlice;
export const {
    addCartItemRequest,
    addCartItemSuccess,
    addCartItemFailure,
    increaseCartItemQty,
    decreaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo
} = actions;

export default reducer;