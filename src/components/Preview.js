import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/question';
import PropTypes from 'prop-types';
import '../styles/Questions.css';
import moment from 'moment';
import { postAnswers, getAnswers } from '../actions/answer';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { Form, TextArea, Divider, Button, Select } from 'semantic-ui-react';
import AWS from 'aws-sdk';
require('dotenv').config();

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      date: '',
      time: '',
      answers: [],
      error: null,
      success: false,
      file: '',
    };
  }

  async componentDidMount() {
    await this.props.getQuestions(this.props.id);
    await this.props.getAnswers(this.props.id);
    if (this.props.feedback[0]) {
      for (var i = 0; i < this.props.feedback[0].answers.length; i++) {
        this.state.answers.push({
          question: this.props.feedback[0].answers[i].question.id,
          value: this.props.feedback[0].answers[i].value,
        });
      }
    } else {
      for (var i = 0; i < this.props.questions.length; i++) {
        if (this.props.questions[i].data_type === 'checkbox') {
          this.state.answers.push({
            question: this.props.questions[i].id,
            value: [],
          });
        } else {
          this.state.answers.push({
            question: this.props.questions[i].id,
            value: '',
          });
        }
      }
    }
  }

  onChange = (e, id) => {
    this.setState({
      answers: this.state.answers.map((answer, index) => {
        return id === index
          ? {
              ...answer,
              value: e.target.value,
            }
          : answer;
      }),
    });
  };

  handleChange = (e, id, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({
        answers: this.state.answers.map((answer, index) => {
          return id === index
            ? {
                ...answer,
                value: value,
              }
            : answer;
        }),
      });
    }
  };

  handleFileChange = (e) => {
    this.setState({
      success: false,
      url: '',
      file: e.target.files[0].name,
    });
  };

  onSelect = (e, id, { value }) => {
    this.setState({
      answers: this.state.answers.map((answer, index) => {
        return id === index
          ? {
              ...answer,
              value: value,
            }
          : answer;
      }),
    });
  };

  onDropdownChange = (e, id) => {
    this.setState({
      answers: this.state.answers.map((answer, index) => {
        return id === index
          ? {
              ...answer,
              value: e.target.value,
            }
          : answer;
      }),
    });
  };

  checkboxChange = (e, id, optionindex) => {
    this.setState({
      answers: this.state.answers.map((answer, index) => {
        return id === index
          ? {
              ...answer,
              value: e.target.checked
                ? [
                    ...this.state.answers[id].value.filter(
                      (value, idx) => idx !== optionindex
                    ),
                    e.target.value,
                  ]
                : [
                    ...this.state.answers[id].value.filter(
                      (value, idx) => idx !== optionindex
                    ),
                  ],
            }
          : answer;
      }),
    });
  };

  uploadFile = (file, id) => {
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
          answers: this.state.answers.map((answer, index) => {
            return id === index
              ? {
                  ...answer,
                  value: `https://${process.env.REACT_APP_Bucket}.s3.amazonaws.com/${file[0]}`,
                }
              : answer;
          }),
          progress: Math.round((evt.loaded / evt.total) * 100),
        });
      })
      .send((err) => {
        if (err) {
          console.log(err);
        }
      });

    this.setState({
      answers: this.state.answers.map((answer, index) => {
        return id === index
          ? {
              ...answer,
              value: this.state.url,
            }
          : answer;
      }),
      url: '',
    });
  };

  submit = () => {
    const data = {
      form: this.props.id,
      answers: this.state.answers,
    };
    this.props.postAnswers(data, this.callback);
  };

  callback = () => {
    this.setState({
      error: this.props.answererror ? true : false,
    });
    setTimeout(() => {
      this.setState({
        error: null,
      });
    }, 5000);
  };
}

