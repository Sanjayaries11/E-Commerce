import axios from "axios"
import { forgotPasswordFailure, forgotPasswordRequest, forgotPasswordSuccess, loadUserFailure, loadUserRequest, loadUserSuccess, loginFailure, loginRequest, loginSuccess, logoutFailure, logoutSuccess, registerFailure, registerRequest, registerSuccess, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess, updatePasswordFailure, updatePasswordRequest, updatePasswordSuccess, updateProfileFailure, updateProfileRequest, updateProfileSuccess } from "../slices/authSlice"
import { deleteUserFailure, deleteUserRequest, deleteUserSuccess, updateUserFailure, updateUserRequest, updateUserSuccess, userFailure, userRequest, usersFailure, usersRequest, usersSucccess, userSuccess } from "../slices/usersSlices";
//for login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.post(`/api/v1/login`, { email, password });
        dispatch(loginSuccess(data))
    }
    catch (error) {
        dispatch(loginFailure(error.response.data.message)) //error-object, ...-field type
    }
}

//for new  register
export const register = (userData) => async (dispatch) => {    //userData= email,password,name .....
    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`/api/v1/register`, userData, config);
        dispatch(registerSuccess(data))
    }
    catch (error) {
        dispatch(registerFailure(error.response.data.message)) //error-object, ...-field type
    }
}

//after login loading user data
export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get(`api/v1/myprofile`)
        dispatch(loadUserSuccess(data))
    }
    catch (error) {
        dispatch(loadUserFailure(error.response.data.message))
    }
}

//for logout
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`api/v1/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFailure())
    }
}


//for edit profile

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data))
    }
    catch (error) {
        dispatch(updateProfileFailure(error.response.data.message))
    }
}

//for change password

export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFailure(error.response.data.message))
    }
}

//forgot password

export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest());
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        const { data } = await axios.post(`/api/v1/password/forgot`, formData, config)
        dispatch(forgotPasswordSuccess(data));
    }
    catch (error) {
        dispatch(forgotPasswordFailure(error.response.data.message));

    }
}

//reset password

export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest());
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        const { data } = await axios.post(`/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))

    }
    catch (error) {
        dispatch(resetPasswordFailure(error.response.data.message));
    }
}


//get all user for ADMIN

export const getUsers = async (dispatch) => {
    try {
        dispatch(usersRequest());
        const { data } = await axios.get(`/api/v1/admin/users`);
        dispatch(usersSucccess(data));
    }
    catch (error) {
        dispatch(usersFailure(error.response.data.message))
    }
}

//get single user for ADMIN

export const getSingleUser = (id) => async (dispatch) => {
    try {
        dispatch(userRequest());
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data));
    }
    catch (error) {
        dispatch(userFailure(error.response.data.message))
    }
}

// delete user for ADMIN

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());
        await axios.put(``);
        dispatch(deleteUserSuccess());
    }
    catch (error) {
        dispatch(deleteUserFailure(error.response.data.message))
    }
}


//update user by ADMIN

export const updateUser = (id, formData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        const { data } = await axios.put(`api/v1/admin/user/${id}`, config, formData);
        dispatch(updateUserSuccess(data));
    } catch (error) {
        dispatch(updateUserFailure(error.response.data.message))
    }
}


