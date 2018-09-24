import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FrontPage from "./components/frontPage";
import ForgotPassword from "./components/forgotPassword";
import SignUp from "./components/signUp";
import UserProfile from "./components/userprofile";
import About from "./components/about";
import "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/forgot" component={ForgotPassword} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/userProfile" component={UserProfile} />
            {/* <Route exact path="/about" component={UserProfile} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
