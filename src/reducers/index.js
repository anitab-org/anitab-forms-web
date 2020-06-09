import { combineReducers } from 'redux'
import loginReducer from './login'
import infoReducer from './info'
import userReducer from './user'

const rootReducers = combineReducers ({
    login: loginReducer,
    info: infoReducer,
    user: userReducer
})

export default rootReducers