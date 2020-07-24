// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"

const initialState = {
    auth: false,
    message: "",
    error: false
}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case "REGISTER_SUCCESS":
            return {
                ...state,
                auth: true,
                message: "REGISTERED SUCCESSFULLY",
                error: false
            }

        case "REGISTER_FAILURE":
            return {
                ...state,
                auth: false,
                message: "REGISTRATION FAILED",
                error: true
            }
        case "REGISTER_RESET":
            return {
                ...state,
                auth: false,
                message: "",
                error: false
            }

        default:
            return state
    }
}
