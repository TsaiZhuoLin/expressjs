import React, { Component } from "react";

import { Modal, Button, Row, Input } from "react-materialize";

export default class DeleteUserModal extends Component {
  render() {
    return (
      <Modal id="deleteUserModal" className="deleteUserModalBlock" actions="">
        <div className="modalBtnBlock">
          <p>Are you sure you want to delete this user data?</p>
          <Button
            onClick={() => $("#deleteUserModal").modal("close")}
            className="red lighten-3"
            waves="light"
          >
            Cancel
          </Button>
          <Button className="red darken-3" waves="light">
            Delete
          </Button>
        </div>
      </Modal>
    );
  }
}
