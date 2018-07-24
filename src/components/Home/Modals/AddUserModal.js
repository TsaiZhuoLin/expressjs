import React, { Component } from "react";
import { Modal, Button, Row, Input } from "react-materialize";

export default class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: this.props.record || {},
      newUserData: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        created_time: "",
        updated_time: "",
        creator: "",
        updater: ""
      }
    };
  }

  test() {
    console.log(this.state);
    this.props.onAdd("this is from home.js");
  }

  render() {
    return (
      <Modal
        id="addUserModal"
        className="addUserModalBlock"
        actions={
          <div className="modalBtnBlock">
            <Button
              onClick={() => $("#addUserModal").modal("close")}
              className="red darken-3"
              waves="light"
            >
              Cancel
            </Button>
            <Button
              className="green lighten-1"
              waves="light"
              onClick={() => {
                this.test();
              }}
            >
              Add
            </Button>
          </div>
        }
      >
        <Row className="addUserInputBlock">
          <Input className="userIDInput" placeholder="ID..." s={8} label="ID" />
          <Input
            className="userFirstNameInput"
            placeholder="First Name..."
            s={8}
            label="First Name"
            onInput={e => {
              this.setState({
                newUserData: {
                  first_name: e.target.value
                }
              });
              console.log(this.state.newUserData);
            }}
          />
          <Input
            className="userLastNameInput"
            placeholder="Last Name..."
            s={8}
            label="Last Name"
          />
          <Input
            className="userPasswordInput"
            placeholder="Password..."
            s={8}
            label="Password"
          />
          <Input
            className="userEmailInput"
            placeholder="Email..."
            s={8}
            label="Email"
          />
        </Row>
      </Modal>
    );
  }
}
