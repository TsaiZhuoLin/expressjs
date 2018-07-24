import React, { Component } from "react";

import { Modal, Button, Row, Input } from "react-materialize";

export default class AddUserModal extends Component {
  render() {
    return (
      <Modal
        id="editUserModal"
        className="editUserModalBlock"
        actions={
          <div className="modalBtnBlock">
            <Button
              onClick={() => $("#editUserModal").modal("close")}
              className="red darken-3"
              waves="light"
            >
              Cancel
            </Button>
            <Button className="green darken-3" waves="light">
              Confirm
            </Button>
          </div>
        }
      >
        <Row className="editUserInputBlock">
          <Input
            className="userFirstNameInput"
            placeholder="First Name..."
            s={8}
            label="First Name"
          />
          <Input
            className="userLastNameInput"
            placeholder="Last Name..."
            s={8}
            label="Last Name"
          />
          <Input
            className="userPasswordInput"
            placeholder="Password..."
            s={8}
            label="Password"
          />
          <Input
            className="userEmailInput"
            placeholder="Email..."
            s={8}
            label="Email"
          />
        </Row>
      </Modal>
    );
  }
}
