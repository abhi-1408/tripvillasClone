// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"

const initialState = {

    payment_success: false,

}

export default (state = initialState, { type, payload }) => {

    switch (type) {


        case "UPDATE_PAYMENT_FLAG":
            return {
                ...state,
                payment_success: true
            }

        default:
            return state
    }
}
