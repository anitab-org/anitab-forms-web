import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers'

export const history = createBrowserHistory();

export default function configureStore(initialState) {
    const reactRouterMiddleware = routerMiddleware(history)
    const middlewares = [
        thunk,
        reactRouterMiddleware
    ]
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        rootReducers,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    )
    return store
}
