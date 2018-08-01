import React, { Component } from "react";
import './addUserModal.scss';
import { Modal, Button, Row, Input } from "react-materialize";


export default class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      role: ""
    };
  }

  componentDidMount() {
    $(document).ready(function () {
      $('select').formSelect();
    });
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
    window.location.reload();
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
        actions={""}
        header='Create A New User'
      >

        <Row className="addUserInputBlock">

          <div className="inputFieldWrapper">
            <Input
              className="userFirstNameInput"
              placeholder="First Name..."
              s={6}
              label="First Name"
              defaultValue={this.state.first_name}
              maxLength="50"
              minLength="5"
              onChange={e =>
                this.setState({
                  first_name: e.target.value
                })
              }
            />
            <Input
              className="userLastNameInput"
              placeholder="Last Name..."
              s={6}
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
              type="password"
              className="userPasswordInput"
              placeholder="Password..."
              s={6}
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
              type="email"
              className="userEmailInput validate"
              placeholder="Email..."
              s={6}
              label="Email"
              defaultValue={this.state.email}
              maxLength="50"
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />

            <div className="input-field col s6">
              <select
                defaultValue=""
                onChange={(e) =>
                  this.setState({
                    role: e.target.value
                  })
                }
              >
                <option value="" disabled>Choose your Role</option>
                <option value="1">Admin</option>
                <option value="0">User</option>
              </select>
              <label htmlFor="createUser">Role</label>
            </div>

          </div>

          <div className="modalBtnBlock">
            <div>
              <Button
                onClick={() => this.closeModal()}
                className="red darken-3"
                waves="light"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="green lighten-1"
                waves="light"
                onClick={() => {
                  this.addNewUser();
                }}
              >
                Add
            </Button>
            </div>
          </div>
        </Row>
      </Modal>
    );
  }
}
