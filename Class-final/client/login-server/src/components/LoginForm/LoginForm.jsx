import React, { Component } from "react";
import { Link } from "react-router-dom";
import InputItem from "../InputItem/InputItem";
import "./LoginForm.css";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: ""
  };

  handleInputChange = (id, value) => {
    if (id === "email") this.setState({ email: value });
    else this.setState({ password: value });
  };

  handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:8000/rest/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailId: this.state.email,
        password: this.state.password
      })
    })
      .then(allow => {
        return allow.json();
      })
      .then(data => {
        console.log(data.loginPerm);
        this.setState({ errorMessage: !data.loginPerm });
        if (data.loginPerm) {
          alert("Succesfully logged");
          return false;
        }
      });
  }

  render() {
    return (
      <div className="container">
        <div
          className="card card-signin mx-auto"
          style={{
            border: "0",
            borderRadius: "1rem"
          }}
        >
          <div className="card-body">
            <h4 className="card-title text-center">LOGIN</h4>
            <form className="form form-signin">
              <InputItem
                label="Email"
                id="email"
                type="email"
                onInputChange={this.handleInputChange}
              />
              <InputItem
                label="Password"
                id="password"
                type="password"
                onInputChange={this.handleInputChange}
              />
              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember Me
                </label>
                <span className="ml-lg-5 text-info">
                  <Link to="/forgot">Forgot Password ?</Link>
                </span>
              </div>
              <button
                className="btn btn-lg btn-primary btn-block text-uppercase mt-3"
                type="submit"
                style={{ width: "100%" }}
              >
                Login
              </button>
              <div className="text-center">
                <hr />
                <span className="">
                  Don't have an account ?{" "}
                  <Link to="/register">Register Here</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
