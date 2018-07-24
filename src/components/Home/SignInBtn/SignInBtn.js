import React, { Component } from "react";
import "./signInBtn.scss";
import { Link } from "react-router-dom";
import { Button } from "react-materialize";

export default class SignInBtn extends Component {
  render() {
    return (
      <div>
        <Link to="/UserPage">
          <Button className="green lighten-1 signBtnEle" waves="light">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }
}
