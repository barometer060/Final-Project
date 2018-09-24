import React, { Component } from "react";
import "./frontPage.css";
import { Link } from "react-router-dom";
import ForgotPassword from "./forgotPassword";

class FrontPage extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: false,
      questions: []
    };
  }

  handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:8000/rest/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailId: this.refs.id.value,
        password: this.refs.pwd.value
      })
    })
      .then(allow => {
        //console.log(allow.text());
        console.log(allow);
        return allow.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ errorMessage: !data });
        if (data) {
          alert("Succesfully logged");
          return false;
        }
      });
    //['allowLogin']
  }

  render() {
    let err;
    if (this.state.errorMessage)
      err = <span>Incorrect Username or Password</span>;
    else err = "";

    return (
      <div className="fpage">
        <h3 id="heading">Enter your credentials</h3>

        <form onSubmit={this.handleLogin.bind(this)}>
          <span>
            <i className="fa fa-arrow-circle-left" aria-hidden="true" />
          </span>

          <div className="myinputs">
            <input
              className="first"
              type="email"
              placeholder="Your email"
              ref="id"
              required
            />
            <input
              className="second"
              type="password"
              placeholder="Your Password"
              ref="pwd"
              required
            />
            <br />
            {this.state.errorMessage && (
              <span id="loginError">Incorrect Username or Password</span>
            )}
            <br />
            <button className="login">Log in</button> <br />
            <br />
            <Link to={"/forgot"}>Forgot Password</Link>
          </div>
        </form>

        <div className="forbtn">
          <span className="myspan"> New to Classifieds? </span>
          <Link to={"/signUp"}>
            {" "}
            <button className="signup"> Sign Up </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FrontPage;
