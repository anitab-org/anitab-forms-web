import axios from 'axios';
import { urlLogin, urlRegister } from '../urls';
import { LOGIN, REGISTER, LOGIN_ERRORS, REGISTER_ERRORS } from './types';

export const postLogin = (data, callback) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await axios.post(urlLogin(), data, config);
    dispatch({
      type: LOGIN,
      payload: res.data,
    });

    // set token value
    localStorage.setItem('token', res.data.access);
    callback();
  } catch (err) {
    dispatch({
      type: LOGIN_ERRORS,
      payload: err.data,
    });
    callback();
  }
};

export const postRegister = (data, callback) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await axios.post(urlRegister(), data, config);
    dispatch({
      type: REGISTER,
      payload: res.data,
    });
    callback();
  } catch (err) {
    dispatch({
      type: REGISTER_ERRORS,
      payload: err.data,
    });
    callback();
  }
};
