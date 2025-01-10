import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
        users: [],
        isUserUpdated: false,
        isUserDeleted: false
    },
    reducers: {
        // for all get users
        usersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        usersSucccess(state, action) {
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        },
        usersFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        //for get single user
        userRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        },
        userFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        // for delete user
        deleteUserRequest(state, payload) {
            return {
                ...state,
                loading: true
            }
        },
        deleteUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserDeleted: true
            }
        },
        deleteUserFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUserDeleted(state, action) {
            return {
                ...state,
                isUserDeleted: true
            }
        },
        //for update user
        updateUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserUpdated: true
            }
        },
        updateUserFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUserUpdated(state, action) {
            return {
                ...state,
                isUserUpdated: true
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

const { actions, reducer } = usersSlice;

export const { usersRequest, usersSucccess, usersFailure,
    userRequest, userSuccess, userFailure,
    updateUserRequest, updateUserSuccess, updateUserFailure,
    deleteUserRequest, deleteUserSuccess, deleteUserFailure, clearUserUpdated,
    clearUserDeleted, clearError } = actions;

export default reducer;