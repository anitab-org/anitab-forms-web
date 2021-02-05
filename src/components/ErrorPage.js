import React, { Component } from 'react'
import './../styles/ErrorPage.css'
import './../styles/App.css'
import { Header } from 'semantic-ui-react';

class ErrorPage extends Component {
  render() {
    return (
      <div className="errorPage">
        <div className="errorPage_content">
          <Header
            as='h1'
            content='404'
            style={{
              color: '#2185D0',
              fontSize: '10vw',
              fontWeight: 'bolder',
              lineHeight: '1em',
              textTransform: 'uppercase',
            }}
          />
          <Header
            as='h4'
            content='Oops! Page Not Found'
            style={{
              fontSize: '2em',
              marginBottom: '20px',
              textTransform: 'uppercase',
              maxWidth: '600px',
              color: '#0d0d0d',
            }}
          />
          <p>Sorry, the page you were looking for doesn't exist. If you think something is wrong, try again.</p>
        </div>
      </div>
    )
  }
}

export default ErrorPage
