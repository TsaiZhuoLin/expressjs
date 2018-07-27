import React, { Component } from "react";
import { Modal, Button, Row, Input } from "react-materialize";

export default class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      is_manager: ""
    };
  }

  addNewUser() {
    let newUserData = this.state;
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(`We got errors : ${err}`));
    this.closeModal();
    this.getAllUsers();
  }

  getAllUsers() {
    fetch("http://localhost:3000/api/users", {
      method: "GET"
      // credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          userData: data
        });
      })
      .catch(err => console.log(`We got errors : ${err}`));
  }

  closeModal() {
    $(".input-field > input").val("");
    $("#addUserModal").modal("close");
  }

  render() {
    return (
      <Modal
        id="addUserModal"
        className="addUserModalBlock"
        actions={
          <div className="modalBtnBlock">
            <Button
              onClick={() => this.closeModal()}
              className="red darken-3"
              waves="light"
            >
              Cancel
            </Button>
            <Button
              className="green lighten-1"
              waves="light"
              onClick={() => {
                this.addNewUser();
              }}
            >
              Add
            </Button>
          </div>
        }
      >
        <Row className="addUserInputBlock">
          <Input
            className="userFirstNameInput"
            placeholder="First Name..."
            s={8}
            label="First Name"
            defaultValue={this.state.first_name}
            maxLength="50"
            onChange={e =>
              this.setState({
                first_name: e.target.value
              })
            }
          />
          <Input
            className="userLastNameInput"
            placeholder="Last Name..."
            s={8}
            label="Last Name"
            defaultValue={this.state.last_name}
            maxLength="50"
            onChange={e =>
              this.setState({
                last_name: e.target.value
              })
            }
          />
          <Input
            className="userPasswordInput"
            placeholder="Password..."
            s={8}
            label="Password"
            defaultValue={this.state.password}
            maxLength="50"
            onChange={e =>
              this.setState({
                password: e.target.value
              })
            }
          />
          <Input
            className="userEmailInput"
            placeholder="Email..."
            s={8}
            label="Email"
            defaultValue={this.state.email}
            maxLength="50"
            onChange={e =>
              this.setState({
                email: e.target.value
              })
            }
          />
          <Input
            className="userIsManagerInput"
            placeholder="Is manager..."
            s={8}
            label="Is Manager"
            defaultValue={this.state.is_manager}
            maxLength="5"
            onChange={e =>
              this.setState({
                is_manager: e.target.value
              })
            }
          />
        </Row>
      </Modal>
    );
  }
}
