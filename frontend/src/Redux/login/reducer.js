// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"

const initialState = {
    auth_logged: false,
    user_loggedin: "",
    user_id_loggedin: "",
    message_logged: "",
    error_logged: false,
}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case "LOGIN_INFO_RESET":
            return {
                ...state,
                ...initialState
            }


        case "LOGIN_SUCCESS":
            let { message, username, user_id } = payload
            return {
                ...state,
                auth_logged: true,
                message_logged: message,
                user_loggedin: username,
                user_id_loggedin: user_id,
                error_logged: false
            }

        case "LOGIN_FAILURE":
            return {
                ...state,
                auth_logged: false,
                message_logged: payload,
                error_logged: true
            }
        case "LOGOUT":
            return {
                ...state,
                auth_logged: false,
                user_loggedin: "",
                user_id_loggedin: "",
                message_logged: "",
                error_logged: false
            }

        default:
            return state
    }
}
