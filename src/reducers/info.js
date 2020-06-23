import {
    GET_USER_INFO,
    POST_USER_INFO,
    USER_INFO_ERRORS,
    UPDATE_USER_INFO
} from '../actions/types'

const initialState = {
    userinfo: [],
    postuserinfo: [],
    userinfoerror: null,
    userinfoid: null,
}

const infoReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                userinfo: action.payload,
                userinfoid: action.payload.length !== 0 ? action.payload[0].id : state.userinfoid
            };
        case POST_USER_INFO:
            return {
                ...state,
                postuserinfo: action.payload,
                userinfo: [action.payload],
                userinfoid: action.payload.id
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                userinfo: [action.payload],
                userinfoid: action.payload.id
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
