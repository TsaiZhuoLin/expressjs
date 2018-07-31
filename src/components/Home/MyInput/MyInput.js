import React, { Component } from "react";
import "./MyInput.scss";

import { Row, Input, Button } from "react-materialize";
import { withRouter } from "react-router-dom";

class MyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      user_pw: "",
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
    let userLoginData = this.state;
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(userLoginData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => {
        // login failed status 401
        if (res.status == 401) {
          alert("Please check username/password");
          return;
        }
        //login successful status 200
        if (res.status == 200) {
          //console.log(333, document.cookie);
          console.log(555, res)
          this.props.history.push("/UserPage");
        }
      })
      .catch(err => console.log(33, `We got errors : ${err}`));
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
          type="password"
          className="inputPWEle"
          placeholder="Please enter your Password..."
          s={12}
          label="Password"
          defaultValue={this.state.user_PW}
          onChange={e => this.inputUserPW(e)}
        />
        <Button
          className="green lighten-1 signBtnEle"
          waves="light"
          onClick={() => this.signInBtnClick()}
        >
          Sign In
        </Button>
      </Row>
    );
  }
}

export default withRouter(MyInput);
