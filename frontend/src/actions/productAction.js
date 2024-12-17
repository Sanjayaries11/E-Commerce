import axios from "axios";
import { createReviewFailure, createReviewRequest, createReviewSuccess, deleteProductfailure, deleteProductRequest, deleteProductSuccess, newProductFailure, newProductRequest, newProductSuccess, productFailure, productRequest, productSuccess } from "../slices/productSlice";

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
//for create review
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

//for createnew product
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

//for delete product
export const deleteProduct = id => async (dispatch) => {
    try {
        dispatch(deleteProductRequest());
        await axios.delete(`/api/v1/admin/product/${id}`);
        console.log(deleteProductSuccess());
        dispatch(deleteProductSuccess());
    } catch (error) {
        dispatch(deleteProductfailure(error.response.data.message))
    }
}