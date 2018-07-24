import React, { Component } from "react";
import "./MyInput.scss";

import { Row, Input, Button } from "react-materialize";
import { Link } from "react-router-dom";

export default class MyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      user_pw: ""
    };
  }

  inputUserID(e) {
    this.setState({
      user_id: e.target.value
    });
  }

  inputUserPW(e) {
    this.setState({
      user_pw: e.target.value
    });
  }

  signInBtnClick() {
    console.log(this.state);
    let userLoginData = this.state;
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(userLoginData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.log(`We got errors : ${err}`));
  }

  render() {
    return (
      <Row className="inputBlock">
        <Input
          className="inputIDEle"
          placeholder="Please enter your ID..."
          s={12}
          label="ID"
          defaultValue={this.state.user_id}
          onChange={e => this.inputUserID(e)}
        />

        <Input
          className="inputPWEle"
          placeholder="Please enter your Password..."
          s={12}
          label="Password"
          defaultValue={this.state.user_PW}
          onChange={e => this.inputUserPW(e)}
        />

        <Link to="/UserPage">
          <Button
            className="green lighten-1 signBtnEle"
            waves="light"
            onClick={() => this.signInBtnClick()}
          >
            Sign In
          </Button>
        </Link>
      </Row>
    );
  }
}
