import axios from 'axios';
import { productsFailure, productsRequest, productsSuccess } from '../slices/productsSlice';

export const getProducts  =(keyword, currentPage) => async (dispatch) => {
    
    try {
        dispatch(productsRequest())
        const { data } = await axios.get(`/api/v1/products?page= ${currentPage}`);
        dispatch(productsSuccess(data))
    }
    catch(error){
       dispatch(productsFailure(error.response.data.message))
    }

};