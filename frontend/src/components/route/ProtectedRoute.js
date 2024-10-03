//if user copy a url try to  open on another window leads to login page

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({children}) {
    const { isAuthenticated } = useSelector(state => state.authState);

    if(!isAuthenticated) {
       return <Navigate to="/login" />
    }
    return children;
}