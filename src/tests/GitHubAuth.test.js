import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import GitHubAuth from '../components/GitHubAuth';
import loginReducer from '../reducers/login';

afterEach(cleanup);

function renderWithRedux(
  component,
  { initialState, store = createStore(loginReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

it('Renders GitHub Login Button', () => {
  const { getByTestId } = renderWithRedux(<GitHubAuth />);
  expect(getByTestId('GitHubLoginButton')).toHaveTextContent(
    'Log in with GitHub'
  );
});
