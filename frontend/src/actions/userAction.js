import axios from "axios"
import { loginFailure, loginRequest, loginSuccess, registerFailure, registerRequest, registerSuccess } from "../slices/authSlice"
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