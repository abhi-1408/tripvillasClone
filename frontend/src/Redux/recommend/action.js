import axios from "axios"

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