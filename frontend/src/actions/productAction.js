import axios from "axios";
import { createReviewFailure, createReviewRequest, createReviewSuccess, newProductFailure, newProductRequest, newProductSuccess, productFailure, productRequest, productSuccess } from "../slices/productSlice";

export const getProduct = id => async (dispatch) => {

    try {
        dispatch(productRequest())
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    }
    catch (error) {
        dispatch(productFailure(error.response.data.message))
    }

};

export const createReview = reviewData => async (dispatch) => {
    try {
        dispatch(createReviewRequest())
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        dispatch(createReviewSuccess(data))
    }
    catch (error) {
        dispatch(createReviewFailure(error.response.data.message))
    }
}


export const createNewProduct = productData => async (dispatch) => {
    try {
        dispatch(newProductRequest());
        const config = {
            headers: {
                "Content-type": "application-json"
            }
        }
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);
        dispatch(newProductSuccess(data))
    }
    catch (error) {
        dispatch(newProductFailure(error.response.data.message))
    }
} 