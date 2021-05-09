import React, { Component } from 'react';
import AWS from 'aws-sdk';
require('dotenv').config();

export default class Upload extends Component {
  // This component shows a demo of how the uploading feature will work with file uploads in form responses
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: '',
      file: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      success: false,
      url: '',
      file: e.target.files[0].name,
    });
  };

  // the function which handles the file upload to the AWS S3 bucket
  uploadFile = (file) => {
    AWS.config.update({
      region: 'ap-south-1',
      accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
      secretAccessKey: process.env.REACT_APP_AWSSecretKey,
    });
    const send_file = file;
    file = file.split('.');
    const params = {
      ACL: 'public-read',
      Key: file[0],
      ContentType: 'application/octet-stream',
      Body: send_file,
      Bucket: process.env.REACT_APP_Bucket,
    };
    var myBucket = new AWS.S3();
    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        this.setState({
          url: `https://${process.env.REACT_APP_Bucket}.s3.amazonaws.com/${file[0]}`,
          progress: Math.round((evt.loaded / evt.total) * 100),
        });
      })
      .send((err) => {
        // I am not sure how S3 works so diabling eslint here to prevent unknown side effects
        /* eslint-disable no-empty */
        if (err) {
        }
      });
  };

  render() {
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          <input
            onChange={this.handleChange}
            type="file"
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <br />
          <button onClick={() => this.uploadFile(this.state.file)}>
            UPLOAD
          </button>
          {this.state.url}
        </center>
      </div>
    );
  }
}
