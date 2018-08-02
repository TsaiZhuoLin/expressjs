import React, { Component } from "react";
import "./userPage.scss";
import { Button, Table, Modal, Row, Input } from "react-materialize";
import AddUserModal from "./Modals/AddUserModal";

const apiURL = "http://localhost:3000/api/users/";
const logoutURL = "http://localhost:3000/auth/logout";

export default class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      loginUserName: "",
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
      data => data.split("").splice(10).join("").split("_").join(" ")
    );
    this.setState({
      loginUserName: getNameAry
    })

    $(document).ready(function () {
      $('select').formSelect();
      M.updateTextFields();
    });
  }

  getAllUsers() {
    fetch(`${apiURL}`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          userData: data
        });
      })
      .catch(err => console.log(`We got errors : ${err}`));
  }

  getEditUser(userID) {
    fetch(`${apiURL}${userID}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        let getUserData = data[0];
        this.setState({
          user_id: userID, //can not be edited
          first_name: getUserData.first_name,
          last_name: getUserData.last_name,
          password: getUserData.password,
          email: getUserData.email,
          role: getUserData.role
        });
      })
      .then(
        $("#editUserModal").modal("open")
      )
      .catch(err => console.log(`We got errors : ${err}`));

  }

  confirmEditUser() {
    let editUserData = this.state;
    fetch(`${apiURL}${editUserData.user_id}`, {
      method: "PUT",
      body: JSON.stringify(editUserData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.closeModal())
      .then(window.location.reload())
      .catch(err => alert('Edit failed. Please try again.'));
  }

  getDeleteUser(userID, firstName, lastName) {
    this.setState({
      deleteUserID: userID,
      deleteUserFirstName: firstName,
      deleteUserLastName: lastName,
    });
    $("#deleteUserModal").modal("open");
  }

  confirmDeleteUser(userID) {
    fetch(`${apiURL}${userID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.closeModal())
      .then(window.location.reload())
      .catch(err => alert('Delete failed. Please try again.'));
  }

  userLogout() {
    fetch(`${logoutURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => {
        // login failed status 401
        if (res.status == 401) {
          alert("Something went wrong! Please try again.");
          return;
        }
        //login successful status 200
        if (res.status == 200) {
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(33, `We got errors : ${err}`));
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
              {`${this.state.loginUserName}`}
            </div>
            <Button className="red lighten-1 logoutEle" waves="light" onClick={() => this.userLogout()}>
              Logout
              </Button>
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
                  onClick={() => this.confirmEditUser()}
                >
                  Confirm
              </Button>
              </div>
            </div>
          }
        >
          <Row className="editUserInputBlock">
            <div className="input-field col s6">
              <h6>First Name</h6>
              <input
                id="first_name"
                className="userFirstNameInput"
                value={this.state.first_name}
                onChange={e =>
                  this.setState({
                    first_name: e.target.value
                  })
                }
              />
            </div>

            <div className="input-field col s6">
              <h6>Last Name</h6>
              <input
                id="last_name"
                className="userLastNameInput"
                value={this.state.last_name}
                onChange={e =>
                  this.setState({
                    last_name: e.target.value
                  })
                }
              />
            </div>

            <div className="input-field col s6">
              <h6>Password</h6>
              <input
                type="password"
                id="password"
                className="userPasswordInput"
                value={this.state.password}
                onChange={e =>
                  this.setState({
                    password: e.target.value
                  })
                }
              />
            </div>

            <div className="input-field col s6">
              <h6>Email</h6>
              <input
                type="email"
                id="email"
                className="userEmailInput"
                value={this.state.email}
                onChange={e =>
                  this.setState({
                    email: e.target.value
                  })
                }
              />
            </div>

            <div className="input-field col s6">
              <h6>Role</h6>
              <select
                value=""
                onChange={(e) =>
                  this.setState({
                    role: e.target.value
                  })
                }
              >
                <option value="" disabled>Edit your role</option>
                <option value="1">Admin</option>
                <option value="0">User</option>
              </select>
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
                onClick={() => this.confirmDeleteUser(this.state.deleteUserID)}
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