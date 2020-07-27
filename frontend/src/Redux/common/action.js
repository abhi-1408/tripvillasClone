import axios from "axios"


export const Apply_Data = (data) => {
    return {
        type: "DATA_LOAD",
        payload: data
    }
}

export const Load_Data = (info) => {
    return dispatch => {
        return axios({
            method: "post",
            url: "http://c562fcfe8d0c.ngrok.io/admin/allhotel",
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
            url: "http://c562fcfe8d0c.ngrok.io/admin/filter",
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


export const Load_Filtered_Data = (info) => {
    return dispatch => {
        return axios({
            method: "get",
            url: "http://c562fcfe8d0c.ngrok.io/admin/filter",
            params: info
        })
            .then((res) => res.data.data)
            .then((data) => {
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

export const Load_Specific_Property = (info) => {
    return dispatch => {
        return axios({
            method: "post",
            url: "http://c562fcfe8d0c.ngrok.io/entity/getprop",
            data: info
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Apply_Specific(data))
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
            url: "http://c562fcfe8d0c.ngrok.io/entity/getrecommendrating",
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



export const Load_Recommended_State = (info) => {
    return dispatch => {
        return axios({
            method: "post",
            url: "http://c562fcfe8d0c.ngrok.io/entity/getrecommendcity",
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

export const Specific_Hotel_Available_On_Date = (info) => {
    return dispatch => {
        return axios({
            method: "post",
            url: "http://c562fcfe8d0c.ngrok.io/admin/avaispecific",
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


