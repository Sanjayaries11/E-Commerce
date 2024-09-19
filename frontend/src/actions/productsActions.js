import axios from 'axios';
import { productsFailure, productsRequest, productsSuccess } from '../slices/productsSlice';

export const getProducts = (keyword, price, currentPage) => async (dispatch) => {

    try {
        dispatch(productsRequest())
        let link = `/api/v1/products?page= ${currentPage}`;
        if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}` //storing range values here
        }
        const { data } = await axios.get(link);
        dispatch(productsSuccess(data))
    }
    catch (error) {
        dispatch(productsFailure(error.response.data.message))
    }

};