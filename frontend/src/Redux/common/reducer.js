// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"

const initialState = {
    data: [],
    filters: { "swimming_pool": false, "ac": false, "internet": false, "television": false, "parking": false, "housekeeping": false, "functional_kitchen": false, "washing_machine": false, "dish_washer": false, "sort_by": false, "check_in": false, "check_out": false, "start_date": new Date(), "end_date": new Date(), "state": "delhi" },
    filter_list: ["swimming_pool", "ac", "internet", "television", "parking", "housekeeping", "functional_kitchen", "washing_machine", "dish_washer"],
    property_data: [],
    recommended_state: [],
    recommended_review: [],
    message: "available on selected dates",
    message_flag: true,
    property_review: [],
    booking_data: [],
    booking_confirmed_details: {},
    booking_flag: false,
    temp: [],
    filter_page_flag: false,
    booking_sms_email_flag: false,
    payment_success: false,
    specific_property_flag: false
}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case "DATA_LOAD":
            return {
                ...state,
                data: payload,
                filter_page_flag: true
            }

        case "RESET_FILTER_PAGE_FLAG":
            return {
                ...state,
                filter_page_flag: false
            }

        case "UPDATE_PAYMENT_FLAG":
            return {
                ...state,
                payment_success: true
            }
        case "RESET_BOOKING_SMS_EMAIL_FLAG":
            return {
                ...state,
                booking_sms_email_flag: false
            }

        case "UPDATE_SPECIFIC_PROP_FLAG":
            return {
                ...state,
                specific_property_flag: false
            }
        case "CHECK":
            return {
                ...state,
                temp: { ...payload }
            }

        case "DATA_SPECIFIC":
            return {
                ...state,
                property_data: payload,
                specific_property_flag: true
            }

        case "BOOKING_CONFIRMED":
            return {
                ...state,
                booking_flag: !payload['error'],
                booking_confirmed_details: { ...payload },
                booking_sms_email_flag: true
            }

        case "LOAD_BOOKING_DATA":
            return {
                ...state,
                booking_data: payload
            }
        case "SAVE_FILTER":
            return {
                ...state,
                filter: payload
            }

        case "RECOMMENDED_STATE":
            return {
                ...state,
                recommended_state: payload
            }

        case "RECOMMENDED_REVIEW":
            return {
                ...state,
                recommended_review: payload
            }

        case "RESET_FILTER":
            return {
                ...state,
                data: [],
                filters: { "swimming_pool": false, "ac": false, "internet": false, "television": false, "parking": false, "housekeeping": false, "functional_kitchen": false, "washing_machine": false, "dish_washer": false, "sort_by": false, "check_in": false, "check_out": false, "start_date": new Date(), "end_date": new Date(), "state": "" },

            }

        case "AVAILABLE_HOTEL":
            return {
                ...state,
                message: payload['message'],
                message_flag: payload['flag']

            }
        case "RESET_ALL":
            return {
                ...state,
                data: [],
                filters: { "swimming_pool": false, "ac": false, "internet": false, "television": false, "parking": false, "housekeeping": false, "functional_kitchen": false, "washing_machine": false, "dish_washer": false, "sort_by": false, "check_in": false, "check_out": false, "start_date": new Date(), "end_date": new Date(), "state": "" },
                property_data: [],
                recommended_state: [],
                recommended_review: [],
                booking_data: [],
                booking_confirmed_details: {},
                booking_flag: false,
                booking_sms_email_flag: false,
                payment_success: false
            }
        default:
            return state
    }
}
