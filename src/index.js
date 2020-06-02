import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import createHistory from 'history/createBrowserHistory'
import configureStore from './store'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';

const history = createHistory()
const store = configureStore()
window.store = store

ReactDOM.render (
  <Provider store={store}>
      <App/>
  </Provider>, document.getElementById('root')
)

// serviceWorker.register()

// export default class AppRouter extends Component {
//   constructor(props) {
//     super(props)
//     this.store = createStore(rootReducers,applyMiddleware(thunk))
//   }

//   render() {
//     console.log("hello")
//     return (
//       <Provider store={store}>
//           {/* <ConnectedRouter history={history} > */}
//             <Switch>
//               <Route path='/' component={App} />
//             </Switch>
//           {/* </ConnectedRouter> */}
//       </Provider>, document.getElementById('root')
//     )
//   }
// }


  

// export default class AppRouter extends Component{
//   render() {
//     return(
//       <Provider store={store}>
//         <ConnectedRouter history={history} >
//             <Switch>
//               <Route path='/' component={App} />
//             </Switch>
//           </ConnectedRouter>
//       </Provider>
//     )
//   }
// }



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
