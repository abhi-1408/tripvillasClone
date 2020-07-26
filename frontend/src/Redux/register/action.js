// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"
import axios from "axios"



const Register_Successful = (data) => {
    return {
        type: "REGISTER_SUCCESS",
        payload: data
    }
}


const Register_Failure = (message) => {
    return {
        type: "REGISTER_FAILURE",
        payload: message
    }
}



export const Register_Reset = () => {
    return {
        type: "REGISTER_RESET"
    }
}

export const Register_Fetch = (info) => {
    return dispatch => {
        return axios({
            method: "post",
            url: "http://c562fcfe8d0c.ngrok.io/user/signup",
            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                if (data['error']) {
                    dispatch(Register_Failure("Invalid Data"))
                }
                else {

                    dispatch(Register_Successful(""))
                    setTimeout(() => {
                        dispatch(Register_Reset())
                    }, 5000)
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch(Register_Failure("Invalid Register Credetnials"))
            })
    }
}

// export {Login_Fetch,Logout_User,Login_Reset}