render();
{
  const { questions } = this.props;
  const { answers } = this.state;
  return (
    <Form className="preview">
      {/* question type view based on each data type  */}
      {questions && questions.length !== 0
        ? questions.map((question, index) => (
            <div key={index}>
              {question.data_type === 'char' ? (
                <div key={question.id}>
                  <Form.Input
                    label={question.order + '. ' + question.label}
                    type="text"
                    required={question.required}
                    value={answers[index] ? answers[index].value : ''}
                    onChange={(event) => this.onChange(event, index)}
                  />
                  <span>{question.description}</span>
                </div>
              ) : null}
              {question.data_type === 'text' ? (
                <div key={question.id}>
                  <Form.Input
                    label={question.order + '. ' + question.label}
                    control={TextArea}
                    required={question.required}
                    value={answers[index] ? answers[index].value : ''}
                    onChange={(event) => this.onChange(event, index)}
                  />
                  <span>{question.description}</span>
                </div>
              ) : null}
              {question.data_type === 'choice' ? (
                <div key={question.id}>
                  <span key={question.id}>
                    <b>{question.order + '. ' + question.label}</b>
                  </span>
                  {question.options.map((option) => (
                    <Form.Radio
                      label={option}
                      value={option}
                      checked={
                        answers[index] ? answers[index].value === option : false
                      }
                      key={option}
                      onChange={(event, value) =>
                        this.onSelect(event, index, value)
                      }
                    />
                  ))}
                  <span>{question.description}</span>
                </div>
              ) : null}
              {question.data_type === 'dropdown' ? (
                <div key={question.id}>
                  <Form.Input
                    label={question.order + '. ' + question.label}
                    control="select"
                    required={question.required}
                    onChange={(event) => this.onDropdownChange(event, index)}
                  >
                    {question.options.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Input>
                  <span>{question.description}</span>
                </div>
              ) : null}
              {question.data_type === 'checkbox' ? (
                <div key={question.id}>
                  <span>
                    <b>{question.order + '. ' + question.label}</b>
                  </span>
                  {question.options.map((option, id) => (
                    <Form.Input
                      label={option}
                      control="input"
                      type="checkbox"
                      key={id}
                      value={option}
                      checked={
                        answers[index]
                          ? answers[index].value[id] === option
                          : false
                      }
                      onChange={(event) =>
                        this.checkboxChange(event, index, id)
                      }
                    />
                  ))}
                  <span>{question.description}</span>
                </div>
              ) : null}
              {question.data_type === 'date' ? (
                <div key={question.id}>
                  <DateInput
                    label={question.order + '. ' + question.label}
                    required={question.required}
                    name="date"
                    dateFormat={moment(this.value).format('YYYY-MM-DD')}
                    value={answers[index] ? answers[index].value : ''}
                    onChange={(event, name, value) =>
                      this.handleChange(event, index, name, value)
                    }
                  />
                  <span>{question.description}</span>
                </div>
              ) : null}
              {question.data_type === 'time' ? (
                <div key={question.id}>
                  <TimeInput
                    label={question.order + '. ' + question.label}
                    required={question.required}
                    name="time"
                    disableMinute={false}
                    value={answers[index] ? answers[index].value : ''}
                    onChange={(event, name, value) =>
                      this.handleChange(event, index, name, value)
                    }
                  />
                  <span>{question.description}</span>
                </div>
              ) : null}
              {question.data_type === 'file' ? (
                <div key={question.id}>
                  <Form.Input
                    label={question.order + '. ' + question.label}
                    required={question.required}
                    type="file"
                    onChange={this.handleFileChange}
                    ref={(fileInput) => (this.fileInput = fileInput)}
                  />
                  <Button
                    basic
                    onClick={(file) => this.uploadFile(this.state.file, index)}
                  >
                    UPLOAD
                  </Button>
                  {answers[index] ? (
                    <a href={answers[index].value}>File URL</a>
                  ) : null}
                  <span>{question.description}</span>
                </div>
              ) : null}
              <Divider />
            </div>
          ))
        : null}
      <Button positive onClick={this.submit}>
        SUBMIT
      </Button>
    </Form>
  );
}

Preview.propTypes = {
  questions: PropTypes.array.isRequired,
  feedback: PropTypes.array.isRequired,
  feedback: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  questionerror: state.questions.questionerror,
  answererror: state.answer.answererror,
  feedback: state.answer.answers,
});

export default connect(mapStateToProps, {
  getQuestions,
  postAnswers,
  getAnswers,
})(Preview);
