import { combineReducers } from 'redux'
import loginReducer from './login'
import infoReducer from './info'
import userReducer from './user'
import formReducer from './form'

const rootReducers = combineReducers ({
    login: loginReducer,
    info: infoReducer,
    user: userReducer,
    form: formReducer
})

export default rootReducers
