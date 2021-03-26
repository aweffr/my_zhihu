import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {useCookies} from 'react-cookie';
import Layout from "../components/layout";
import axios from "axios";

function Login(props) {

  const [err, setErr] = useState("");

  useEffect(()=>{
    if(window.location.pathname !== "/login/") {
      window.history.pushState(null, "", "/login/")
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const username = e.target[0].value;
    const password = e.target[1].value;
    console.log({username, password});

    setErr(null);

    axios.post("/api/dj-rest-auth/login/", {
      username,
      password,
    }).then(resp => {
      const key = resp.data.key;
      sessionStorage.setItem("userToken", key);
      window.location.pathname = "/"

    }).catch(err => {
      if (err.isAxiosError && err.response.data) {
        setErr(err.response.data)
      } else {
        setErr({message: err.message, code: err.code, name: err.name})
      }
    })

  }


  return (
    <Layout>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="username">用户名</Label>
          <Input type="text" name="username" id="username" placeholder="用户名"/>
        </FormGroup>
        <FormGroup>
          <Label for="password">密码</Label>
          <Input type="password" name="password" id="password" placeholder="密码"/>
        </FormGroup>
        <Button type="submit" color="primary">登录</Button>
        {
          err && (
            <div>
              <pre>
                {JSON.stringify(err)}
              </pre>
            </div>
          )
        }
      </Form>
    </Layout>
  );
}

export default Login;
