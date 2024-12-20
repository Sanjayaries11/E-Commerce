import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,  //intially
        isAuthenticated: false,
        error: null,
        user: null,
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
        },

        //after login loading user data 
        loadUserRequest(state, action) {
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFailure(state, action) {
            return {
                ...state,
                loading: false,
                //error: action.payload
            }
        },

        //for logout action
        logoutSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
            }
        },
        logoutFailure(state, action) {
            return {
                ...state,
                error: action.payload
            }

        },

        //for edit profile reducers
        updateProfileRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user,  // getting updated data
                isUpdated: true
            }
        },
        updateProfileFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUpdateProfile(state, action) {
            return {
                ...state,
                isUpdated: false
            }
        },


        //for update password
        updatePasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updatePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        updatePasswordFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        //for forgot password
        forgotPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                message: null //for clear previous message in state
            }
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        forgotPasswordFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        //reset password
        resetPasswordRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        resetPasswordFailure(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
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
    registerFailure,
    loadUserRequest,
    loadUserSuccess,
    loadUserFailure,
    logoutSuccess,
    logoutFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    clearUpdateProfile,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure
} = actions;

export default reducer;