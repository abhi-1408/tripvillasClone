import axios from "axios"


export const Apply_Data = (data) => {
    return {
        type: "DATA_LOAD",
        payload: data
    }
}

export const LoadBookingData = (data) => {
    return {
        type: "LOAD_BOOKING_DATA",
        payload: data
    }
}

export const Load_Data = (info) => {
    return dispatch => {
        return axios({
            method: "post",

            url: "https://tripvilla-api.abhisheksaklani.co/admin/allhotel",

            data: {}
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_Data(data))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}


export const Save_Filter = (data) => {
    return {
        type: "SAVE_FILTER",
        payload: data
    }
}

export const Reset_filter = () => {
    return {
        type: "RESET_FILTER",
    }
}


export const Apply_Filters = (info) => {
    return dispatch => {
        return axios({
            method: "get",

            url: "https://tripvilla-api.abhisheksaklani.co/admin/filter",

            params: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_Data(data))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}


export const ResetFilterPageFlag = () => {
    return {
        type: "RESET_FILTER_PAGE_FLAG",
    }
}

export const Load_Filtered_Data = (info) => {
    return dispatch => {
        dispatch(ResetFilterPageFlag())
        return axios({
            method: "get",

            url: "https://tripvilla-api.abhisheksaklani.co/admin/filter",

            params: info
        })
            .then((res) => res.data.data)
            .then((data) => {
                // return data
                dispatch(Apply_Data(data))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}

export const Apply_Specific = (data) => {
    return {
        type: "DATA_SPECIFIC",
        payload: data
    }
}

export const Apply_Review = (data) => {
    return {
        type: "DATA_SPECIFIC",
        payload: data
    }
}

export const Load_Specific_Review = (info) => {
    return dispatch => {
        return axios({
            method: "post",

            url: "https://tripvilla-api.abhisheksaklani.co/entity/getreview",

            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_Review(data))

            })
            .catch((err) => {
                console.log(err)

            })
    }
}

export const Update_Specific_Property_Flag = () => {
    return {
        type: "UPDATE_SPECIFIC_PROP_FLAG",

    }
}

export const Load_Specific_Property = (info) => {
    return dispatch => {
        dispatch(Update_Specific_Property_Flag())
        return axios({
            method: "post",

            url: "https://tripvilla-api.abhisheksaklani.co/entity/getprop",

            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_Specific(data))
                // if (data[0]["review_count"] > 0) {
                //     dispatch(Load_Specific_Review({ "hotel_id": data[0]['id'] }))
                // }
            })
            .catch((err) => {
                console.log(err)

            })
    }
}

export const Apply_Recommended_State = (data) => {
    return {
        type: "RECOMMENDED_STATE",
        payload: data
    }
}

export const Apply_Recommended_Review = (data) => {
    return {
        type: "RECOMMENDED_REVIEW",
        payload: data
    }
}

export const Reset_All = (data) => {
    return {
        type: "RESET_ALL",

    }
}

export const Load_Recommended_Rating = (info) => {
    return dispatch => {
        return axios({
            method: "post",

            url: "https://tripvilla-api.abhisheksaklani.co/entity/getrecommendrating",

            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_Recommended_Review(data))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}


export const Loading_Recommend_Specific = () => {
    return {
        type: "LOAD_RECOMMENDED_SPECIFIC",

    }
}

export const Apply_Recommended_Specific = (data) => {
    return {
        type: "APPLY_RECOMMENDED_SPECIFIC",
        payload: data
    }
}


export const Recommend_By_Specific_Hotel = (info) => {
    return dispatch => {
        dispatch(Loading_Recommend_Specific())
        return axios({
            method: "post",
            url: "https://tripvilla-api.abhisheksaklani.co/entity/getrecommend",
            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_Recommended_Specific(data))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}

export const Booking_Confirmed = (data) => {
    return {
        type: "BOOKING_CONFIRMED",
        payload: data

    }
}

export const Update_Payment_Flag = () => {
    return {
        type: "UPDATE_PAYMENT_FLAG",

    }
}

export const ResetBookingFlag = () => {
    return {
        type: "RESET_BOOKING_SMS_EMAIL_FLAG",

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



export const Load_Recommended_State = (info) => {
    return dispatch => {
        return axios({
            method: "post",

            url: "https://tripvilla-api.abhisheksaklani.co/entity/getrecommendcity",

            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_Recommended_State(data))
                dispatch(Load_Recommended_Rating(info))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}

export const Specific_Hotel_Available = (data) => {
    return {
        type: "AVAILABLE_HOTEL",
        payload: data
    }
}

export const Event_Check = (data) => {
    return {
        type: "CHECK",
        payload: data
    }
}

export const Specific_Hotel_Available_On_Date = (info) => {

    return dispatch => {
        dispatch(Event_Check(info))
        return axios({
            method: "post",

            url: "https://tripvilla-api.abhisheksaklani.co/admin/avaispecific",

            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Specific_Hotel_Available(data))
            })
            .catch((err) => {
                console.log(err)

            })
    }
}

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