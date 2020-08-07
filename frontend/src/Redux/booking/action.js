import axios from "axios"

export const Apply_User_Booking_List = (data) => {
    return {
        type: "UPDATE_USER_BOOKING_LIST",
        payload: data
    }
}

export const Load_User_Booking_List = (info) => {
    return dispatch => {
        return axios({
            method: "post",


            url: "https://tripvilla-api.abhisheksaklani.co/user/allbooking",

            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_User_Booking_List(data))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}

export const Update_in_Booking = (info) => {
    return dispatch => {
        dispatch(ResetBookingFlag())
        return axios({
            method: "post",

            url: "https://tripvilla-api.abhisheksaklani.co/admin/create_booking",

            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Booking_Confirmed(data))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}

export const ResetBookingFlag = () => {
    return {
        type: "RESET_BOOKING_SMS_EMAIL_FLAG",

    }
}

export const LoadBookingData = (data) => {
    return {
        type: "LOAD_BOOKING_DATA",
        payload: data
    }
}

export const Booking_Confirmed = (data) => {
    return {
        type: "BOOKING_CONFIRMED",
        payload: data

    }
}