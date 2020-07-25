// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"
import axios from "axios"



const Login_Successful = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}


const Login_Failure = (message) => {
    return {
        type: "LOGIN_FAILURE",
        payload: message
    }
}

export const Logout_User = () => {
    return {
        type: "LOGOUT"
    }
}

export const Login_Reset = () => {
    return {
        type: "LOGIN_RESET"
    }
}

export const Login_Fetch = (info) => {
    return dispatch => {
        return axios({
            method: "post",
            url: "http://221646a81d84.ngrok.io/user/signin",
            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                if (data['error'] == true) {
                    dispatch(Login_Failure("Request Failure"))
                }
                else if (data['error'] == false && data['status'] == false) {
                    dispatch(Login_Failure("Invalid Login Credetnials"))
                }
                else {
                    dispatch(Login_Successful(data))

                }
            })
            .catch((err) => {
                console.log(err)
                dispatch(Login_Failure("Invalid Login Credetnials"))
            })
    }
}


export const Login_Google_Fetch = (info) => {
    return dispatch => {
        return axios({
            method: "post",
            url: "http://221646a81d84.ngrok.io/user/oauth_signin",
            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                if (data['error'] == true) {
                    dispatch(Login_Failure("Request Failure"))
                }
                else if (data['error'] == false && data['status'] == false) {
                    dispatch(Login_Failure("Invalid Login Credentials"))
                }
                else {
                    dispatch(Login_Successful(data))

                }
            })
            .catch((err) => {
                console.log(err)
                dispatch(Login_Failure("Invalid Login Credetnials"))
            })
    }
}



// export {Login_Fetch,Logout_User,Login_Reset}