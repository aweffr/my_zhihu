import React, {Component} from 'react';
import axios from "axios";
import Layout from "../components/layout";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import FormModal from "../components/form-modal";

class QuestionDetail extends Component {

  modelRef = React.createRef();

  state = {
    inputAnswerText: '',
    question: null,
    answers: [],
  }

  componentDidMount() {
    const questionId = this.props.questionId;
    if (questionId) {
      this.fetchDataAndUpdate(questionId);
    }
  }

  fetchDataAndUpdate = (questionId) => {
    axios.get(`/api/questions/${questionId}/`)
      .then(resp => {
        this.setState({question: resp.data});
      })

    axios.get(`/api/answers/`, {params: {question: questionId}})
      .then(resp => {
        this.setState({answers: resp.data});
      })
  }

  openModal = () => {
    this.modelRef.current?.open?.();
  }

  onTextChange = (e) => {
    this.setState({
      inputAnswerText: e.target.value,
    })
  }

  submitAnswer = () => {
    const inputAnswerText = this.state.inputAnswerText;
    axios.post('/api/answers/', {
      question: this.state.question.url,
      answer_text: inputAnswerText,
    }).then(resp => {
      this.modelRef.current?.close?.();
      this.fetchDataAndUpdate(this.props.questionId);
    }).catch(err => {
      let errInfo;
      if (err.isAxiosError && err.response?.data) {
        errInfo = err.response.data;
      } else {
        errInfo = {name: err?.name, message: err?.message,}
      }
      this.setState({inputAnswerErr: errInfo});
    })
  }

  render() {
    if (!this.state.question) {
      return (
        <Layout>
          {
            <div className="question-title">加载中...</div>
          }
        </Layout>
      )
    }
    return (
      <Layout>
        <div className="question-title">
          {this.state.question.title}
        </div>
        <div>
          {
            this.state.answers.map(answer => (
              <div className="list-item">
                <div>回答者: <span className="username">{answer.create_by.username}</span></div>
                <p className="answer-text">{answer.answer_text}</p>
              </div>
            ))
          }
        </div>
        <div>
          <Button color="primary" onClick={this.openModal}>回答</Button>
          <Button className="ml-1" onClick={() => window.location.pathname = "/questions"}>返回</Button>
        </div>
        <FormModal ref={this.modelRef} title={this.state.question.title} onSubmit={this.submitAnswer}>
          <Form>
            <FormGroup>
              <Label for="answerText">回答</Label>
              <Input
                type="textarea" name="text" id="answerText"
                style={{minHeight: 180}}
                onChange={this.onTextChange}
                value={this.state.inputAnswerText}
              />
            </FormGroup>
            {
              this.state.inputAnswerErr && (
                <pre>
                  {JSON.stringify(this.state.inputAnswerErr)}
                </pre>
              )
            }
          </Form>
        </FormModal>
      </Layout>
    );
  }
}

export default QuestionDetail;
