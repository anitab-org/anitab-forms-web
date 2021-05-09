import { USER, USER_ERRORS } from '../actions/types';

const initialState = {
  user: [],
  usererror: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ERRORS:
      return {
        ...state,
        usererror: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
