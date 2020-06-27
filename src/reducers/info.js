import {
    GET_USER_INFO,
    POST_USER_INFO,
    USER_INFO_ERRORS
} from '../actions/types'

const initialState = {
    userinfo: [],
    postuserinfo: [],
    userinfoerror: null,
}

const infoReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                userinfo: action.payload,
            };
        case POST_USER_INFO:
            return {
                ...state,
                postuserinfo: action.payload,
                userinfo: [...state.userinfo, action.payload],
            }
        case USER_INFO_ERRORS:
            return {
                ...state,
                userinfoerror: action.payload,
            }
        default:
            return state
    }
}

export default infoReducer
