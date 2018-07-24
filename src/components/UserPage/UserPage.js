import React, { Component } from "react";
import "./userPage.scss";

import { Button, Table } from "react-materialize";

import { Link, HashRouter } from "react-router-dom";
import AddUserModal from "./Modals/AddUserModal";
import EditUserModal from "./Modals/EditUserModal";
import DeleteUserModal from "./Modals/DeleteUserModal";

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userData = [
      {
        id: "123",
        first_name: "Max",
        last_name: "Tsai",
        email: "123@123",
        created_time: "123",
        updated_time: "123",
        creator: "123",
        updater: "123"
      },
      {
        id: "456",
        first_name: "Max",
        last_name: "Tsai",
        email: "123@123",
        created_time: "123",
        updated_time: "123",
        creator: "123",
        updater: "123"
      },
      {
        id: "789",
        first_name: "Max",
        last_name: "Tsai",
        email: "123@123",
        created_time: "123",
        updated_time: "123",
        creator: "123",
        updater: "123"
      }
    ];

    const mapUserData = userData.map(data => {
      return (
        <tr key={data.id}>
          <td>{Number(data.id)}</td>
          <td>{data.first_name}</td>
          <td>{data.last_name}</td>
          <td>{data.email}</td>
          <td>{data.created_time}</td>
          <td>{data.updated_time}</td>
          <td>{data.creator}</td>
          <td>{data.updater}</td>
          <td>
            <Button
              onClick={() => $("#editUserModal").modal("open")}
              className="yellow darken-2 editBtn"
              waves="light"
            >
              Edit
            </Button>
            <Button
              onClick={() => $("#deleteUserModal").modal("open")}
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
                  <th data-field="created_time">Created Time</th>
                  <th data-field="updated_time">Updated Time</th>
                  <th data-field="creator">Creator</th>
                  <th data-field="updater">Updater</th>
                  <th data-field="updater">Edit&Delete</th>
                </tr>
              </thead>

              <tbody>{mapUserData}</tbody>
            </Table>
          </div>

          <AddUserModal onAdd={value => this.onAdd(value)} />
          <EditUserModal />
          <DeleteUserModal />
        </div>
      </div>
    );
  }
}
