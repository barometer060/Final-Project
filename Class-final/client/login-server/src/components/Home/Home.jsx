import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div
        className="container-fluid"
        style={{
          padding: "0px"
        }}
      >
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/login" className="text-light">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
