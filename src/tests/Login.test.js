import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../store';
const store = configureStore();
window.store = store;

it('Disables Log in button when username/password is empty', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText('Enter your username...'), {
    target: { value: '' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password...'), {
    target: { value: '' },
  });

  expect(screen.getByText('LOG IN')).toBeDisabled();

  fireEvent.change(screen.getByPlaceholderText('Enter your username...'), {
    target: { value: 'testUsername' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password...'), {
    target: { value: '' },
  });

  expect(screen.getByText('LOG IN')).toBeDisabled();

  fireEvent.change(screen.getByPlaceholderText('Enter your username...'), {
    target: { value: '' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password...'), {
    target: { value: 'testPassword' },
  });

  expect(screen.getByText('LOG IN')).toBeDisabled();
});

it('Allows the user to log in when correct credentials are entered', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText('Enter your username...'), {
    target: { value: 'testUsername' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password...'), {
    target: { value: 'testPassword' },
  });

  expect(screen.getByText('LOG IN')).toBeEnabled();
  fireEvent.click(screen.getByText('LOG IN'));
});
