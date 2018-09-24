import React, { Component } from "react";
import InputItem from "../InputItem/InputItem";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

class RegisterForm extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    error: {
      email: "",
      username: "",
      password: ""
    },
    valid: ""
  };

  handlePasswordError = type => {
    if (type === 1) {
      let error = { ...this.state.error };
      error.password = "Password don't match";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.password = "";
      this.setState({ error: error });
    }
    return;
  };

  handleInputChange = (id, value) => {
    if (id === "username") this.setState({ username: value });
    else if (id === "password")
      this.setState({ password: value }, () => {
        if (
          this.state.confirmPassword !== "" &&
          this.state.password !== this.state.confirmPassword
        ) {
          this.handlePasswordError(1);
        } else {
          this.handlePasswordError(-1);
        }
      });
    else if (id === "confirmPassword")
      this.setState({ confirmPassword: value }, () => {
        if (this.state.password !== this.state.confirmPassword) {
          this.handlePasswordError(1);
        } else {
          this.handlePasswordError(-1);
        }
      });
    else this.setState({ email: value });
  };

  handleFormSubmit = () => {};

  render() {
    const passwordError = this.state.error.password;
    return (
      <div className="container">
        <div
          className="card card-signup mx-auto"
          style={{
            border: "0",
            borderRadius: "1rem"
          }}
        >
          <div className="card-body">
            <h2 className="card-title text-center">Register</h2>
            <form className="form form-signup" onSubmit={this.handleFormSubmit}>
              <InputItem
                label="Email"
                id="email"
                type="email"
                onInputChange={this.handleInputChange}
              />
              <InputItem
                label="Username"
                id="username"
                type="text"
                onInputChange={this.handleInputChange}
              />
              <InputItem
                label="Password"
                id="password"
                type="password"
                onInputChange={this.handleInputChange}
              />
              <InputItem
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                onInputChange={this.handleInputChange}
              />
              <span className="text-danger" style={{ fontSize: "smaller" }}>
                {passwordError}
              </span>
              <button
                className="btn btn-lg btn-primary btn-block text-uppercase mt-3"
                type="submit"
                style={{ width: "100%" }}
              >
                Sign Up
              </button>
              <div className="mt-4 text-center">
                <hr />
                <span className="text-bold">
                  Already have an account ? <Link to="/login">Login</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
