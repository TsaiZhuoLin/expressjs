import React, { Component } from "react";
import "./app.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home/Home";
import UserPage from "../UserPage/UserPage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/UserPage" component={UserPage} />
        </div>
      </Router>
    );
  }
}
