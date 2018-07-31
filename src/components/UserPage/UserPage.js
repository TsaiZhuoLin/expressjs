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
      passDataToEdit: [{}],
      loginUserFirstName: "",
      loginUserLastName: "",
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      role: ""
    };
  }

  componentDidMount() {
    this.getAllUsers();

    const getCookie = document.cookie.split(";");
    const getNameAry = getCookie.map(
      data => data.split("").splice(11).join("")
    )

    this.setState({
      loginUserFirstName: getNameAry[0],
      loginUserLastName: getNameAry[1]
    })
    M.updateTextFields();
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
          user_id: userID, //can not be edited
          first_name: data[0].first_name,
          last_name: data[0].last_name,
          password: data[0].password,
          email: data[0].email,
          role: data[0].role
        }, () => console.log(this.state));
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

  getDeleteUser(userID, firstName, lastName) {
    this.setState({
      deleteUserID: userID,
      deleteUserFirstName: firstName,
      deleteUserLastName: lastName,
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
    $("#testingModal").modal("open")
  }

  closeModal() {
    $(".input-field > input").val("");
    $("#addUserModal").modal("close");
    $("#editUserModal").modal("close");
    $("#deleteUserModal").modal("close");
  }

  render() {

    const userData = this.state.userData.map(data => {
      return (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.first_name}</td>
          <td>{data.last_name}</td>
          <td>{data.email}</td>
          <td>{data.role === "1" ? "Admin" : "User"}</td>
          <td>{data.created_time}</td>
          <td>{data.updated_time}</td>
          <td className="tdEditDelete">
            <div>
              <Button
                onClick={() => this.getEditUser(data.id)}
                className="yellow darken-2 editBtn"
                waves="light"
              >
                Edit
            </Button>
              <Button
                onClick={() => this.getDeleteUser(data.id, data.first_name, data.last_name)}
                className="red darken-2 deleteBtn"
                waves="light"
              >
                Delete
            </Button>
            </div>
          </td>
        </tr>
      );
    });


    return (
      <div className="userPageBlock">
        <div className="headerBlock">
          <div className="nameBlock">User Manager</div>

          <div className="avatarBlock">
            <div className="avatarPicEle">
              {`${this.state.loginUserFirstName} 
              ${this.state.loginUserLastName}`}
            </div>
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
                  <th data-field="is_manager">Role</th>
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
            <div className="editModalBtnBlock">
              <div>
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
            </div>
          }
        >
          <Row className="editUserInputBlock">

            <div className="input-field col s6">
              <input
                value="test"
                id="first_name2"
                type="text"
                className="validate"
                onChange={e =>
                  this.setState({
                    first_name: e.target.value
                  })
                }
              />
              <label className="active" htmlFor="first_name2">First Name</label>
            </div>

            <Input
              className="userFirstNameInput"
              // placeholder={this.state.passDataToEdit[0].first_name}
              s={6}
              labelClassName="active"
              label="First Name"
              value={this.state.first_name}
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
              s={6}
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
              type="password"
              className="userPasswordInput"
              placeholder={this.state.passDataToEdit[0].password}
              s={6}
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
              s={6}
              label="Email"
              defaultValue={this.state.passDataToEdit[0].email}
              maxLength="50"
              onChange={e =>
                this.setState({
                  email: e.target.value,
                  passDataToEdit: [
                    {
                      email: e.target.value
                    }
                  ]
                })
              }
            />
            <Input
              className="userIsManagerInput"
              placeholder={this.state.passDataToEdit[0].role}
              s={8}
              label="Is Manager"
              maxLength="5"
              onChange={e =>
                this.setState({
                  role: e.target.value
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
              <label>Role</label>
            </div>


          </Row>
        </Modal>

        {/* Delete Modal */}
        <Modal
          id="deleteUserModal"
          className="deleteUserModalBlock"
          actions="">
          <div className="deleteModalBtnBlock">
            <h3>Are you sure you want to delete this user data?</h3>
            <ul>
              <li>ID : {this.state.deleteUserID}</li>
              <li>First Name : {this.state.deleteUserFirstName}</li>
              <li>Last Name : {this.state.deleteUserLastName}</li>
            </ul>
            {/* {`Delete ID => ${this.state.deleteUserID}`} */}
            <div>
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
          </div>
        </Modal>
      </div>
    );
  }
}