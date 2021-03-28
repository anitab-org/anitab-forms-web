import React from 'react';
import { Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const middlewares = [thunk, routerMiddleware];

export function renderWithReduxAndRouter(
  component,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
  {
    initialState,
    store = createStore(
      rootReducers,
      initialState,
      compose(applyMiddleware(...middlewares))
    ),
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={path} component={component} />
        </Router>
      </Provider>
    ),
  };
}

export function renderWithRedux(
  component,
  {
    initialState,
    store = createStore(
      rootReducers,
      initialState,
      compose(applyMiddleware(...middlewares))
    ),
  } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}
