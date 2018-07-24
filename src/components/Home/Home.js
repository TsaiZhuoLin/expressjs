import React, { Component } from "react";
import "./home.scss";

import MyInput from "./MyInput/MyInput";
import SignInBtn from "./SignInBtn/SignInBtn";

import { Container, Button, Table, Modal, Row, Input } from "react-materialize";
import AddUserModal from "./Modals/AddUserModal";
import EditUserModal from "./Modals/EditUserModal";
import DeleteUserModal from "./Modals/DeleteUserModal";

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

  onAdd(value) {
    console.log("====================================");
    console.log("this is from" + value);
    console.log("====================================");
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
