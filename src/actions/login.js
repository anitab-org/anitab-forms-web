import axios from 'axios';
import { urlLogin, urlRegister, urlActivate } from '../urls';

import { LOGIN, REGISTER, LOGIN_ERRORS, REGISTER_ERRORS } from './types';

export const GoogleOauthLogin = (data, callback) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const obj = {
      access_token: data.tokenObj.access_token,
      id_token: data.tokenObj.id_token,
    };
    console.log(obj);
    const res = await axios.post(urlGoogleLogin(), obj, config);
    console.log(res);
    dispatch({
      type: LOGIN,
      payload: res.data,
    });

    // set token value
    localStorage.setItem('token', res.data.access_token);
    callback();
  } catch (err) {
    dispatch({
      type: LOGIN_ERRORS,
      payload: err.response,
    });
    callback();
  }
};

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
      payload: err.response.data,
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
      payload: err.response.data,
    });
    callback();
  }
};

export const getActivate = (data, callback) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await axios.get(urlActivate(data.uidb64, data.token), config);
    dispatch({
      type: ACTIVATE,
      payload: res.data,
    });
    callback();
  } catch (err) {
    // console.log(err.response.data)
    dispatch({
      type: ACTIVATE_ERRORS,
      payload: err.response.data,
    });
    callback();
  }
};
