import React from 'react';
import ReactDOM from 'react-dom';
import QuestionDetail from "./pages/question-detail";
import QuestionList from "./pages/question-list";
import {reLogin, reQuestionDetail} from "./my-path-regexp";
import Login from "./pages/login";
import axios from "axios";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

let App;

axios.defaults.withCredentials = true;

const userToken = sessionStorage.getItem("userToken");
if (!userToken) {
  App = () => <Login/>;
} else {
  axios.defaults.headers = {
    'Authorization': `Token ${userToken}`
  }
  let loginMatchResult = reLogin.exec(window.location.pathname);
  let detailResult = reQuestionDetail.exec(window.location.pathname);

  if (loginMatchResult) {
    App = () => <Login/>;
  } else if (detailResult) {
    const questionId = detailResult[1];
    App = () => <QuestionDetail questionId={questionId}/>;
  } else {
    App = () => <QuestionList/>
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
