import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react'
import configureStore from './store'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';

const store = configureStore()
window.store = store

ReactDOM.render (
  <Provider store={store}>
      <App/>
  </Provider>, document.getElementById('root')
)
