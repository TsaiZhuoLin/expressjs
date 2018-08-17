import React, { Component } from "react";
import "./userPage.scss";
import { Button, Table, Modal, Row, Input } from "react-materialize";

const API_USERS_URL = "http://localhost:3000/api/users/";
const API_LOGOUT_URL = "http://localhost:3000/auth/logout";

function UserInputForModal({ userInputProperty, closeModal, confirmUserModalBtn, isAddUserMode }) {
  return (
    <Row className='editUserInputBlock'>
      <div className='inputFieldWrapper'>
        {
          Object.keys(userInputProperty).map(data => {
            let getInputProps = userInputProperty[data];
            return (
              <Input
                key={getInputProps.label}
                type={getInputProps.type}
                className={getInputProps.className}
                placeholder={getInputProps.placeholder}
                s={getInputProps.s}
                label={`${isAddUserMode
                  ? getInputProps.label + ' *'
                  : getInputProps.label
                  }`}
                value={getInputProps.value}
                maxLength={getInputProps.maxLength}
                onChange={(e) => getInputProps.onChange(e)}
              />
            )
          })
        }
      </div>
      <div className='editModalBtnBlock'>
        <div>
          <Button
            onClick={() => closeModal()}
            className="red darken-3"
            waves="light"
          >
            Cancel
          </Button>
          <Button
            disabled={false}
            className="green lighten-1"
            waves="light"
            onClick={() => confirmUserModalBtn()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Row>
  )
}

function UserDataTable({ data, openUserModal, deleteUserModal }) {
  return (
    <Table centered={true}>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Created Time</th>
          <th>Updated Time</th>
          <th>Edit&Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, first_name, last_name, email, created_time, updated_time }) => {
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{email}</td>
              <td>{created_time}</td>
              <td>{updated_time}</td>
              <td className="tdEditDelete">
                <div>
                  <Button
                    id="editBtn"
                    onClick={(e) => openUserModal(e, id)}
                    className="yellow darken-2"
                    waves="light"
                  >
                    Edit
                  </Button>
                  <Button
                    id="deleteBtn"
                    onClick={() =>
                      deleteUserModal(id, first_name, last_name)
                    }

                    className="red darken-2"
                    waves="light"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          );
        }) // eof return
        }
      </tbody>
    </Table>
  )
};

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      loginUserName: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
      email: "",
      headerType: "",
      isAddUserMode: true,
      isConfirmBtnDisable: true,
      isRequired: false,
      userInputProperty: {
        first_name: {
          type: 'text',
          className: 'first_name userFirstNameInput',
          placeholder: 'First Name...',
          s: 6,
          label: 'First Name',
          value: '',
          maxLength: 50,
          onChange: e => this.inputChange(e),
        },
        last_name: {
          type: 'text',
          className: 'last_name userLastNameInput',
          placeholder: 'Last Name...',
          s: 6,
          label: 'Last Name',
          value: '',
          maxLength: 50,
          onChange: e => this.inputChange(e),
        },
        password: {
          type: 'password',
          className: 'password userPasswordInput',
          placeholder: 'Password...',
          s: 6,
          label: 'Password',
          value: '',
          maxLength: 50,
          onChange: e => this.inputChange(e),
        },
        confirm_password: {
          type: 'password',
          className: 'confirm_password userPasswordInput',
          placeholder: 'Confirm Password...',
          s: 6,
          label: 'Confirm Password',
          value: '',
          maxLength: 50,
          onChange: e => this.inputChange(e),
        },
        email: {
          type: 'email',
          className: 'email userPasswordInput',
          placeholder: 'Email...',
          s: 12,
          label: 'Email',
          value: '',
          maxLength: 50,
          onChange: e => this.inputChange(e),
        }
      }
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

  }

  getAllUsers() {
    fetch(`${API_USERS_URL}`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          userData: data
        });
      })
      .catch(err => alert("Failed to get user data! Please try again."));
  }

  getEditUser(userID) {
    fetch(`${API_USERS_URL}${userID}`)
      .then(res => {
        return res.json();
      })
      // .then(data => {
      //   let getUserData = data[0];
      //   this.setState({
      //     editUserID: userID, //can not be edited
      //     first_name: getUserData.first_name,
      //     last_name: getUserData.last_name,
      //     email: getUserData.email,
      //     password: getUserData.password,
      //     prevPassword: getUserData.password
      //   });
      //   return data;
      // })
      .then(data => {
        this.setState(prevState => {
          let newState = { ...prevState };
          newState.prevPassword = data[0].password;
          Object.keys(newState.userInputProperty)
            .map(props => {
              newState.userInputProperty[props].value = data[0][props]
            })
          return newState;
        })
      })
      .catch(err => alert("Failed to get users! Please try again."));
  }

  inputChange(e) {
    let label = e.target.classList[0];
    let value = e.target.value;

    this.setState(prevState => {
      let newState = { ...prevState };
      newState.userInputProperty[label].value = value;
      return newState;
    })
  }


  openUserModal(e, userID) {
    // check modal type isAddMode = 1, isEditMode = 0
    let checkModalType = e.target.id === 'addUserBtn' ? 1 : 0;
    let headerType = checkModalType === 1 ? 'Create A New User' : 'Edit User';

    if (checkModalType === 0) {
      this.getEditUser(userID)
      this.setState({
        editUserID: userID,
        password: "",
        confirmPassword: "",
        isAddUserMode: false,
        headerType: headerType
      })
    }

    if (checkModalType === 1) {
      this.setState(prevState => {
        let newState = { ...prevState }
        newState.isAddUserMode = true
        newState.headerType = headerType
        Object.keys(newState.userInputProperty).map(props => {
          newState.userInputProperty[props].value = "";
          newState.headerType = headerType;
        })
        return newState;
      })
    }
    $("#userModal").modal("open");
  }

  confirmAddNewUser() {
    let [
      first_name,
      last_name,
      password,
      confirmPassword,
      email
    ] = Object.keys(this.state.userInputProperty).map(props => {
      return this.state.userInputProperty[props].value
    })

    if (first_name === "") return alert("First Name is required.")
    if (last_name === "") return alert("Last Name is required.")
    if (password === "") return alert("Password is required.")
    if (confirmPassword === "") return alert("Confirm Password is required.")
    if (email === "") return alert("Email is required.")



    if (password === confirmPassword) {
      let newUserData = {
        first_name: first_name,
        last_name: last_name,
        password: password,
        email
      }
      fetch(`${API_USERS_URL}`, {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(this.closeModal())
        .then(window.location.reload())
        .catch(err => console.log(`We got errors: ${err}`));
    }
    else {
      alert("Please confirm your passwords!")
    }
  }

  confirmUserModalBtn() {
    if (this.state.isAddUserMode) {
      this.confirmAddNewUser()
    } else {
      this.confirmEditUser()
    }
  }

  confirmEditUser() {
    let test1 = Object.keys(this.state.userInputProperty).map(props => {
      return this.state.userInputProperty[props]
    })

    console.log(333, test1);

    let [
      first_name,
      last_name,
      password,
      confirm_password,
      email
    ] = test1;

    let { value } = confirm_password;
    console.log(555, value)

    let {
      prevPassword
    } = this.state

    // let {
    //   first_name,
    //   last_name,
    //   password,
    //   confirmPassword,
    //   email,
    //   prevPassword
    // } = this.state.userInputProperty;

    let withoutPassword = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      isPasswordEdit: false
    };

    let withPassword = {
      first_name: first_name,
      last_name: last_name,
      password: password,
      email: email,
      isPasswordEdit: true
    };


    if (first_name === "" || last_name === "" || email === "") {
      alert("Input with * is required")
      return
    }

    if (first_name === "") return alert("First Name is required.")
    if (last_name === "") return alert("Last Name is required.")
    if (email === "") return alert("Email is required.")


    if (confirm_password !== undefined) {
      if (password === prevPassword) {
        return alert("1111 Please confirm your passwords!")
      }
    }

    let editUserData = prevPassword === password
      ? withoutPassword
      : withPassword;

    console.log(222, editUserData)

    if (editUserData.isPasswordEdit) {
      console.log(123123123)
      let { password, confirmPassword } = this.state;
      if (password !== confirmPassword) {
        return alert("222 Please confirm your passwords!")
      }
    }


    // fetch(`${API_USERS_URL}${this.state.editUserID}`, {
    //   method: "PUT",
    //   body: JSON.stringify(editUserData),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(this.closeModal())
    //   .then(window.location.reload())
    //   .catch(err => alert('Edit failed. Please try again.'));
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
    fetch(`${API_USERS_URL}${userID}`, {
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
    fetch(`${API_LOGOUT_URL}`, {
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
      .catch(err => alert("Logout failed, Please try again!"));
  }

  checkUserPassword() {
    let getPassword = this.state.password,
      getConfirmPassword = this.state.confirmPassword;

    if (getPassword === getConfirmPassword) {
      this.setState({
        isConfirmBtnDisable: false
      })

    } else {
      this.setState({
        isConfirmBtnDisable: true
      })
    }

    if (getPassword === "" || getConfirmPassword === "") {
      this.setState({
        isConfirmBtnDisable: true
      })
    }
  }

  closeModal() {
    $(".input-field > input").val("");
    $("#userModal").modal("close");
  }

  render() {
    return (
      <div className="userPageBlock">
        <div className="headerBlock">
          <div className="nameBlock">User Manager</div>

          <div className="avatarBlock">
            <div className="avatarPicEle">
              {this.state.loginUserName}
            </div>
            <Button className="red lighten-1 logoutEle" waves="light" onClick={() => this.userLogout()}>
              Logout
              </Button>
          </div>
        </div>

        <div className="userPageContentBlock">
          <div className="upperBlock">
            <Button
              id="addUserBtn"
              onClick={(e) => {
                this.openUserModal(e);
              }}
              className="green lighten-1"
              waves="light"
            >
              Add
            </Button>
          </div>


          <div className="tableBlock">
            <UserDataTable
              data={this.state.userData}
              openUserModal={
                (e, userID) => this.openUserModal(e, userID)
              }
              deleteUserModal={
                (userID, firstName, lastName) =>
                  this.getDeleteUser(userID, firstName, lastName)
              }
            />

          </div>
        </div>

        {/* User Modal */}
        <Modal
          id="userModal"
          className="userModalBlock"
          actions={""}
          header={this.state.headerType}
        >
          <UserInputForModal
            userInputProperty={this.state.userInputProperty}
            confirmUserModalBtn={() => this.confirmUserModalBtn()}
            closeModal={() => this.closeModal()}
            isAddUserMode={this.state.isAddUserMode}
          />
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
                onClick={() =>
                  this.confirmDeleteUser(this.state.deleteUserID)}
              >
                Delete
            </Button>
            </div>
          </div>
        </Modal>
      </div >
    );
  }
}