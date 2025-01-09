import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderDetail: {},
        userOrders: [],
        adminOrders: [],
        isOrderDeleted: false,
        isOrderUpdated: false,
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
        clearError(state, action) {
            return {
                ...state,
                error: null
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
        },
        //admin order
        adminOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        adminOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminOrders: action.payload.orders
            }
        },
        adminOrderFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        //delete admin order
        deleteOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderDeleted: true
            }
        },
        deleteOrderfailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearOrderDeleted(state, action) {
            return {
                ...state,
                isOrderDeleted: false
            }
        },
        //update admin order
        updateOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderUpdated: true
            }
        },
        updateOrderFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearOrderUpated(state, action) {
            return {
                ...state,
                isOrderUpdated: false
            }
        }
    }
});

const { actions, reducer } = orderSlice;

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    clearError,
    userOrdersRequest,
    userOrdersSuccess,
    userOrdersFailure,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFailure,
    adminOrderRequest,
    adminOrderSuccess,
    adminOrderFailure,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderfailure,
    clearOrderDeleted,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFailure,
    clearOrderUpated
} = actions;

export default reducer;