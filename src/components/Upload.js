import React, { Component } from 'react'
// import { postUpload } from '../actions/upload'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AWS from 'aws-sdk'
require('dotenv').config();

export default class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success: false,
            url: '',
            file: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            success: false,
            url: '',
            file: e.target.files[0].name
        })
    }

    uploadFile = (file) => {
      AWS.config.update({
        region: 'ap-south-1',
        accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
        secretAccessKey: process.env.REACT_APP_AWSSecretKey,
      })
      const send_file = file
      file = file.split('.')
      const params = {
        ACL: 'public-read',
        Key: file[0],
        ContentType: 'application/octet-stream',
        Body: send_file,
        Bucket: process.env.REACT_APP_Bucket
      }
      var myBucket = new AWS.S3()
      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          this.setState({
            url: `https://${process.env.REACT_APP_Bucket}.s3.amazonaws.com/${file[0]}`,
            progress: Math.round((evt.loaded / evt.total) * 100),
          })
        })
        .send((err) => {
           if (err) {
           }
        })
    }

render() {
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          <input
            onChange={this.handleChange} 
            type="file"
            ref={fileInput => (this.fileInput = fileInput)}
          />
          <br/>
          <button onClick={(file) => this.uploadFile(this.state.file)}>UPLOAD</button>
          {this.state.url}
        </center>
      </div>
    );
}

}
