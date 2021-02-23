import { createBrowserHistory } from 'history';
import { apiMiddleware } from 'redux-api-middleware';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export const history = createBrowserHistory();

// disabling eslint until I know for sure that it won't change the usual behaviour
/* eslint-disable no-unused-vars */
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);

export default function configureStore(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [thunk, reactRouterMiddleware];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
}
