import React, { Component } from "react";
import About from "./about";
import MyAds from "./myAds";
import MySubs from "./mySubs";
import EditDetails from "./editDetails";
import Messages from "./messages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./userprofile.css";

class UserProfile extends Component {
  state = {
    display: [true, false, false, false]
  };

  handleClick = index => {
    let display = [false, false, false, false];
    display[index] = true;
    this.setState({ display: display });
  };

  render() {
    return (
      <div
        className="container-fluid"
        style={{
          paddingLeft: "0px",
          paddingRight: "0px",
          paddingBottom: "50 px"
        }}
      >
        <nav className="navbar navbar-expand-lg bg-dark ">
          <ul className="navbar-nav">
            <li className="nav-item col-lg-2">
              <a href="http://localhost:4200/" className="nav-link linknav">
                Home
              </a>
            </li>

            <li className="nav-item col-lg-7">
              <a href="#" className="nav-link linknav">
                Post an Ad
              </a>
            </li>

            <li className="nav-item col-lg-12" />
            <li className="nav-item col-lg-10" />
            <li className="nav-item dropdown col-lg-6">
              <a
                href="#"
                className="nav-link dropdown-toggle linknav"
                data-toggle="dropdown"
              >
                My Account
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <a href="/userProfile" style={{ color: "blue" }}>
                    Profile
                  </a>
                </li>
                <li className="dropdown-item">
                  <a
                    href="http://localhost:4200/messages"
                    style={{ color: "blue" }}
                  >
                    Inbox
                  </a>
                </li>
                <li className="dropdown-item">
                  <Link to="/" style={{ color: "blue" }}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="container emp-profile">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-6 userDetails">
              <div className="profile-head">
                <h5>My Account</h5>
              </div>
            </div>

            <div className="col-md-2 userDetails">
              <div className="profile-work">
                <a href="#" onClick={() => this.handleClick(1)}>
                  Edit Profile
                </a>
                <br />
              </div>
            </div>

            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="#" onClick={() => this.handleClick(0)}>
                  About
                </a>
                <br />
                <a href="#" onClick={() => this.handleClick(2)}>
                  My Advertisements{" "}
                </a>
                <br />
                <a href="#" onClick={() => this.handleClick(3)}>
                  My Subscriptions
                </a>
              </div>
            </div>
            <div className="col-md-8 info">
              <div className="tab-content profile-tab" id="myTabContent">
                {this.state.display[0] && <About />}
                {this.state.display[1] && (
                  <EditDetails onDataUpdate={this.handleClick} />
                )}
                {this.state.display[2] && <MyAds />}
                {this.state.display[3] && <MySubs />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
