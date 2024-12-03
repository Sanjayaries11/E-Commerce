import axios from "axios"
import { createOrderFailure, createOrderRequest, createOrderSuccess, userOrdersFailure, userOrdersRequest, userOrdersSuccess } from "../slices/orderSlice";

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