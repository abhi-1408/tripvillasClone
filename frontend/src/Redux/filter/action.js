import axios from "axios"

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