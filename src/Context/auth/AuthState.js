import React,{useReducer} from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import {
REGISTER_SUCCESS,
 REGISTER_FAIL,
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
CLEAR_ERRORS,
} from "../Types";

const AuthState = props => {
    const initialState ={
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const [state,dispatch] = useReducer(AuthReducer,initialState);

    // Load User
    const loadUser = () => {
        console.log("a")
    }

    //Register User
    const register = async(formData) => {
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        try{
            const res = await axios.post("/api/users",formData,config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload:res.data
            })
        }catch(error){
            dispatch({
                type:REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }
    }


    // Login User
    const loginUser = () => {
        console.log("a")
    }

    // Logout
    const logoutUser = () => {
        console.log("a")
    }

    // Clear Errors
    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS})
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                user: state.user,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                error:state.error,
                register,
                loadUser,
                loginUser,
                logoutUser,
                clearErrors
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;

