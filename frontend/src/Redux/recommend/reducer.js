// import {LOGIN_QUERY,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,LOGIN_INFO_RESET} from "./actiontypes.js"

const initialState = {
    recommended_state: [],
    recommended_review: [],
    recommend_specific_flag: false,
    recommended_specific: [],
}

export default (state = initialState, { type, payload }) => {

    switch (type) {

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

        case "LOAD_RECOMMENDED_SPECIFIC":
            return {
                ...state,
                recommend_specific_flag: false
            }

        case "APPLY_RECOMMENDED_SPECIFIC":
            return {
                ...state,
                recommend_specific_flag: true,
                recommended_specific: payload
            }

        default:
            return state
    }
}
