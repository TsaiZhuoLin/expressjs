import React, { Component } from 'react';
import './userPage.scss';
import { Button, Table, Modal, Row, Input } from 'react-materialize';

const API_USERS_URL = 'http://localhost:3050/api/users/';
const API_LOGOUT_URL = 'http://localhost:3050/auth/logout';


function UserInputForModal(props) {
  return (
    <Row className='editUserInputBlock'>
      <div className='inputFieldWrapper'>
        {
          props.userInputProperty.map((item, index) => {
            return (
              <Input
                key={item.label}
                type={item.type}
                className={item.className}
                placeholder={item.placeholder}
                s={6}
                label={`${props.isAddUserMode
                  ? item.label + ' *'
                  : item.label
                  }`
                }
                value={Object.values(props.userInputData)[index + 1] || ''}
                //value={""}
                maxLength={50}
                onChange={(event) => props.onChange(event)}
              />
            )//eof return
            // })
          })//eof first map
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


function DeleteUserContent(props) {
  return (
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
  )
}



function UserDataTable(props) {
  let getOpenUserModal = props.openUserModal;

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
                  >
                    Edit
                  </Button>
                  <Button
                    id='deleteBtn'
                    // onClick={() =>
                    //   getdeleteUserModal(props.id, props.first_name, props.last_name)
                    // }
                    onClick={() => getOpenUserModal('delete', props.id, props.first_name, props.last_name)}
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
      userInputData: {

      },
      tableHeader: [
        'ID', 'First Name', 'Last Name', 'Email', 'Created Time', 'Updated Time', 'Edit&Delete'
      ],
      userInputProperty: [{
        type: 'text',
        inputIndex: 'first_name',
        placeholder: 'First Name...',
        label: 'First Name'
      },
      {
        type: 'text',
        inputIndex: 'last_name',
        placeholder: 'Last Name...',
        label: 'Last Name',
      }, {
        type: 'password',
        inputIndex: 'password',
        placeholder: 'Password...',
        label: 'Password',
      }, {
        type: 'password',
        inputIndex: 'confirm_password',
        placeholder: 'Confirm Password...',
        label: 'Confirm Password',
      }, {
        type: 'email',
        inputIndex: 'email',
        placeholder: 'Email...',
        label: 'Email',
      }
      ]
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
      .then(res => res.json())
      .then(fetchedData => {
        let userData = fetchedData[0];
        console.log(222, userData);
        this.setState(prevState => {
          let newState = { ...prevState };
          newState.prevPassword = userData.password;
          newState.userInputData = userData;
          // newState.userInputProperty.map((props, index) => (
          //   props.value =
          // ))

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
      newState.userInputData.fetchedData[0][label] = value;
      return newState;
    })
  }


  openUserModal(mode, userID, userFirstName, userLastName) {

    this.setState({
      userModalMode: mode,
      userModalAction: true,
      headerTitle: 'Create A New User',
    })

    if (mode === 'edit') {
      this.getEditUser(userID)
      this.setState({
        editUserID: userID,
        headerTitle: 'Edit User',
        isAddUserMode: false,
      })
      return;
    }

    if (mode === 'delete') {
      this.setState({
        deleteUserID: userID,
        deleteUserFirstName: userFirstName,
        deleteUserLastName: userLastName,
        headerTitle: 'Delete User',
        isAddUserMode: true,
      })
      return;
    }
  }

  confirmAddNewUser() {
    let [
      first_name,
      last_name,
      password,
      confirmPassword,
      email
    ] = this.state.userInputProperty.map(props => (
      this.state.userInputData.fetchedData[0][props.className]
    ))

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
    } = this.state;

    let [
      first_name,
      last_name,
      password,
      confirm_password,
      email
    ] = this.state.userInputProperty.map(props => (
      this.state.userInputData.fetchedData[0][props.className]
    ))

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
      newState.userInputProperty.map(props => (
        newState.userInputData.fetchedData = ''
      ))
      return newState;
    })
  }

  render() {

    // let testary = this.state.userInputData.map(i => i)
    console.log(111, this.state.userInputData)

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
                (mode, userID, userFirstName, userLastName) => this.openUserModal(mode, userID, userFirstName, userLastName)
              }
            />
          </div>
        </div>

        {/* User Modal */}
        <Modal
          id='userModal'
          className='userModalBlock'
          actions={''}
          header={this.state.headerTitle}
          open={this.state.userModalAction}
          modalOptions={{ dismissible: false }}
        >
          <UserInputForModal
            userInputProperty={this.state.userInputProperty}
            userInputData={this.state.userInputData}
            confirmUserModalBtn={() => this.confirmUserModalBtn()}
            closeModal={() => this.closeModal()}
            isAddUserMode={this.state.isAddUserMode}
            actionType="edit"
            onChange={(event) => this.inputChange(event)}
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