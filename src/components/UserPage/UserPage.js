import React, { Component } from "react";
import "./userPage.scss";

import { Button, Table, Modal, Row, Input } from "react-materialize";

import { Link } from "react-router-dom";
import AddUserModal from "./Modals/AddUserModal";

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      passDataToEdit: [{}]
    };
  }

  componentDidMount() {
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

  getEditUser(userID) {
    fetch(`http://localhost:3000/api/users/${userID}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          passDataToEdit: data,
          user_id: userID
        });
      })
      .catch(err => console.log(`We got errors : ${err}`));
    $("#editUserModal").modal("open");
  }

  editUserConfirm() {
    let editUserData = this.state;
    fetch(`http://localhost:3000/api/users/${editUserData.user_id}`, {
      method: "PUT",
      body: JSON.stringify(editUserData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(`We got errors : ${err}`));
    this.closeModal();
  }

  getDeleteUser(userID) {
    console.log(4444, userID);
    this.setState({
      deleteUserID: userID
    });
    $("#deleteUserModal").modal("open");
  }

  deleteUserConfirm(userID) {
    fetch(`http://localhost:3000/api/users/${userID}`, {
      method: "DELETE",
      // body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(`We got errors : ${err}`));
    this.closeModal();
  }

  testing() {
    console.log(this.state);
  }

  closeModal() {
    $(".input-field > input").val("");
    $("#addUserModal").modal("close");
    $("#editUserModal").modal("close");
    $("#deleteUserModal").modal("close");
  }

  render() {
    console.log(this.state);
    const btn = {
      width: "100px",
      height: "25px"
    };
    const userData = this.state.userData.map(data => {
      return (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.first_name}</td>
          <td>{data.last_name}</td>
          <td>{data.email}</td>
          <td>{data.is_manager}</td>
          <td>{data.created_time}</td>
          <td>{data.updated_time}</td>
          <td>
            <Button
              onClick={() => this.getEditUser(data.id)}
              className="yellow darken-2 editBtn"
              waves="light"
            >
              Edit
            </Button>
            <Button
              onClick={() => this.getDeleteUser(data.id)}
              className="red darken-2 editBtn"
              waves="light"
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className="userPageBlock">
        <button style={btn} onClick={() => this.testing()}>
          Test 1
        </button>
        <div className="headerBlock">
          <div className="nameBlock">User Manager</div>

          <div className="avatarBlock">
            <div className="avatarPicEle">M</div>
            <Link to="/">
              <Button className="red lighten-1 logoutEle" waves="light">
                Logout
              </Button>
            </Link>
          </div>
        </div>

        <div className="userPageContentBlock">
          <div className="upperBlock">
            <Button
              onClick={() => $("#addUserModal").modal("open")}
              className="green lighten-1 addUserBtn"
              waves="light"
            >
              Add
            </Button>
          </div>
          <div className="tableBlock">
            <Table centered={true}>
              <thead>
                <tr>
                  <th data-field="id">ID</th>
                  <th data-field="first_name">First Name</th>
                  <th data-field="last_name">Last Name</th>
                  <th data-field="Email">Email</th>
                  <th data-field="is_manager">Is Manager</th>
                  <th data-field="created_time">Created Time</th>
                  <th data-field="updated_time">Updated Time</th>
                  <th data-field="updater">Edit&Delete</th>
                </tr>
              </thead>

              <tbody>{userData}</tbody>
            </Table>
          </div>

          <AddUserModal />
        </div>

        {/* Edit User Modal */}
        <Modal
          id="editUserModal"
          className="editUserModalBlock"
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
                onClick={() => this.editUserConfirm()}
              >
                Confirm
              </Button>
            </div>
          }
        >
          <button style={btn} onClick={() => this.testing()}>
            Test
          </button>
          <Row className="editUserInputBlock">
            <Input
              className="userFirstNameInput"
              placeholder={this.state.passDataToEdit[0].first_name}
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
              placeholder={this.state.passDataToEdit[0].last_name}
              s={8}
              label="Last Name"
              // defaultValue={this.state.last_name}
              maxLength="50"
              onChange={e =>
                this.setState({
                  last_name: e.target.value
                })
              }
            />
            <Input
              className="userPasswordInput"
              placeholder={this.state.passDataToEdit[0].password}
              s={8}
              label="Password"
              // defaultValue={this.state.password}
              maxLength="50"
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
            />
            <Input
              className="userEmailInput"
              placeholder={this.state.passDataToEdit[0].email}
              s={8}
              label="Email"
              // defaultValue={this.state.email}
              maxLength="50"
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />
            <Input
              className="userIsManagerInput"
              placeholder={this.state.passDataToEdit[0].is_manager}
              s={8}
              label="Is Manager"
              // defaultValue={this.state.is_manager}
              maxLength="5"
              onChange={e =>
                this.setState({
                  is_manager: e.target.value
                })
              }
            />
          </Row>
        </Modal>

        {/* Delete Modal */}
        <Modal id="deleteUserModal" className="deleteUserModalBlock" actions="">
          <div className="modalBtnBlock">
            <h1>Are you sure you want to delete this user data?</h1>
            {`Delete ID => ${this.state.deleteUserID}`}
            <Button
              onClick={() => $("#deleteUserModal").modal("close")}
              className="red lighten-3"
              waves="light"
            >
              Cancel
            </Button>
            <Button
              className="red darken-3"
              waves="light"
              onClick={() => this.deleteUserConfirm(this.state.deleteUserID)}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
