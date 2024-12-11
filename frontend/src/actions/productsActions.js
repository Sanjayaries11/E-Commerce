import axios from 'axios';
import { adminProductsFailure, adminProductsRequest, adminProductsSuccess, productsFailure, productsRequest, productsSuccess } from '../slices/productsSlice';

export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {
        dispatch(productsRequest())
        let link = `/api/v1/products?page= ${currentPage}`;
        if (keyword) {
            link += `&keyword=${keyword}`
        }
        if (price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}` //storing range values here
        }
        if (category) {
            link += `&category=${category}`
        }
        if (rating) {
            link += `&ratings=${rating}`
        }
        const { data } = await axios.get(link);
        dispatch(productsSuccess(data))
    }
    catch (error) {
        dispatch(productsFailure(error.response.data.message))
    }

};

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data))
        //console.log("Admin Products:", data.products);
    }
    catch (error) {
        dispatch(adminProductsFailure(error.response.data.message))
    }

}