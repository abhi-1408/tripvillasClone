// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"

const initialState = {
    data: [],
    filters: { "swimming_pool": false, "ac": false, "internet": false, "television": false, "parking": false, "housekeeping": false, "functional_kitchen": false, "washing_machine": false, "dish_washer": false, "sort_by": false },
    filter_list: ["swimming_pool", "ac", "internet", "television", "parking", "housekeeping", "functional_kitchen", "washing_machine", "dish_washer"]

}

export default (state = initialState, { type, payload }) => {

    switch (type) {

        case "DATA_LOAD":
            return {
                ...state,
                data: payload
            }

        case "SAVE_FILTER":
            return {
                ...state,
                filter: payload
            }

        default:
            return state
    }
}
