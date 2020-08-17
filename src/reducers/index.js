import { combineReducers } from 'redux'
import loginReducer from './login'
import infoReducer from './info'
import userReducer from './user'
import formReducer from './form'
import questionReducer from './question'
import submissionReducer from './submission'

const rootReducers = combineReducers ({
    login: loginReducer,
    info: infoReducer,
    user: userReducer,
    form: formReducer,
    questions: questionReducer,
    submission: submissionReducer
})

export default rootReducers
