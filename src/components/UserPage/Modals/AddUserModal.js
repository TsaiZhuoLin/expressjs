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
    this.inputIDChange = this.inputIDChange.bind(this);
    this.inputFirstNameChange = this.inputFirstNameChange.bind(this);
  }

  test() {
    console.log(this.state);
    // this.props.onAdd("this is from home.js");
  }

  inputIDChange(e) {
    // this.setState({
    //   newUserData: {
    //     id: e.target.value
    //   }
    // });

    this.setState(prevState => ({
      newUserData: {
        ...prevState.newUserData,
        id: e.target.value
      }
    }));

    // let v = e.target.value;
    // this.setState(
    //   prevState => ({
    //     ...prevState,
    //     newUserData: {
    //       ...prevState.newUserData
    //       // id: 100
    //       // id: v
    //       // id: v
    //     }
    //   }),
    //   () => console.log(this.state)
    // );
  }

  inputFirstNameChange(e) {
    // this.setState({
    //   newUserData: {
    //     first_name: e.target.value
    //   }
    // });

    this.setState(prevState => ({
      newUserData: {
        ...prevState.newUserData,
        id: e.target.value
      }
    }));
  }

  inputLastNameChange(e) {}

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
          <Input
            className="userIDInput"
            placeholder="ID..."
            s={8}
            type="text"
            label="ID"
            defaultValue={this.state.newUserData.id}
            onChange={e => this.inputIDChange(e)}
          />
          <Input
            className="userFirstNameInput"
            placeholder="First Name..."
            s={8}
            label="First Name"
            defaultValue={this.state.newUserData.first_name}
            onChange={
              e => this.inputFirstNameChange(e)
              // this.setState(prevState => ({
              //   newUserData: {
              //     ...prevState.newUserData,
              //     first_name: e.target.value
              //   }
              // }));
            }
          />
          <Input
            className="userLastNameInput"
            placeholder="Last Name..."
            s={8}
            label="Last Name"
            defaultValue={this.state.newUserData.last_name}
            onChange={e => this.inputLastNameChange(e)}
          />
          <Input
            className="userPasswordInput"
            placeholder="Password..."
            s={8}
            label="Password"
            defaultValue={this.state.newUserData.password}
            onChange={e => {
              this.setState(prevState => ({
                newUserData: {
                  ...prevState.newUserData,
                  password: e.target.value
                }
              }));
            }}
          />
          <Input
            className="userEmailInput"
            placeholder="Email..."
            s={8}
            label="Email"
            defaultValue={this.state.newUserData.email}
            onChange={e => {
              this.setState(prevState => ({
                newUserData: {
                  ...prevState.newUserData,
                  email: e.target.value
                }
              }));
            }}
          />
        </Row>
      </Modal>
    );
  }
}
