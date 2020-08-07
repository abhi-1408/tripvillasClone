// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"

const initialState = {
    user_booking_flag: false,
    user_booking_list: [],
    booking_sms_email_flag: false,
    booking_data: [],
    booking_flag: false,
    booking_confirmed_details: {},
    booking_sms_email_flag: false,
}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case "UPDATE_USER_BOOKING_LIST":
            return {
                ...state,
                user_booking_flag: true,
                user_booking_list: payload
            }

        case "RESET_BOOKING_SMS_EMAIL_FLAG":
            return {
                ...state,
                booking_sms_email_flag: false
            }

        case "LOAD_BOOKING_DATA":
            return {
                ...state,
                booking_data: payload
            }

        case "BOOKING_CONFIRMED":
            return {
                ...state,
                booking_flag: !payload['error'],
                booking_confirmed_details: { ...payload },
                booking_sms_email_flag: true
            }
        default:
            return state
    }
}
