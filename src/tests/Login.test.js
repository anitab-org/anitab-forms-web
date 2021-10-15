import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../store';
import { postLogin } from '../actions/login';
import { LOGIN } from '../actions/types';
import axios from 'axios';

const store = configureStore();
window.store = store;

jest.mock('axios');
it('Disables Log in button when username/password is empty', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const username = screen.getByTestId('input-username').querySelector('input');
  const password = screen.getByTestId('input-password').querySelector('input');
  const loginButton = screen.getByTestId('button-login');

  fireEvent.change(username, {
    target: { value: '' },
  });
  fireEvent.change(password, {
    target: { value: '' },
  });

  expect(loginButton).toBeDisabled();

  fireEvent.change(username, {
    target: { value: 'testUsername' },
  });
  fireEvent.change(password, {
    target: { value: '' },
  });

  expect(loginButton).toBeDisabled();

  fireEvent.change(username, {
    target: { value: '' },
  });
  fireEvent.change(password, {
    target: { value: 'testPassword' },
  });

  expect(loginButton).toBeDisabled();
});

it('Enables Login button when username/password fields are nonempty', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const username = screen.getByTestId('input-username').querySelector('input');
  const password = screen.getByTestId('input-password').querySelector('input');
  const loginButton = screen.getByTestId('button-login');

  fireEvent.change(username, {
    target: { value: 'testUsername' },
  });
  fireEvent.change(password, {
    target: { value: 'testPassword' },
  });

  expect(loginButton).toBeEnabled();
});

it('Shows the password when the hide-password button is disabled', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const showPasswordButton = screen.getByTestId('hide-password');
  const password = screen.getByTestId('input-password').querySelector('input');

  expect(password).toHaveAttribute('type', 'password');
  fireEvent.click(showPasswordButton);
  expect(password).toHaveAttribute('type', 'text');
});
describe('Successful Login', () => {
  it('Should see success message', async () => {
    const response = {
      data: { detail: 'Login Successful' },
      status: 200,
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(response));
    const callback = jest.fn();
    const dispatchMock = jest.fn();
    const login = {
      username: 'username123',
      password: 'Testpassword123!',
    };
    const dispatch = postLogin(login, callback);
    await dispatch(dispatchMock);
    expect(callback).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: response.data,
      type: LOGIN,
    });
  });
});
