import {
  LOGIN,
  REGISTER,
  LOGIN_ERRORS,
  REGISTER_ERRORS,
} from '../actions/types';

const initialState = {
  login: [],
  register: [],
  loginerror: null,
  registererror: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case REGISTER:
      return {
        ...state,
        register: action.payload,
      };
    case LOGIN_ERRORS:
      return {
        ...state,
        loginerror: action.payload,
      };
    case REGISTER_ERRORS:
      return {
        ...state,
        registererror: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
