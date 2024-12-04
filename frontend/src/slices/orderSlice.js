import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderDetail: {},
        userOrders: [],
        loading: false,
    },
    reducers: {
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: true,
                orderDetail: action.payload.order
            }
        },
        createOrderFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrders: action.payload.orders

            }
        },
        userOrdersFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderDetailRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        orderDetailFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = orderSlice;

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    userOrdersRequest,
    userOrdersSuccess,
    userOrdersFailure,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFailure
} = actions;

export default reducer;