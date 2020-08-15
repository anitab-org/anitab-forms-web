import React, { Component } from 'react'
import './../styles/ErrorPage.css'
import './../styles/App.css'


class ErrorPage extends Component {
    render() {
      return (
           <div className="errorPage">
             <div className="errorPage_content">
                    <h1>404</h1>
                    <h4>Oops! Page Not Found</h4>
                    <p>Sorry, the page you were looking for doesn't exist. If you think something is wrong, try again.</p>
                </div>
            </div>
     )
  }
}    

export default ErrorPage
