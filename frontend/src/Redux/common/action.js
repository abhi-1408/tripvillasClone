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
            url: "http://221646a81d84.ngrok.io/admin/allhotel",
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


export const Apply_Filters = (info) => {
    return dispatch => {
        return axios({
            method: "get",
            url: "http://221646a81d84.ngrok.io/admin/filter",
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
            url: "http://221646a81d84.ngrok.io/admin/filter",
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

