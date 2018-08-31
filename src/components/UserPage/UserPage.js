import React, { Component } from 'react';
import './userPage.scss';
import { Button, Table, Modal, Row, Input } from 'react-materialize';

const API_USERS_URL = 'http://localhost:3000/api/users/';
const API_LOGOUT_URL = 'http://localhost:3000/auth/logout';


{/* <Welcome name="Sara" actionType="" />; */ }
function UserInputForModal(props) {
  return (
    <Row className='editUserInputBlock'>
      <div className='inputFieldWrapper'>
        {
          Object.keys(props.userInputProperty).map(data => {
            let getInputProps = props.userInputProperty[data];
            return (
              <Input
                key={getInputProps.label}
                type={getInputProps.type}
                className={getInputProps.className}
                placeholder={getInputProps.placeholder}
                s={getInputProps.s}
                label={`${props.isAddUserMode
                  ? getInputProps.label + ' *'
                  : getInputProps.label
                  }`}
                value={getInputProps.value}
                maxLength={getInputProps.maxLength}
                onChange={(event) => getInputProps.onChange(event)}
              />
            )
          })
        }
      </div>
      <div className='editModalBtnBlock'>
        <div>
          <Button
            onClick={() => props.closeModal()}
            className='red darken-3'
            waves='light'
          >
            Cancel
          </Button>
          <Button
            disabled={false}
            className='green lighten-1'
            waves='light'
            onClick={() => props.confirmUserModalBtn()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Row>
  )
}

function UserDataTable(props) {
  let getOpenUserModal = props.openUserModal,
    getdeleteUserModal = props.deleteUserModal;
  return (
    <Table centered={true}>
      <thead>
        <tr>
          {props.tableHeader.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.userdata.map((props) => {
          return (
            <tr key={props.id}>
              <td>{props.id}</td>
              <td>{props.first_name}</td>
              <td>{props.last_name}</td>
              <td>{props.email}</td>
              <td>{props.created_time}</td>
              <td>{props.updated_time}</td>
              <td className='tdEditDelete'>
                <div>
                  <Button
                    id='editBtn'
                    onClick={() => getOpenUserModal('edit', props.id)}
                    className='yellow darken-2'
                    waves='light'
                    actionType="edit"
                  >
                    Edit
                  </Button>
                  <Button
                    id='deleteBtn'
                    onClick={() =>
                      getdeleteUserModal(props.id, props.first_name, props.last_name)
                    }
                    className='red darken-2'
                    waves='light'
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
      loginUserName: '',
      headerType: '',
      isAddUserMode: true,
      isConfirmBtnDisable: true,
      userModalAction: false,
      deleteModalAction: false,
      tableHeader: [
        'ID', 'First Name', 'Last Name', 'Email', 'Created Time', 'Updated Time', 'Edit&Delete'
      ],
      userInputProperty: {
        first_name: {
          type: 'text',
          className: 'first_name userFirstNameInput',
          placeholder: 'First Name...',
          s: 6,
          label: 'First Name',
          value: '',
          maxLength: 50,
          onChange: event => this.inputChange(event),
        },
        last_name: {
          type: 'text',
          className: 'last_name userLastNameInput',
          placeholder: 'Last Name...',
          s: 6,
          label: 'Last Name',
          value: '',
          maxLength: 50,
          onChange: event => this.inputChange(event),
        },
        password: {
          type: 'password',
          className: 'password userPasswordInput',
          placeholder: 'Password...',
          s: 6,
          label: 'Password',
          value: '',
          maxLength: 50,
          onChange: event => this.inputChange(event),
        },
        confirm_password: {
          type: 'password',
          className: 'confirm_password userPasswordInput',
          placeholder: 'Confirm Password...',
          s: 6,
          label: 'Confirm Password',
          value: '',
          maxLength: 50,
          onChange: event => this.inputChange(event),
        },
        email: {
          type: 'email',
          className: 'email userPasswordInput',
          placeholder: 'Email...',
          s: 12,
          label: 'Email',
          value: '',
          maxLength: 50,
          onChange: event => this.inputChange(event),
        }
      }
    };
  }

  componentDidMount() {
    this.getAllUsers();
    const getCookie = document.cookie.split(';');
    const getNameAry = getCookie.map(
      data => data.split('').splice(10).join('').split('_').join(' ')
    );
    this.setState({
      loginUserName: getNameAry
    })
  }

  getAllUsers() {
    fetch(`${API_USERS_URL}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          userData: data
        });
      })
      .catch(err => alert('Failed to get user data! Please try again.'));
  }

  getEditUser(userID) {
    fetch(`${API_USERS_URL}${userID}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState(prevState => {
          let newState = { ...prevState };
          newState.prevPassword = data[0].password;
          Object.keys(newState.userInputProperty).map(props => {
            newState.userInputProperty[props].value = data[0][props]
          })
          return newState;
        })
      })
      .catch(err => alert('Failed to get users! Please try again.'));
  }

  inputChange(event) {
    let label = event.target.classList[0];
    let value = event.target.value;
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.userInputProperty[label].value = value;
      return newState;
    })
  }


  openUserModal(mode, userID) {
    let headerType = mode === 'add' ? 'Create A New User' : 'Edit User';

    if (mode === 'edit') {
      this.getEditUser(userID)
      this.setState({
        editUserID: userID,
        password: '',
        confirmPassword: '',
        isAddUserMode: false,
        userModalAction: true,
        headerType: headerType
      })
    }

    if (mode === 'add') {
      this.setState(prevState => {
        let newState = { ...prevState }
        newState.isAddUserMode = true
        newState.userModalAction = true
        newState.headerType = headerType
        Object.keys(newState.userInputProperty).map(props => {
          newState.userInputProperty[props].value = '';
          newState.headerType = headerType;
        })
        return newState;
      })
    }
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

    if (first_name === '') return alert('First Name is required.')
    if (last_name === '') return alert('Last Name is required.')
    if (password === '') return alert('Password is required.')
    if (confirmPassword === '') return alert('Confirm Password is required.')
    if (email === '') return alert('Email is required.')



    if (password === confirmPassword) {
      let newUserData = {
        first_name: first_name,
        last_name: last_name,
        password: password,
        email
      }
      fetch(`${API_USERS_URL}`, {
        method: 'POST',
        body: JSON.stringify(newUserData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(this.closeModal())
        .then(window.location.reload())
        .catch(err => console.log(`We got errors: ${err}`));
    }
    else {
      alert('Please confirm your passwords!')
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
    let {
      prevPassword
    } = this.state

    let [
      first_name,
      last_name,
      password,
      confirm_password,
      email
    ] = Object.keys(this.state.userInputProperty).map(props => {
      return this.state.userInputProperty[props].value
    })

    let alertMsg = 'Please check/confirm your password!';

    if (first_name === '') return alert('First Name is required.')
    if (last_name === '') return alert('Last Name is required.')
    if (email === '') return alert('Email is required.')
    if (password !== prevPassword) {
      if (password !== confirm_password) return alert(alertMsg)
    }

    if (confirm_password
      ? password !== confirm_password
      : false
    ) return alert(alertMsg)

    if (password === '' && confirm_password === '') return alert(alertMsg)

    let editUserData = {
      first_name: first_name,
      last_name: last_name,
      password: `${prevPassword === password ? '' : password}`,
      email: email,
      isPasswordEdit: prevPassword === password ? false : true
    };

    fetch(`${API_USERS_URL}${this.state.editUserID}`, {
      method: 'PUT',
      body: JSON.stringify(editUserData),
      headers: {
        'Content-Type': 'application/json'
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
      deleteModalAction: true
    });
  }

  confirmDeleteUser(userID) {
    fetch(`${API_USERS_URL}${userID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.closeModal())
      .then(window.location.reload())
      .catch(err => alert('Delete failed. Please try again.'));
  }

  userLogout() {
    fetch(`${API_LOGOUT_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        // login failed status 401
        if (res.status == 401) {
          alert('Something went wrong! Please try again.');
          return;
        }
        //login successful status 200
        if (res.status == 200) {
          this.props.history.push('/');
        }
      })
      .catch(err => alert('Logout failed, Please try again!'));
  }

  closeModal() {
    this.setState(prevState => {
      let newState = { ...prevState }
      newState.userModalAction = false;
      Object.keys(newState.userInputProperty).map(props => {
        newState.userInputProperty[props].value = '';
      })
      return newState;
    })
  }

  render() {
    return (
      <div className='userPageBlock'>
        <div className='headerBlock'>
          <div className='nameBlock'>User Manager</div>
          <div className='avatarBlock'>
            <div className='avatarPicEle'>
              {this.state.loginUserName}
            </div>
            <Button className='red lighten-1 logoutEle' waves='light' onClick={() => this.userLogout()}>
              Logout
              </Button>
          </div>
        </div>

        <div className='userPageContentBlock'>
          <div className='upperBlock'>
            <Button
              id='addUserBtn'
              onClick={(e) => {
                this.openUserModal('add');
              }}
              className='green lighten-1'
              waves='light'
            >
              Add
            </Button>
          </div>


          <div className='tableBlock'>
            <UserDataTable
              tableHeader={this.state.tableHeader}
              userdata={this.state.userData}
              openUserModal={
                (mode, userID) => this.openUserModal(mode, userID)
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
          id='userModal'
          className='userModalBlock'
          actions={''}
          header={this.state.headerType}
          open={this.state.userModalAction}
          modalOptions={{ dismissible: false }}
        >
          <UserInputForModal
            userInputProperty={this.state.userInputProperty}
            confirmUserModalBtn={() => this.confirmUserModalBtn()}
            closeModal={() => this.closeModal()}
            isAddUserMode={this.state.isAddUserMode}
            actionType="edit"
          />
        </Modal>

        {/* Delete Modal */}
        <Modal
          id='deleteUserModal'
          className='deleteUserModalBlock'
          open={this.state.deleteModalAction}
          actions=''
          modalOptions={{ dismissible: false }}
        >
          <div className='deleteModalBtnBlock'>
            <h3>Are you sure you want to delete this user data?</h3>
            <ul>
              <li>ID : {this.state.deleteUserID}</li>
              <li>First Name : {this.state.deleteUserFirstName}</li>
              <li>Last Name : {this.state.deleteUserLastName}</li>
            </ul>
            <div>
              <Button
                onClick={() => (
                  this.setState({ deleteModalAction: false })
                )}
                className='red lighten-3'
                waves='light'
              >
                Cancel
            </Button>
              <Button
                className='red darken-3'
                waves='light'
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