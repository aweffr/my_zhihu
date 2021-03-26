import React, {Component} from 'react';
import axios from 'axios';
import Layout from "../components/layout";
import moment from "moment";
import FormModal from "../components/form-modal";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";


class QuestionList extends Component {

  modelRef = React.createRef();

  state = {
    questions: [],
    inputTitle: "",
    inputDetail: "",
  }

  componentDidMount() {
    this.fetchAndUpdate();
  }

  fetchAndUpdate = () => {
    return axios.get("/api/questions/")
      .then(resp => {
        console.log("resp.data=", resp.data);
        this.setState({
          questions: resp.data
        })
      })
  }

  onQuestionClick = (question) => {
    window.location = "/questions/" + question.id + "/";
  }

  submitQuestion = () => {
    axios.post("/api/questions/", {
      title: this.state.inputTitle,
      detail: this.state.inputDetail,
    }).then(resp => {
      this.modelRef.current?.close?.();
      this.fetchAndUpdate();
    }).catch(err => {
      console.error(err);
    })
  }

  openModal = () => {
    this.modelRef.current?.open?.();
  }


  render() {
    return (
      <Layout>
        {
          this.state.questions.map((question) => (
            <div className="list-item">
              <div
                className="question-title"
                onClick={() => this.onQuestionClick(question)}>
                {question.title}
              </div>
              <div>
                提问者: {question.create_by.username}
              </div>
              <div>{moment(question.create_at).format("YYYY-MM-DD HH:mm")}</div>
            </div>
          ))
        }
        <div>
          <Button color="primary" onClick={this.openModal}>添加问题</Button>
        </div>
        <FormModal ref={this.modelRef} onSubmit={this.submitQuestion} title="添加问题">
          <Form>
            <FormGroup>
              <Label for="title">标题</Label>
              <Input id="title"
                     onChange={(e) => this.setState({inputTitle: e.target.value})}
                     placeholder="请输入标题"
                     value={this.state.inputTitle}/>
            </FormGroup>
            <FormGroup>
              <Label for="detail">说明</Label>
              <Input id="detail"
                     type="textarea"
                     onChange={(e) => this.setState({inputDetail: e.target.value})}
                     placeholder="请输入说明"
                     value={this.state.inputDetail}/>
            </FormGroup>
          </Form>
        </FormModal>

      </Layout>
    );
  }
}

export default QuestionList;
