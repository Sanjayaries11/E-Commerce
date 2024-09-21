import axios from "axios"
import { loginFailure, loginRequest, loginSuccess } from "../slices/authSlice"

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