import axios from "axios"
import {
    adminOrderFailure,
    adminOrderRequest,
    adminOrderSuccess,
    createOrderFailure,
    createOrderRequest,
    createOrderSuccess,
    deleteOrderfailure,
    deleteOrderRequest,
    deleteOrderSuccess,
    orderDetailFailure,
    orderDetailRequest,
    orderDetailSuccess,
    updateOrderFailure,
    updateOrderRequest,
    updateOrderSuccess,
    userOrdersFailure,
    userOrdersRequest,
    userOrdersSuccess
} from "../slices/orderSlice";

export const createOrder = order => async (dispatch) => {
    try {
        dispatch(createOrderRequest())
        const { data } = await axios.post(`/api/v1/order/new`, order);
        dispatch(createOrderSuccess(data))
    }
    catch (error) {
        dispatch(createOrderFailure(error.response.data.message))
    }
}

export const userOrders = () => async (dispatch) => {
    try {
        dispatch(userOrdersRequest())
        const { data } = await axios.get(`/api/v1/myorders`);
        //console.log('dummy', data)
        dispatch(userOrdersSuccess(data))
    }
    catch (error) {
        dispatch(userOrdersFailure(error.response.data.message))
    }
}


export const orderDetail = id => async (dispatch) => {
    try {
        dispatch(orderDetailRequest());
        const { data } = await axios.get(`/api/v1/order/${id}`);
        //console.log("dummy", data)
        dispatch(orderDetailSuccess(data))
    }
    catch (error) {
        dispatch(orderDetailFailure(error.response.data.message))
    }
}
// get admin allorder

export const adminOrders = () => async (dispatch) => {
    try {
        dispatch(adminOrderRequest());
        const { data } = await axios.get(`/api/v1/admin/orders`);
        dispatch(adminOrderSuccess(data));
    }
    catch (error) {
        dispatch(adminOrderFailure(error.response.data.message));
    }
}

//delete admin order
export const deleteOrder = id => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());
        await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch(deleteOrderSuccess());
    }
    catch (error) {
        dispatch(deleteOrderfailure(error.response.data.message));
    }
}

//update admin order
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData);
        dispatch(updateOrderSuccess(data))
    }
    catch (error) {
        dispatch(updateOrderFailure(error.response.data.message))
    }
}