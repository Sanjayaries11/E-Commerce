import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isAuthenticated: false
    },
    reducers: {
        //for login reducers
        loginRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        

        //for register reducers
        registerRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        registerSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = authSlice

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure
} = actions;

export default reducer;