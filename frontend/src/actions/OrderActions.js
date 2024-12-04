import axios from "axios"
import { createOrderFailure, createOrderRequest, createOrderSuccess, orderDetailFailure, orderDetailRequest, orderDetailSuccess, userOrdersFailure, userOrdersRequest, userOrdersSuccess } from "../slices/orderSlice";

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