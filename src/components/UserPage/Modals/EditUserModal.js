import React, { Component } from "react";

import { Modal, Button, Row, Input } from "react-materialize";

export default class EditUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      is_manager: ""
    };
  }

  static getDerivedStateFromProps(Newprops) {
    console.log(99999);
    let getFirstName = Newprops.getUserData.map(i => i.first_name).toString(),
      getLastName = Newprops.getUserData.map(i => i.last_name).toString(),
      getPassword = Newprops.getUserData.map(i => i.password).toString(),
      getEmail = Newprops.getUserData.map(i => i.email).toString(),
      getIsManager = Newprops.getUserData.map(i => i.is_manager).toString(),
      getID = Newprops.getUserData.map(i => i.id).toString();

    return {
      user_id: getID,
      first_name: getFirstName,
      last_name: getLastName,
      password: getPassword,
      email: getEmail,
      is_manager: getIsManager
    };
  }

  editUserConfirm() {
    console.log(this.state);
    // let editUserData = this.state;
    // console.log(editUserData);
    // fetch(`http://localhost:3000/api/users/${editUserData.user_id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(editUserData),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(`We got errors : ${err}`));

    // this.closeModal();
  }

  closeModal() {
    $(".input-field > input").val("");
    $("#editUserModal").modal("close");
  }

  render() {
    return (
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
        <Row className="editUserInputBlock">
          <Input
            className="userFirstNameInput"
            placeholder={this.state.first_name}
            s={8}
            label="First Name"
            // defaultValue={this.state.first_name}
            onChange={e => {
              this.setState({
                first_name: e.target.value
              });
            }}
          />
          <Input
            className="userLastNameInput"
            placeholder={this.state.last_name}
            s={8}
            label="Last Name"
            // defaultValue={this.state.last_name}
            onChange={e =>
              this.setState({
                last_name: e.target.value
              })
            }
          />
          <Input
            className="userPasswordInput"
            placeholder={this.state.password}
            s={8}
            label="Password"
            // defaultValue={this.state.password}
            onChange={e =>
              this.setState({
                password: e.target.value
              })
            }
          />
          <Input
            className="userEmailInput"
            placeholder={this.state.email}
            s={8}
            label="Email"
            // defaultValue={this.state.email}
            onChange={e =>
              this.setState({
                email: e.target.value
              })
            }
          />
          <Input
            className="userIsManagerInput"
            placeholder={this.state.is_manager}
            s={8}
            label="Is Manager"
            // defaultValue={this.state.is_manager}
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
