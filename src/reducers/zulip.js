import {
    GET_ZULIP_STAT,
    UPDATE_ZULIP_STAT,
    ZULIP_STAT_ERROR
} from '../actions/types'

const initialState = {
    zulipstat: [],
    zulipstaterror: ''
}

const zulipReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ZULIP_STAT:
            return {
                ...state,
                zulipstat: action.payload
            }
        case UPDATE_ZULIP_STAT:
            return {
                ...state,
                zulipstat: [action.payload]
            }
        case ZULIP_STAT_ERROR:
            return {
                ...state,
                zulipstaterror: action.payload
            }
        default:
            return state
    }
}

export default zulipReducer
