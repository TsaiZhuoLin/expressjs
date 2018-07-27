import React, { Component } from "react";
import "./home.scss";

import MyInput from "./MyInput/MyInput";

import { Container } from "react-materialize";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [
        {
          first_name: "",
          last_name: "",
          email: "",
          created_time: "",
          updated_time: "",
          creator: "",
          updater: ""
        }
      ]
    };
  }

  render() {
    return (
      <div className="masterContainer">
        <div className="homeBlock">
          <Container>
            <div className="loginBlock">
              <MyInput />
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
