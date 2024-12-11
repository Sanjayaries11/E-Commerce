import { createSlice } from "@reduxjs/toolkit";



const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        product: {}
    },
    reducers: {
        productsRequest(state, action) {
            return {
                loading: true
            }
        },
        productsSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage: action.payload.resPerPage
            }
        },
        productsFailure(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        adminProductsRequest(state, action) {
            return {
                loading: true
            }
        },
        adminProductsSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products
            }
        },
        adminProductsFailure(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
});

const { actions, reducer } = productsSlice;

export const {
    productsRequest, productsSuccess, productsFailure,
    adminProductsRequest, adminProductsSuccess, adminProductsFailure, clearError
} = actions;

export default reducer;